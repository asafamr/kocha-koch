# CV templates: space and spacing

Generated from measurements of the CV Styles stories (the sample CV, `frontend/cv/data.ts`) in
headless Chrome, on 2026-10-06, for every typography. Use it to size content for a template
before writing it, and to target spacing patches at selectors that exist. The page is A4
(297 mm); content past the bottom margin is cut.

## Budget

- A bullet costs `ceil(characters / chars per line) × mm per line + bullet gap`.
- A role costs its overhead (role, company and dates lines, and the gap before it) plus its
  bullets.
- The sample CV has 2 roles, 5 bullets, a 3-line summary, 1 degree, military service and 3
  skill rows. "Free" is what it leaves above the bottom margin; size a CV by how much it adds
  or removes relative to the sample.

Chars per line depend on the body font: Hanken (Bricolage, Literata typography) / Newsreader /
Schibsted (Schibsted, Editorial). Use the smallest number when unsure.

| Template | Layout | Chars per bullet line | mm per line | Bullet gap mm | Role overhead mm | Free with the sample CV, mm | Margins mm (top/bottom/side) |
|---|---|---|---:|---:|---:|---|---|
| Ledger | one column, labels on the left | 97/102/93 | 4.98 | 0.7 | 10.6 | 101.8 (≈ 17 bullet lines) | 11/9/12 |
| Sidebar | two columns: main + tinted side (contact, skills, education, service) | 78/82/75 | 5.29 | 1 | 11.6 | 124.6 (≈ 19 bullet lines) | set on each column |
| Bars | one column | 121/127/117 | 4.98 | 0.5 | 5 | 114.8 (≈ 20 bullet lines) | 10/10/10 |
| Compact | one column, dense, no summary | 124/130/119 | 4.41 | 0.8 | 8.6 | 151 (≈ 28 bullet lines) | 9/9/9 |
| Lede | one column, large summary | 115/121/111 | 5.6 | 1 | 12.1 | 55.3 (≈ 8 bullet lines) | 14/12/13 |
| Margin | two columns: main + narrow side (contact, skills, education, service) | 82/86/79 | 5.16 | 1 | 11.2 | 125.9 (≈ 20 bullet lines) | set on each column |

Lede has the least room (its summary is set at 15pt). Sidebar and Margin have the narrowest
bullet lines, so long bullets wrap sooner there.

## Spacing selectors

For a `patch` with `template` set (see `docs/prompts/cv-content.md`, rule 5). Patch CSS is
nested under `.cv-doc`. Keep body text at 9pt or more, line height at 1.3 or more and page margins
at 10 mm or more.

- **Ledger**: sections `.cv-lg-section` (padding-top 3mm, margin-bottom 5mm); roles `.cv-lg-entry + .cv-lg-entry` (4mm); bullets `.cv-ledger li` (0.7mm); header `.cv-ledger header` (7mm), name `.cv-ledger h1` (6mm)
- **Sidebar**: headings `.cv-sidebar h2` (9mm above, 3mm below); roles `.cv-sidebar .cv-entry + .cv-entry` (5.5mm); bullets `.cv-sidebar .cv-main li` (1mm); title `.cv-sidebar .cv-title` (3.5mm/6mm)
- **Bars**: headings `.cv-bars h2` (4mm above, 2mm below); roles `.cv-bars .cv-entry` (margin-bottom 2.5mm); bullets `.cv-bars li` (0.5mm); header `.cv-bars header` (5mm)
- **Compact**: headings `.cv-compact h2` (3.5mm above, 1.5mm below); roles `.cv-compact .cv-entry` (margin-bottom 1.5mm); bullets `.cv-compact li` (0.8mm)
- **Lede**: summary `.cv-lede .cv-summary` (15pt, 13mm above, 4mm below); headings `.cv-lede h2` (11mm above, 4mm below); roles `.cv-lede .cv-entry + .cv-entry` (6.5mm); bullets `.cv-lede li` (1mm)
- **Margin**: headings `.cv-margin .cv-main h2` (9mm above); roles `.cv-margin .cv-entry + .cv-entry` (5mm); bullets `.cv-margin li` (1mm); title `.cv-margin .cv-title` (4mm/7mm); side column `.cv-margin .cv-aside`
