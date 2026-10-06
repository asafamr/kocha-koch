import { readdir } from "node:fs/promises";
import { join } from "node:path";

// The research docs as a lookup table, so a model gets a one-line index in its instructions and
// asks for full entries (with their sources) only when it needs them.
//   KB:<tip id>   docs/cv-knowledge-base.md        e.g. KB:A1, KB:H8, KB:myths
//   WP:<claim id> docs/cv-weak-points-research.md  e.g. WP:4.3, WP:sensitive, WP:claims-not-to-repeat
//   SR:<slug>     docs/cv-sections-research.md     e.g. SR:volunteering, SR:certifications
//   XX:<n>        docs/research/*.md, one file per topic, each declaring "Prefix: XX" and entries
//                 "### XX<n> `slug`: Title" with sources "- Q<n> · ..."   e.g. RL:3, IL:12
// Each entry's text ends with its sources resolved from the doc's source list (label and URL).

type Entry = { id: string; title: string; text: string };
type Doc = {
  file: string;
  prefix: string;
  heading: RegExp; // ### heading that starts an entry; group 1 = id (or null: slug of the title), group 2 = title
  source: RegExp; // a line of the source list; group 1 = source id
  extra: Record<string, string>; // id -> ## section title, also looked up whole
};

const DOCS: Doc[] = [
  {
    file: "docs/cv-knowledge-base.md",
    prefix: "KB",
    heading: /^### ([A-H]\d+) `[^`]+`: (.+)$/,
    source: /^- (S\d+) · /,
    extra: { myths: "Myths and weak claims", rule: "One rule for the agent before the tips" },
  },
  {
    file: "docs/cv-weak-points-research.md",
    prefix: "WP",
    heading: /^### (\d+\.\d+) `[^`]+`: (.+)$/,
    source: /^- (W\d+) · /,
    extra: { sensitive: "Sensitive ground", "claims-not-to-repeat": "Claims not to repeat" },
  },
  {
    file: "docs/cv-sections-research.md",
    prefix: "SR",
    heading: /^### ()(.+)$/,
    source: /^- (S\d+) · /,
    extra: { "no-evidence": "No good evidence" },
  },
];

const slug = (s: string) => s.toLowerCase().replace(/\(.*?\)/g, "").trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").split("-").slice(0, 3).join("-");

function parse(doc: Doc, md: string): Entry[] {
  const lines = md.split("\n");
  const sources = new Map<string, string>();
  for (const l of lines) {
    const m = l.match(doc.source);
    if (m) sources.set(m[1], l.slice(2));
  }
  const withSources = (text: string) => {
    const ids = [...text.matchAll(/\[([^\]]+)\]/g)].flatMap((m) => m[1].split(/[,\s]+/)).filter((t) => sources.has(t));
    const unique = [...new Set(ids)];
    return unique.length ? `${text}\n\nSources:\n${unique.map((id) => `- ${sources.get(id)}`).join("\n")}` : text;
  };
  // Blocks end at the next ### or ## heading.
  const block = (start: number) => {
    let end = start + 1;
    while (end < lines.length && !/^#{2,3} /.test(lines[end])) end++;
    return lines.slice(start, end).join("\n").trim();
  };

  const entries: Entry[] = [];
  lines.forEach((l, i) => {
    const m = l.match(doc.heading);
    if (!m) return;
    const id = m[1] || slug(m[2]);
    entries.push({ id: `${doc.prefix}:${id}`, title: m[2].trim(), text: withSources(block(i)) });
  });
  for (const [id, title] of Object.entries(doc.extra)) {
    const i = lines.indexOf(`## ${title}`);
    if (i >= 0) entries.push({ id: `${doc.prefix}:${id}`, title, text: withSources(block(i)) });
  }
  return entries;
}

// Topic docs in docs/research/: the prefix comes from the file's "Prefix: XX" line.
async function researchDocs(root: string): Promise<Doc[]> {
  const dir = join(root, "docs/research");
  const names = (await readdir(dir).catch(() => [] as string[])).filter((n) => n.endsWith(".md")).sort();
  const docs: Doc[] = [];
  for (const name of names) {
    const prefix = (await Bun.file(join(dir, name)).text()).match(/^Prefix: ([A-Z]{2,3})$/m)?.[1];
    if (!prefix) continue;
    docs.push({
      file: `docs/research/${name}`,
      prefix,
      heading: new RegExp(`^### ${prefix}(\\d+) \`[^\`]+\`: (.+)$`),
      source: /^- (Q\d+) · /,
      extra: {},
    });
  }
  return docs;
}

let entries: Promise<Map<string, Entry>> | null = null;
const load = (root: string) =>
  (entries ??= researchDocs(root)
    .then((extra) => Promise.all([...DOCS, ...extra].map(async (d) => parse(d, await Bun.file(join(root, d.file)).text()))))
    .then((all) => new Map(all.flat().map((e) => [e.id, e]))));

// One line per entry, for the instructions.
export async function researchIndex(root: string): Promise<string> {
  return [...(await load(root)).values()].map((e) => `${e.id} · ${e.title}`).join("\n");
}

// Full entries for the given ids; unknown ids are reported, not guessed.
export async function lookup(root: string, ids: string[]): Promise<string> {
  const all = await load(root);
  return ids
    .map((id) => all.get(id.trim())?.text ?? `${id}: unknown id (use an id from the research index)`)
    .join("\n\n----------\n\n");
}
