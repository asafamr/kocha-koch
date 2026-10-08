# Gemini costs

What a reply from the Gemini backend (`src/gemini.ts`) costs, measured on 2026-10-06 with
`gemini-3.8-flash` at paid-tier prices through 2026-12-31 ($0.75 per 1M input tokens, $0.075 per
1M cached input, $3.75 per 1M output including thinking, $0.50 per 1M cached tokens per hour of
storage; prices double on 2027-01-01, https://ai.google.dev/gemini-api/docs/pricing).

## Benchmark

One scenario, three messages, on the fictional sample CV: the intake (a Senior Backend Engineer
ad that asks for Go and Kubernetes, which the CV lacks), "add Kafka", and a 10 mm overflow in
Ledger. Usage is Gemini's own `usageMetadata`, logged per model turn. Checks: valid JSON, CV and
tips present, every source URL found in our docs, no Go or Kubernetes invented, Kafka added, the
overflow fixed (all variants below passed every check unless noted).

| Variant | Instructions sent | Cost (3 messages) | Per message | Time (3 replies) |
|---|---|---:|---:|---:|
| Full research docs inline, medium thinking (first version) | ~74k tokens | ≈ $0.25 (+ thinking, not logged) | ≈ $0.08+ | ~120 s |
| Index + `lookup` tool, medium thinking (model default) | 9k | $0.096 | 3.2¢ | 90 s |
| Index + `lookup`, low thinking | 9k | $0.069 | 2.3¢ | 44 s |
| Index + `lookup`, low thinking, explicit cache | 9k, cached | $0.034 | 1.1¢ | 44 s |
| Same, `lookup` only when writing tips | 9k, cached | $0.025 | 0.8¢ | 36 s |
| Same, plus `cv-templates.md` and five more research docs in the index (**default**) | 11.4k, cached | $0.022–0.041 | 0.7–1.4¢ | 46–72 s |
| Minimal thinking | | fails: not supported by gemini-3.8-flash | | |

Runs vary: at low, gemini-3.8-flash usually reports no thinking tokens, but one run used 2.4k
(about $0.009 more). Total spent on these benchmarks, including smoke tests and the grounding runs: about $1.01.

## Grounding and thinking level

A second scenario on a fictional senior CV built with traps: a "Helped bring … into
production" line, a "tightly coupled" platform, one EMNLP paper, a 7-year-old role. Messages:
the intake (Research Infrastructure Architect), "add MLflow", and a 150 mm overflow in Margin.
Checks: no added qualifiers ("sub-second", "top-tier", "peer-reviewed"), meaning and ownership
kept, counts exact, MLflow added, every role kept after the overflow (old roles compressed to
one line), Hebrew plural address. Both runs below follow the grounding rules in
`docs/prompts/cv-content.md` rule 1.

| Thinking | Cost (3 messages) | Time (3 replies) | Result |
|---|---:|---:|---|
| high | $0.197 | 314 s (intake 142 s) | all checks pass; 14 sources; consults more research |
| medium (**default**) | $0.056 | 108 s (intake 50 s) | all checks pass; 5 sources |
| low | $0.039 | 56 s | all checks pass; 5 sources |

High costs about 3.5 times medium and is slower; the grounding rules did most of the work.
Medium is the default; set `GEMINI_THINKING_LEVEL` to high or low to trade depth for cost. While it thinks, the page shows the
step, the seconds and the model's latest thought heading (streamed thought
summaries), so a two-minute answer does not look stuck.

## What moved the cost

1. **Index + lookup tool** (`src/kb.ts`): the research docs (~65k tokens) became a one-line
   index; the model asks for full entries and their sources with `lookup`. The extra model turn
   costs far less than sending the docs every time.
2. **Low thinking**: thinking tokens are billed as output ($3.75/1M). At low, gemini-3.8-flash
   reported no thinking tokens, and replies were twice as fast with the same check results.
3. **Explicit cache**: the instructions and tool definitions are cached (see Cache lifetime) and billed
   at a tenth of the input price. Implicit caching (automatic, 4,096-token minimum) never hit in
   these runs (`cachedContentTokenCount` stayed 0), so the explicit cache is what saves.

4. **Lookup only when needed**: the prompt tells the model to skip `lookup` for small edits and
   chat, which saves a model turn on most follow-up messages.

Storage of the cache (~11k tokens) costs about $0.006 per hour it exists; it is recreated on
demand after it expires.

## Verification pass

After Gemini writes a CV, a second call at low thinking (`docs/prompts/verify.md`) compares
every string of the CV with the sources (the uploaded CV, the intake fields, the user's chat
messages) and returns the smallest fixes, applied by exact match. It costs about $0.0015 per
reply (~1.6k input tokens). In the grounding benchmark it turned "Integrated MLflow for
experiment tracking" into "Worked with MLflow" (what the user said) and put back the source's
summary wording in place of "resilient, cost-efficient systems". It errs on the cautious side.

## Cache lifetime

The explicit cache (~12k tokens) bills storage for as long as it exists, whether or not anyone
is using it, and it is shared by everyone on the pod, not tied to a session. It lives 10
minutes, is extended when used, and is deleted when the server gets SIGTERM (Cloud Run's stop
signal), so an idle pod pays for at most about 10 minutes ($0.001). Turns that need JSON mode
with tools off send the instructions inline, because a cached request cannot switch the tools
off.

## Spend limit

`src/spend.ts` caps spend per process (one pod on Cloud Run) with a leaky bucket in dollars:
each model turn adds its cost (from Gemini's token counts; creating or extending the cache adds its
storage), and the bucket drains at `GEMINI_SPEND_PER_HOUR` (default $10). It holds at most
`GEMINI_SPEND_BURST` (default one hour's worth) and starts empty, so a new pod has the full
allowance. While it is full, new answers get "קוחה עמוסה כרגע" until it drains. Prices are
`GEMINI_PRICE_INPUT`, `GEMINI_PRICE_CACHED`, `GEMINI_PRICE_OUTPUT` and
`GEMINI_PRICE_CACHE_STORAGE` ($ per 1M tokens); update them when prices change (they double on
2027-01-01). Each turn's log line shows its cost and the bucket level.

## Not done yet

- Replies resend the whole CV (~1.7k output tokens) even for a one-line change.
- The conversation history is not cached; only the instructions are.
