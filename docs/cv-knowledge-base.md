# CV knowledge base

Evidence-backed tips for writing a one-page CV, for the kocha CV agent. The agent takes a
user's current CV, a target role and an optional job description, and writes a tailored
one-page CV in Hebrew or English. This file is guidance for that agent. No program parses it.

50 tips in 8 groups, a section of myths and weak claims, and a deduplicated source list
(93 sources). Every URL was opened during the research pass in September 2026. Pages that
would not load are listed at the end and are not cited.

## Conventions

This file follows the conventions of the kohi interview-tips vault (`/home/asaf/ws/kohi/tips`,
`tips-en`, `docs/tips-kb.md`, `docs/tip-mining.md`):

- **Source tiers, same three as kohi.** Each source carries one:
  - `study`: primary research or a peer-reviewed paper.
  - `practitioner`: first-hand standing in hiring. Here that covers university career
    services, government and legal guides, recruiters, and ATS vendors documenting their own
    product.
  - `popular`: content marketing, job boards, résumé-builder blogs, vendor press releases.

  As in kohi, the tier is not a ranking. It shows what a tip rests on.
- **Weight 1-3**, as in kohi. A hint for the agent about priority, not a score.
- **No number that is not in the source.** Every figure in a tip's "Why" appears on the cited
  page. Numbers inside "How to apply" example rewrites are made up for illustration.
- **Attribute rather than assert.** Popular claims without a traceable study sit in
  [Myths and weak claims](#myths-and-weak-claims), the equivalent of kohi's `UNVERIFIED.md`.
  If one is used, name who says it and drop the number.
- **Independent sources with different vantage points** beat several pages repeating each
  other. Each tip says when a study supports only the general mechanism rather than the exact
  CV move.
- **A video is cited to the second** (`&t=`). The one video found here has no verified
  timestamp, and the tip says so.
- **The candidate faces an average reader.** kohi's tips are advice for the candidate, not
  best practice for the interviewer. Here the tips are advice for the CV, facing an average
  recruiter and an ordinary ATS (applicant tracking system, the software that stores and
  searches applications), not a well-run process.

kohi has no evidence-strength scale beyond the tier. This file adds one, derived from the
tiers of a tip's sources:

| Strength | Meaning |
|---|---|
| **Strong** | At least one peer-reviewed or field experiment on CVs or applications tests this move, and practitioner sources agree. |
| **Moderate** | Research supports the mechanism but not the exact move, or the research is old or indirect. Or the vendor documents the behaviour of its own system, or a large recruiter survey supports it. Practitioner sources agree. |
| **Convention** | Consistent practitioner guidance with no test behind it. |
| **Weak** | Only commercial or single-author sources, or the sources disagree. |

Source citations use IDs (`[S12]`) from the [consolidated list](#consolidated-sources). Each tip
repeats type, title, author or publisher, year and URL for its own sources.

### One rule for the agent before the tips

**Never invent a number, a title or a result.** kohi's rule is that a number a candidate
could look up and find false costs everything. The CV version: a figure the user cannot
defend in an interview does the same damage. When a bullet needs a number the CV does not
have, ask the user. If they don't know it, write the result without a number (see A3).

## Contents

- [A. Measurable outcomes and bullet content](#a-measurable-outcomes-and-bullet-content)
- [B. Automatic screening (ATS)](#b-automatic-screening-ats)
- [C. Tailoring, summary and section order](#c-tailoring-summary-and-section-order)
- [D. Length and how recruiters read](#d-length-and-how-recruiters-read)
- [E. Formatting and personal details](#e-formatting-and-personal-details)
- [F. Typos and language errors](#f-typos-and-language-errors)
- [G. Skills and soft-skill claims](#g-skills-and-soft-skill-claims)
- [H. Gaps, career changers, juniors, Israel, Hebrew vs English](#h-gaps-career-changers-juniors-israel-hebrew-vs-english)
- [Myths and weak claims](#myths-and-weak-claims)
- [Consolidated sources](#consolidated-sources)
- [Pages that did not load](#pages-that-did-not-load)

---

## A. Measurable outcomes and bullet content

### A1 `quantify-results`: Put a number on the result
**Weight 3 · Strength: Moderate**

**Tip.** Where the user has one, give the result as a number: money, time, volume, users,
percentage, rank or team size.

**Why.**
- Thoms et al. (1999) found that CVs with accomplishment statements got more favourable
  ratings than CVs without them. Risavy's 2017 review summarises this with the example "not
  one customer complaint in two years" [S79, S80].
- In a CareerBuilder/Harris survey of 1,138 hiring and HR managers, 34% named a résumé
  "without quantifiable results" an instant deal breaker [S62].
- Google's then SVP of People Operations, Harvard, Stanford and MIT all tell candidates to
  quantify [S75, S70, S77, S37].
- The study is old and tests accomplishment statements in general, not numbers alone.

**How to apply.**
- Before: "Handled customer support tickets." After: "Resolved about 40 tickets a day,
  first-reply time down from 6 h to 2 h."
- Scope counts as a number: "for 12 branches", "team of 5", "₪2M budget".

**Sources.**
- [S80] study · research paper: Thoms, McMasters, Roberts & Dombkowski, "Resume Characteristics as Predictors of an Invitation to Interview", *J. Business and Psychology* 13(3), 1999. https://link.springer.com/article/10.1023/A:1022974232557
- [S79] study · literature review: Risavy, "The Resume Research Literature: Where Have We Been and Where Should We Go Next?", *J. Educational and Developmental Psychology* 7(1), 2017. https://ccsenet.org/journal/index.php/jedp/article/download/66404/35947
- [S62] popular · recruiter survey: CareerBuilder/Harris Poll, "Employers Share Their Most Outrageous Resume Mistakes and Instant Deal Breakers", 2018. https://www.prnewswire.com/news-releases/employers-share-their-most-outrageous-resume-mistakes-and-instant-deal-breakers-in-a-new-careerbuilder-study-300701888.html
- [S75] practitioner · industry article: Laszlo Bock (Google), "My Personal Formula for a Winning Resume", LinkedIn, 2014. https://www.linkedin.com/pulse/20140929001534-24454816-my-personal-formula-for-a-better-resume
- [S37] practitioner · university career guide: MIT CAPD, "Career toolkit: Crafting an effective resume", n.d. https://capd.mit.edu/resources/career-toolkit-crafting-an-effective-resume/

### A2 `xyz-shape`: Write each bullet as verb, result, and how
**Weight 3 · Strength: Convention**

**Tip.** Build bullets as "Accomplished X, as measured by Y, by doing Z" (Google's X-Y-Z) or
Project-Action-Result (MIT's PAR). The order can vary. All three parts should be present.

**Why.**
- Bock (Google): "Accomplished [X] as measured by [Y] by doing [Z]". Start with an active
  verb, measure what you accomplished, give a baseline, and say what you did [S75].
- MIT: "PAR stands for Project, Action, and Result" [S37].
- North Georgia uses action + context + result [S78].
- No source shows that one of X-Y-Z, CAR, PAR or STAR beats another. They are the same idea
  with different labels.

**How to apply.**
- Before: "Worked on the checkout page." After: "Cut checkout abandonment 18% by rebuilding
  the payment form in React and removing two steps."
- Put the result early when it is strong. Recruiters skim, see D3.

**Sources.**
- [S75] practitioner · industry article: Bock, LinkedIn, 2014. https://www.linkedin.com/pulse/20140929001534-24454816-my-personal-formula-for-a-better-resume
- [S37] practitioner · university career guide: MIT CAPD career toolkit, n.d. https://capd.mit.edu/resources/career-toolkit-crafting-an-effective-resume/
- [S78] practitioner · university career guide: University of North Georgia, "Accomplishment Statements", n.d. https://ung.edu/career-services/online-career-resources/resumes-cover-letters/accomplishment-statements.php
- [S76] practitioner · video: Life at Google, "Create Your Resume for Google: Tips and Advice", 2019. https://www.youtube.com/watch?v=BYUy1yvjHxE. **No timestamp.** The transcript could not be retrieved, so only the description (two Google recruiters giving résumé tips) is verified, not that the video states X-Y-Z.

### A3 `baseline-or-honest-qualitative`: Give a baseline when you can, and no fake numbers when you can't
**Weight 2 · Strength: Convention**

**Tip.** A number means more next to a baseline: before and after, versus peers, versus the
target. When no real number exists, state the result in words and do not invent one.

**Why.**
- Bock's example: "Served 85 customers per day with 100% accuracy … compared to an average of
  70 customers at 90% accuracy for my peers" [S75].
- MIT: "Including a quantitative result makes your accomplishments more concrete and
  compelling. But don't worry if you don't have exact numbers" [S37].
- Recruiters use the CV to decide on an interview [S75], where any number can be questioned.

**How to apply.**
- With a baseline: "Cut monthly close from 10 to 6 working days."
- Without a number: "Replaced the manual weekly report with an automated dashboard now used
  by the sales team."
- Agent rule: ask the user for the figure. Never estimate it for them.

**Sources.** [S75], [S37] (as in A2).

### A4 `achievements-not-duties`: Replace duty descriptions with what changed
**Weight 3 · Strength: Moderate**

**Tip.** Cut "responsible for …" and "duties included …". Say what the user did and what came
of it.

**Why.**
- Harvard lists "Not demonstrating results" among its top 5 mistakes [S70].
- Stanford: "avoid phrases such as 'duties included'" [S77].
- North Georgia flags "responsible for" as passive and shows a rewrite [S78].
- Risavy: "elaborating upon accomplishment statements as opposed to making unwarranted and
  exaggerated self-descriptive statements appears to be beneficial advice", citing Thoms
  1999 [S79, S80].
- The ban on the exact phrase "responsible for" is a career-centre rule. No study tests it.

**How to apply.**
- Before: "Responsible for onboarding new employees." After: "Onboarded 30 new hires in 2024.
  Wrote the first-week checklist now used across the department."

**Sources.**
- [S70] practitioner · university career guide: Harvard FAS Mignone Center, "Create a Strong Resume", n.d. https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/
- [S77] practitioner · university career guide: Stanford Career Development Center, "Resumes/Cover Letters", c. 2013. https://careered.stanford.edu/sites/g/files/sbiybj22801/files/media/file/resume-and-cover-letter-examples.pdf
- [S78] practitioner · university career guide: University of North Georgia, "Accomplishment Statements", n.d. https://ung.edu/career-services/online-career-resources/resumes-cover-letters/accomplishment-statements.php
- [S79] study · literature review: Risavy 2017. https://ccsenet.org/journal/index.php/jedp/article/download/66404/35947

### A5 `action-verb-first`: Start each bullet with a specific action verb
**Weight 2 · Strength: Moderate**

**Tip.** Open each bullet with a verb that names the action, such as "built", "cut", "led",
"negotiated" or "trained". Avoid weak openers like "helped with" or "worked on".

**Why.**
- CareerBuilder surveyed 2,201 hiring managers (Nov-Dec 2013) on the words they liked:
  "Achieved" 52%, "Improved" 48%, "Trained/Mentored" 47%, "Managed" 44%, "Created" 43% [S81].
- Risavy cites studies supporting "action verbs and bullets in addition to bolding"
  (Burns et al. 2014; Hornsby & Smith 1995) [S79].
- Harvard lists "Using passive language instead of 'action' words" as a top mistake [S70].
- Tel Aviv University's career centre asks for active verbs in Hebrew CVs [S41].

**How to apply.**
- Hebrew: use a past-tense first-person verb ("הובלתי", "פיתחתי", "צמצמתי") or a noun of
  action ("הובלת", "פיתוח"). Keep one form throughout the CV.

**Sources.**
- [S81] popular · recruiter survey: CareerBuilder/Harris Poll, "Hiring Managers Rank Best and Worst Words to Use in a Resume", 2014. https://www.webwire.com/ViewPressRel.asp?aId=186181
- [S79] study · literature review: Risavy 2017 (as above).
- [S70] practitioner · university career guide: Harvard (as above).
- [S41] practitioner · university career guide: Tel Aviv University Career Development Center, "כתיבת קורות חיים" (Writing a CV), n.d. https://career.tau.ac.il/writingcv

### A6 `own-contribution`: Make the user's own part explicit
**Weight 3 · Strength: Convention**

**Tip.** When the work was a team effort, say what the user personally did and their role in
the team. Write it without "we".

**Why.**
- MIT: "Use action verbs instead of 'I' or 'we'" [S37]. Stanford: "Don't include personal
  pronouns (e.g. I, me, we)" [S77]. Harvard lists "I" and "We" under don'ts [S70].
- The verb-first form (A5) forces an actor, and in a CV that actor is the candidate.
- No source tests "own contribution vs team credit" on CVs directly. kohi's interview tip
  `put-yourself-in-the-sentence` rests on the same advice for spoken answers (UVA career
  centre: use "I" rather than "we").

**How to apply.**
- Before: "We migrated the platform to AWS." After: "Led the database part of a 6-person
  AWS migration; moved 40 services with zero downtime."
- If the user's role was small, name it precisely rather than claiming the whole outcome.

**Sources.** [S37], [S77], [S70] (as above).

### A7 `short-bullets`: Short bullets, not paragraphs
**Weight 2 · Strength: Moderate**

**Tip.** One to two lines per bullet and three to five bullets per recent role. No text
blocks.

**Why.**
- 25% of 1,138 hiring managers named "long paragraphs of text" an instant deal breaker
  [S62].
- In TheLadders' 2018 eye-tracking coverage, "cluttered layouts, a lack of white space …
  multiple columns and long sentences" did poorly [S56].
- Risavy cites support for bullets [S79].
- Wingate et al. (2025) found that application materials with more detail, clarity and
  structure got more interviews, among 183 co-op students [S85].

**How to apply.**
- Split any bullet over two lines. Move context into the role line (company, what it does).

**Sources.**
- [S62] popular · recruiter survey: CareerBuilder 2018 (as above).
- [S56] popular · industry article: HR Dive, "Eye-tracking study shows recruiters look at resumes for 7 seconds", 2018. https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/
- [S85] study · research paper: Wingate, Robie, Powell & Bourdage, "The Signals That Matter: Resumes, Cover Letters, and Success on the Job Search", *Int. J. Selection and Assessment* 33, 2025. https://api.openalex.org/works/doi:10.1111/ijsa.70022

---

## B. Automatic screening (ATS)

What the evidence says overall: ATS store, parse and search applications. Recruiters filter
and search them by keyword. Automatic rejection happens mostly through knockout questions
that the recruiter sets, not through a parser silently dropping CVs. No peer-reviewed study
measures ATS rejection rates. See the "75%" myth below.

### B1 `mirror-jd-terms`: Use the job description's exact words for skills and titles
**Weight 3 · Strength: Moderate**

**Tip.** Where the user really has the skill, write it in the same words the job description
uses, such as "PostgreSQL", "stakeholder management" or "Salesforce". Don't swap in a
synonym.

**Why.**
- Greenhouse's keyword filter: "the keyword from your search must exactly match the keyword
  in the application" [S1].
- Greenhouse search does not add synonyms. The recruiter has to type "trainer OR instructor
  OR teacher" [S2]. Greenhouse's AI suggests synonyms to the recruiter, who still chooses
  which to search [S4].
- Jobscan surveyed 384 recruiters (2025): 99.7% use ATS filters; 76.4% filter by skills,
  59.7% by education and 55.3% by job title. Jobscan sells a keyword-matching tool [S5].
- UIC: "Be specific -- i.e., 'Adobe Photoshop' instead of 'image-editing software'" [S8].

**How to apply.**
- Pull the hard requirements from the job description. For each one the user truly has,
  make sure the exact term appears at least once, in the skills line or better in a bullet.
- Never add a skill the user does not have in order to match.

**Sources.**
- [S1] practitioner · vendor docs: Greenhouse Support, "Talent Filtering", n.d. https://support.greenhouse.io/hc/en-us/articles/27104809835291-Talent-Filtering
- [S2] practitioner · vendor docs: Greenhouse Support, "Search candidates using Boolean queries", n.d. https://support.greenhouse.io/hc/en-us/articles/202360199-Search-candidates-using-Boolean-queries
- [S4] practitioner · vendor blog: Greenhouse, "What really happens after you apply for a job", 2025. https://my.greenhouse.com/blogs/what-really-happens-after-you-apply-for-a-job
- [S5] popular · recruiter survey: Jobscan, "The State of the Job Search in 2025", 2025. https://www.jobscan.co/state-of-the-job-search
- [S8] practitioner · university career guide: UIC Office of Career Services, "Optimizing Resumes for Applicant Tracking Systems", 2017. https://careerservices.uic.edu/wp-content/uploads/sites/26/2017/08/Ensure-Your-Resume-Is-Read-ATS.pdf

### B2 `acronym-and-full`: Write both the acronym and the full term
**Weight 2 · Strength: Convention**

**Tip.** The first time a term appears, write the full phrase and the acronym, for example
"Search Engine Optimization (SEO)" or "Certified Public Accountant (CPA)".

**Why.**
- Indeed: "Write out the full phrase on first reference, followed by the acronym in
  parentheses" [S7].
- UIC gives the same advice [S8].
- Jobscan says Lever stems words (collaborate/collaborated) but does not expand
  abbreviations, so "SEO" and "Search Engine Optimization" are separate searches [S6]. This
  is Jobscan's claim. Lever's own help page did not load.

**How to apply.**
- Hebrew CV: keep the English technical term. Add the Hebrew only if the job description
  uses it.

**Sources.**
- [S7] popular · job-board guide: Indeed Editorial Team, "ATS-Friendly Resume: 18 Tips", 2026. https://www.indeed.com/career-advice/resumes-cover-letters/automated-screening-resume
- [S8] practitioner · university career guide: UIC 2017 (as above).
- [S6] popular · industry article: Jobscan, "Lever ATS: What Every Job Seeker Should Know", 2026. https://www.jobscan.co/blog/lever-ats/

### B3 `target-title`: Use the target title where it is honest
**Weight 2 · Strength: Convention**

**Tip.** If the user's real job matches the target role but had an internal or odd title, use
the recognised market title in the headline, or next to the official title.

**Why.**
- 55.3% of recruiters in Jobscan's survey filter by job title [S5].
- UIC: "do use that exact job title on the resume" [S8].
- Greenhouse lists "incomplete job titles" among the causes of a failed parse [S9].
- TheLadders' 2012 study found recruiters spent most of their time on titles, employers and
  dates [S54].

**How to apply.**
- "Member of Technical Staff (Backend Engineer)". Never retitle a role to one the user did
  not perform.

**Sources.** [S5], [S8] (as above).
- [S9] practitioner · vendor docs: Greenhouse Support, "Unsuccessful resume parse", n.d. https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse
- [S54] popular · eye-tracking study: TheLadders (Will Evans), "Keeping an eye on recruiter behavior", 2012. https://www.bu.edu/com/files/2018/10/TheLadders-EyeTracking-StudyC2.pdf

### B4 `contact-in-body`: Keep name and contact details in the page body
**Weight 3 · Strength: Moderate**

**Tip.** Put name, phone, email and LinkedIn in plain text at the top of the page body, not
in the Word header or footer and not in a text box.

**Why.**
- Greenhouse lists "Resumes with the name and contact information in the header, footer, or
  text box" as a cause of failed parsing [S9].
- Santa Clara: "ATS systems typically do not read headers and footers" [S12].
- Indeed: "Some resume screening systems may not accurately read headers and footers" [S7].
- A one-person parser test (commercial author) traced the Word file's lower score to contact
  details in the page header [S13].

**How to apply.**
- In the generated PDF or DOCX, the name block is the first text in the document flow.

**Sources.**
- [S9] practitioner · vendor docs: Greenhouse (as above).
- [S12] practitioner · university career guide: Santa Clara University Career Center, "Job Scan Common ATS Resume Formatting Mistakes", n.d. https://www.scu.edu/careercenter/toolkit/job-scan-common-ats-resume-formatting-mistakes/
- [S7] popular · job-board guide: Indeed 2026 (as above).
- [S13] popular · industry article: Muneeb Nawaz, "I parsed the same resume six ways to settle 'PDF or Word'", DEV Community, n.d. https://dev.to/muneeb_nawaz/i-parsed-the-same-resume-six-ways-to-settle-pdf-or-word-mnk

### B5 `single-column-no-tables`: One column; no tables, text boxes or graphics for key content
**Weight 3 · Strength: Moderate**

**Tip.** Lay out the key content (roles, dates, bullets, skills) as one column of plain text.
Don't place it in tables, text boxes, icons, skill bars or images.

**Why.**
- Greenhouse lists as parse failures: "graphics, photos, or word art", "Complex resumes with
  tables, headers, and footers", "Resumes that have a columned layout", and "A resume with
  spaces between the letters" [S9].
- Textkernel, a parser vendor, says reading a column layout top-down mixes sections
  together. Its machine-learning model raised accuracy on column CVs "from 60% to 82%". So
  columns are improving but not solved [S11].
- Santa Clara and Indeed say to avoid tables, charts, graphics and boxes [S12, S7].
- Enhancv, which sells templates, claims columns are a solved problem and that 44 of 60
  interview-winning CVs it saw used two columns [S14]. That is an anecdote from an
  interested party.
- The design implication for kocha: some of its visual templates use a sidebar or bands. A
  side column is a known parse risk on some ATS.

**How to apply.**
- Offer a one-column template as the default for online applications. Keep two-column
  designs for CVs handed to a person.
- If a sidebar is used, keep only low-stakes items in it (languages, links). Never roles or
  dates.

**Sources.** [S9], [S12], [S7] (as above).
- [S11] practitioner · vendor engineering blog: Textkernel, "Improving extraction from column resumes", n.d. https://www.textkernel.com/learn-support/blog/improving-extraction-from-column-resumes/
- [S14] popular · industry article: Enhancv (Volen Vulkov), "The State of Resume Parsing: Does ATS Read Two-Column Resumes?", 2026. https://enhancv.com/blog/ats-resume-parsing/

### B6 `standard-headings`: Use standard section headings
**Weight 2 · Strength: Convention**

**Tip.** Use "Experience", "Education", "Skills" and "Certifications" (in Hebrew: "ניסיון
תעסוקתי", "השכלה", "כישורים"). No clever headings.

**Why.**
- Santa Clara: "'Work Experience,' 'Education,' 'Skills,' and 'Certifications' are
  universally recognized by ATS. Custom headings might not be parsed correctly" [S12].
- Indeed: "Avoid idioms, metaphors, puns or creative section headings" [S7].
- Greenhouse lists "Resumes without clear sections" as a parse failure [S9].
- No source tests how Hebrew headings parse. See H10.

**Sources.** [S12], [S7], [S9] (as above).

### B7 `file-format`: Send a text-based PDF or a DOCX, whichever the posting asks for
**Weight 2 · Strength: Moderate**

**Tip.** Follow the posting's requested format. Otherwise a text-based PDF (with selectable
text, not a scan or image) or a DOCX is fine. Keep it under 2.5 MB.

**Why.**
- Greenhouse cannot parse files "larger than 2.5MB", or CVs "uploaded as an image, rather
  than a document" [S9].
- Oracle Taleo supports .pdf, .doc/.docx, .rtf, .txt and others, as set by the employer's
  administrator [S10].
- Santa Clara: "most can and prefer PDF documents. Ensure your PDF is not image-based"
  [S12].
- Indeed: follow the posting if it names a type [S7].
- The Tech Resume Inside Out interviewed recruiters on iCIMS, Taleo, Greenhouse, Workable
  and Workday: "Both PDF and Word documents are parsed well enough" [S15].
- UIC's 2017 advice to send .doc because "Not all ATS systems can read .docx, PDF" is out of
  date [S8].

**How to apply.**
- Check that kocha's exported PDF has real text: copy-paste from it should give the words in
  reading order, including the Hebrew.

**Sources.** [S9], [S12], [S7], [S8] (as above).
- [S10] practitioner · vendor docs: Oracle, Taleo Enterprise "Implementing Recruiting", attachments, 22D. https://docs.oracle.com/en/cloud/saas/taleo-enterprise/22d/otrcg/c-attachment.html
- [S15] practitioner · industry article: The Tech Resume Inside Out, "ATS Myths Busted", 2020. https://thetechresume.com/samples/ats-myths-busted

### B8 `keywords-in-context`: Put keywords inside achievements, don't stuff them
**Weight 2 · Strength: Convention**

**Tip.** Each required keyword should appear inside a bullet that shows it being used, and
optionally once in the skills line. No keyword lists, repetition or hidden text.

**Why.**
- Greenhouse: "There's a belief out there that you have to 'stuff' your application with
  certain keywords... This isn't the case with Greenhouse". Its "AI doesn't score or rank
  applications" [S4].
- TheLadders' 2018 release advises "keywords in context only" [S55].
- A human reads the CV after the search. A snippet under the candidate's name shows how the
  search term was used [S3].

**How to apply.**
- Before: "Skills: Python, Python scripting, Python automation". After: "Automated monthly
  billing reconciliation in Python, saving 2 days a month."

**Sources.** [S4] (as above).
- [S3] practitioner · vendor docs: Greenhouse Support, "Search resumes for keywords", n.d. https://support.greenhouse.io/hc/en-us/articles/115004600186-Search-resumes-for-keywords
- [S55] popular · eye-tracking study (press release): TheLadders, "Ladders Updates Popular Recruiter Eye-Tracking Study…", PR Newswire, 2018. https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html

### B9 `hard-requirements-visible`: Make every hard requirement the user meets easy to find
**Weight 3 · Strength: Moderate**

**Tip.** Degrees, licences, certifications, years of experience, languages and work
eligibility that the posting requires should appear plainly, in the posting's wording.

**Why.**
- Greenhouse's auto-reject works only "based on an applicant's answer to a question", such
  as "Do you have a Class A Commercial Driver's License?" [S21].
- Workday's Screen step is "to filter out candidates that do not meet basic job criteria"
  [S22].
- Hidden Workers (HBS/Accenture, 2021; more than 8,000 workers and 2,250 executives in the
  US, UK and Germany): more than 90% of employers used their recruitment system to filter or
  rank candidates at first. 88% believed qualified high-skills candidates were screened out
  because they "did not match the exact criteria established by the job description" (94%
  for middle-skills) [S23]. These are employer self-reports, not measured exclusions.

**How to apply.**
- List required credentials by name ("B.Sc. Computer Science", "CPA (Israel)", "Hebrew and
  English, full working proficiency").
- State years only if they meet or exceed the stated requirement.

**Sources.**
- [S21] practitioner · vendor docs: Greenhouse Support, "Auto-reject", n.d. https://support.greenhouse.io/hc/en-us/articles/360000653472-Auto-reject
- [S22] practitioner · vendor docs: Workday, "Recruiting Subprocesses" (Recruiting for Administrators manual), n.d. https://doc.workday.com/workday-education/en-us/course-manuals/recruiting-for-administrators/recruiting-subprocesses.html
- [S23] study · research report (not peer-reviewed): Fuller, Raman, Sage-Gavin & Hines, "Hidden Workers: Untapped Talent", Harvard Business School and Accenture, 2021. https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021_Fuller_white_paper_33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf

---

## C. Tailoring, summary and section order

### C1 `tailor-relevance`: Lead with what matches this role
**Weight 3 · Strength: Moderate**

**Tip.** For each target role, choose and order bullets, projects and skills by how much they
match the job description. Cut or shorten what doesn't.

**Why.**
- Tsai et al. (2011; 216 recruiters in Taiwan): work experience and education raised
  recruiters' hiring recommendations *through* perceived person-job fit, meaning how well
  the applicant seems to match the job [S82].
- Knouse (1994): relevant education and experience raised perceived competence [S83].
- Cole et al. (2007; 244 recruiters, 122 real CVs): academics, work experience and
  extracurriculars together predicted perceived employability [S84].
- 18% of 1,138 hiring managers named a résumé "generic, not customized to company" a deal
  breaker [S62].
- Harvard and MIT both say to tailor [S70, S37].
- The studies show that relevant content matters. No study found here measures callbacks
  for tailored versus generic versions of the same CV.

**How to apply.**
- Rank the user's bullets against the job description's requirements. The top two of each
  role should hit the top requirements.
- Keep the facts. Change selection, order and wording only.

**Sources.**
- [S82] study · research paper: Tsai, Chi, Huang & Hsu, "The Effects of Applicant Résumé Contents on Recruiters' Hiring Recommendations: The Mediating Roles of Recruiter Fit Perceptions", *Applied Psychology* 60(2), 2011. https://api.openalex.org/works/doi:10.1111/j.1464-0597.2010.00434.x
- [S83] study · research paper: Knouse, "Impressions of the resume: The effects of applicant education, experience, and impression management", *J. Business and Psychology* 9(1), 1994. https://link.springer.com/article/10.1007/BF02230985
- [S84] study · research paper: Cole, Rubin, Feild & Giles, "Recruiters' Perceptions and Use of Applicant Résumé Information: Screening the Recent Graduate", *Applied Psychology* 56(2), 2007. https://api.openalex.org/works/doi:10.1111/j.1464-0597.2007.00288.x
- [S62] popular · recruiter survey: CareerBuilder 2018 (as above).

### C2 `clarity-over-keywords`: Tailoring does not replace clarity and detail
**Weight 2 · Strength: Moderate**

**Tip.** A tailored CV that is vague still loses. Spend the effort on concrete, clear,
well-structured bullets first, then on matching.

**Why.**
- Wingate et al. (2025, 183 co-op students, Canada): applicants whose materials had more
  detail, clarity and structure got substantially more interviews and found a job faster.
  The effect held after controlling for work experience, achievement and tailoring [S85].
- In a field experiment with about 500,000 jobseekers, writing help (spelling, grammar,
  style) raised hires by 8% [S24]. See F2.

**Sources.** [S85] (as above).
- [S24] study · field experiment: Wiles (van Inwegen), Munyikwa & Horton, "Algorithmic Writing Assistance on Jobseekers' Resumes Increases Hires", NBER w30886, 2023 (*Management Science* 2025). https://www.nber.org/papers/w30886

### C3 `summary-optional-specific`: A summary is optional; if present, 2-3 specific lines
**Weight 2 · Strength: Weak**

**Tip.** Use a short summary for career changers and experienced candidates: target role,
years, domain, one proof point. Skip it or keep it to one line for students.

**Why.**
- Duke recommends a summary for "Explaining a career shift or connecting professional
  experiences". It does not recommend one for "An Undergraduate student" or someone
  "Applying for a very technical position". Length: "2-3 sentences" [S86].
- Risavy: recruiters preferred an objective or summary over a personal opening, but the
  studies date from 1984-1997 and "future research is needed" [S79].
- TheLadders 2018 (vendor, no sample size): top CVs had an overview "primarily located at
  the top of the first page" [S55].
- Tel Aviv University and the Israeli Ministry of Defense guide both include a short
  professional summary at the top [S41, S40].
- The evidence is old or commercial, and the guidance splits on whether juniors should have
  one.

**How to apply.**
- Before: "Motivated, results-driven professional seeking a challenging role." After:
  "Backend engineer, 4 years in payments (Python, PostgreSQL). Cut settlement latency 60% at
  X. Looking for a senior backend role in fintech."

**Sources.**
- [S86] practitioner · university career guide: Duke Career Hub, "Summary Statements", n.d. https://careerhub.students.duke.edu/summary-statements/
- [S79] study · literature review: Risavy 2017 (as above).
- [S55] popular · press release: TheLadders 2018 (as above).
- [S41] practitioner · university career guide: Tel Aviv University (as above).
- [S40] practitioner · government guide: Israel Ministry of Defense, Rehabilitation and discharged soldiers unit, "איך כותבים מסמך קורות חיים כשאין ניסיון מקצועי?" (How to write a CV with no professional experience), n.d. https://www.hachvana.mod.gov.il/ConsultationAndDirection/Employment/Pages/cv-writing.aspx

### C4 `reverse-chronological`: Reverse chronological order; no functional CV
**Weight 3 · Strength: Moderate**

**Tip.** List roles most recent first, each with employer, title and dates. Do not use a
"functional" CV (skills grouped with no employers or dates).

**Why.**
- Risavy: "there is a strong preference for the traditional, standard, historical,
  chronological format over alternative options (e.g., functional…)", citing studies from
  1991-1995 [S79].
- Eastern Washington University: functional CVs are "harder to read and comprehend because
  it's not always clear which responsibilities and experiences belong to which employer"
  [S87].
- Alabama: "Not all employers like functional resumes" [S88].
- Stanford, Harvard, MIT and Tel Aviv University all specify reverse chronological order
  [S77, S70, S37, S41].
- A combination format (a skills summary on top, then a chronological history) is the
  accepted alternative for career changers. See H5.

**Sources.** [S79], [S77], [S70], [S37], [S41] (as above).
- [S87] practitioner · university career guide: Eastern Washington University Career Center, "Resume Myths", 2024. https://cdn.ewu.edu/careercenter/wp-content/uploads/sites/36/2024/12/resume-guide_myths-19.pdf
- [S88] practitioner · university career guide: University of Alabama Career Center, "Special Resumes", n.d. https://career.sa.ua.edu/develop/resumes/special_resumes/

### C5 `top-third-first`: Put title, employer and dates where the eye lands first
**Weight 3 · Strength: Weak**

**Tip.** The current or most relevant title, employer and dates, and the headline, go in the
top third of the page, in bold, easy to scan.

**Why.**
- TheLadders 2012 (30 recruiters, vendor study, no published method): "almost 80%" of review
  time went to six items: name, current title/company, current start and end dates,
  previous title/company, previous dates, and education [S54].
- The 2018 update (no sample size given): recruiters look for "layout, job titles, text flow,
  keywords". Top CVs had bold job titles with bulleted accomplishments [S55].
- The only peer-reviewed CV eye-tracking study found (40 recruiters, Sweden) tested photos
  and names, not layout [S59].
- The pattern is plausible and consistent. The data behind it is one vendor.

**Sources.** [S54], [S55] (as above).
- [S59] study · eye-tracking study: Osanami Törngren, Schütze, Van Belle & Nyström, "'We choose this CV because we choose diversity' – What do eye movements say about the choices recruiters make?", *Frontiers in Sociology*, 2024. https://pmc.ncbi.nlm.nih.gov/articles/PMC10954785/

### C6 `recent-gets-space`: Give recent, relevant roles the space; compress the rest
**Weight 2 · Strength: Convention**

**Tip.** Three to five bullets for the latest or most relevant role, one or two for older
ones. Roles over about 10-15 years old, or unrelated early jobs, become one line or go.

**Why.**
- TheLadders 2012: beyond the six key items, detail text "became filler and had little to no
  impact on the initial decision" [S54].
- MIT: order by recency and "focus on sharing the most relevant skills" [S37].
- Eriksson & Rooth found past unemployment followed by later work carried no penalty. That
  suggests recent history is what gets weighed [S28].
- The 10-15 year cut-off is a common rule of thumb. No source opened here gives a figure.

**Sources.** [S54], [S37] (as above).
- [S28] study · field experiment: Eriksson & Rooth, "Do Employers Use Unemployment as a Sorting Criterion When Hiring? Evidence from a Field Experiment", *American Economic Review* 104(3), 2014. https://www.aeaweb.org/articles?id=10.1257/aer.104.3.1014

---

## D. Length and how recruiters read

### D1 `one-page-default`: One page by default; two only for long, relevant careers
**Weight 3 · Strength: Convention**

**Tip.** Keep juniors and most mid-level candidates to one page. That is also the norm for
Israeli CVs. Never go past two.

**Why.**
- MIT: "Stick to one page, unless you have extensive experience or an advanced degree" [S63].
- Nefesh B'Nefesh (Israel): "aiming for a one-page length" [S44].
- AllJobs: "רוב המעסיקים לא קוראים את העמוד השני" ("most employers do not read page two")
  [S42].
- Drushim says one to two pages [S64].
- 17% of hiring managers named a résumé longer than two pages a deal breaker [S62].
- Counter-evidence: ResumeGo's simulation with 482 hiring staff preferred two pages 2.3x
  (entry level 1.4x). But its two-page versions had 700-850 words against 350-500, so length
  and content are confounded. ResumeGo sells résumé writing [S61].
- No rigorous study compares one page to two.

**Sources.**
- [S63] practitioner · university career guide: MIT CAPD, "Resumes", n.d. https://capd.mit.edu/resources/resumes/
- [S44] practitioner · NGO guide: Nefesh B'Nefesh, "Adjusting Your Resume for the Israeli Market", n.d. https://www.nbn.org.il/aliyahpedia/employment-israel/managing-the-job-search/adjusting-resume-israeli-market/
- [S42] popular · job-board guide: AllJobs, "קורות חיים לדוגמה – טיפים ופורמט לכתיבה" (Sample CV: tips and format), n.d. https://www.alljobs.co.il/Campaigns/CVCenter/CVCenterGuide.htm
- [S64] popular · job-board guide: Drushim, "מדריך: איך לכתוב קורות חיים?" (Guide: how to write a CV), n.d. https://www.drushim.co.il/article/13/
- [S62] popular · recruiter survey: CareerBuilder 2018 (as above).
- [S61] popular · vendor study: ResumeGo, "Settling the Debate: One or Two Page Resumes", 2018. https://www.resumego.net/research/one-or-two-page-resumes/

### D2 `cut-dont-shrink`: Cut content to fit; don't shrink the font or margins
**Weight 2 · Strength: Convention**

**Tip.** When the CV runs over one page, drop the weakest bullets and old roles first. Keep
the body text at 10 pt or more and margins at 0.5 in (about 1.3 cm) or more.

**Why.**
- MIT: "Don't shrink the font to fit more content"; a font "no smaller than 10pt"; margins
  "at least 0.5 inches, ideally 0.75 inches" [S37, S63].
- Harvard: "balancing white space" [S70].
- In TheLadders' 2018 coverage, "a lack of white space" did poorly [S56].

**Sources.** [S37], [S63], [S70], [S56] (as above).

### D3 `built-for-a-skim`: Write for a first read of under a minute
**Weight 3 · Strength: Moderate**

**Tip.** Assume the first pass is seconds to a minute long. The page must show who the
person is, their last role and their fit before any detailed reading.

**Why.**
- CareerBuilder (1,138 managers): 39% spend under a minute on a résumé; 23% spend under 30
  seconds [S62].
- Stanford: "Employers will spend less than 30 seconds reviewing your resume" [S77].
- Martin-Lacroux & Lacroux cite older studies: "an average of 10 to 30 seconds and a maximum
  of 3 minutes" [S60].
- TheLadders gives 6 s (2012) and 7.4 s (2018). Treat those numbers as weak, see Myths
  [S54, S55].

**How to apply.**
- Test: cover everything but the top third and the first line of each role. Can a stranger
  say what the person does and why they fit?

**Sources.** [S62], [S77] (as above).
- [S60] study · research paper (vignette experiment): Martin-Lacroux & Lacroux, "Do Employers Forgive Applicants' Bad Spelling in Résumés?", *Business and Professional Communication Quarterly* 80(3), 2017. https://appendance.com/s/Bad-Spelling-in-Resumes.pdf

### D4 `front-load-words`: Put the information-carrying word first in each line
**Weight 2 · Strength: Weak**

**Tip.** Start headings, role lines and bullets with the word that carries meaning: the
verb, the result or the technology. Not with filler like "As part of my role…".

**Why.**
- Nielsen Norman Group's eye-tracking of 232 users on web pages found an F-shaped scan and
  advised: "Start subheads, paragraphs, and bullet points with information-carrying words"
  [S57].
- NN/g later said the F appears when text has little formatting and readers want to skim.
  It is "bad for users", and it appears mirrored in right-to-left languages [S58]. So in a
  Hebrew CV the start of each line is on the right.
- This is web-reading research. It has not been tested on CVs.

**Sources.**
- [S57] study · eye-tracking study: Jakob Nielsen, "F-Shaped Pattern For Reading Web Content", Nielsen Norman Group, 2006. https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/
- [S58] study · industry research article: Nielsen Norman Group, "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant", n.d. https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/

---

## E. Formatting and personal details

### E1 `plain-consistent-layout`: A plain, consistent layout with clear section headers
**Weight 2 · Strength: Convention**

**Tip.** Keep one visual system: the same heading style, the same date format and position,
the same bullet style and the same spacing throughout. Use bold for titles only.

**Why.**
- Harvard: "Be consistent in format and content"; "Use consistent spacing, underlining,
  italics, bold, and capitalization" [S70].
- Israeli Ministry of Defense guide: "שימוש בפונט אחיד, יישור לימין, מרווחים זהים בין
  השורות" ("one font, right alignment, even line spacing") [S40].
- TheLadders 2018 coverage: "simple layouts, with clear sections and heading titles" did
  well [S56].
- Burns et al. (2014) found recruiters read conscientiousness into CV content, and that
  reading was "strongly linked to hireability" [S92]. Sloppy formatting is one plausible
  channel. The study does not test formatting specifically.

**Sources.** [S70], [S40], [S56] (as above).
- [S92] study · research paper: Burns, Christiansen, Morris, Periard & Coaster, "Effects of Applicant Personality on Resume Evaluations", *J. Business and Psychology*, 2014. https://link.springer.com/article/10.1007/s10869-014-9349-6

### E2 `conventional-font`: A conventional font, 10-12 pt body
**Weight 1 · Strength: Weak**

**Tip.** Use one or two conventional fonts, with body text at 10-12 pt. No script or novelty
fonts.

**Why.**
- MIT: "a conservative font no smaller than 10pt" [S37].
- Shaikh, Chaparro & Fox surveyed 561 participants on fonts (not CVs). Serif fonts were rated
  "Stable, Practical, Mature, and Formal" and were chosen for "Business Documents (71%)".
  Script and novelty fonts were chosen for formal uses 2-3% of the time [S69].
- No study links a CV font to hiring outcomes.

**Sources.** [S37] (as above).
- [S69] study · survey research: Shaikh, Chaparro & Fox, "Perception of Fonts: Perceived Personality Traits and Uses", *Usability News* 8(1), Wichita State University, 2006. https://soma.sbcc.edu/users/russotti/113/personality_Shaikh.pdf

### E3 `contact-block`: Contact block: name, phone, email, city, LinkedIn
**Weight 2 · Strength: Convention**

**Tip.** Give full name, mobile, a professional email, city (not street address), a LinkedIn
URL and a portfolio or GitHub link if relevant.

**Why.**
- 35% of hiring managers named an unprofessional email address a deal breaker [S62].
- Nefesh B'Nefesh advises leaving out address, marital status and children "to avoid
  potential discrimination" [S44].
- Drushim: "אין צורך לציין גיל או עיר מגורים" ("no need to state age or city of residence")
  [S64].
- Israeli law lists place of residence among protected grounds [S43]. City is optional. Omit
  it if the user prefers.

**Sources.** [S62], [S44], [S64] (as above).
- [S43] practitioner · legal guide: Kol Zchut blog, "לכל שאלה (לא חייבת להיות) תשובה: המדריך לאיסור אפליה בראיונות עבודה" (Not every question needs an answer: a guide to the ban on discrimination in job interviews), 2022. https://blog.kolzchut.org.il/?p=3444

### E4 `no-photo`: No photo on the CV
**Weight 3 · Strength: Strong**

**Tip.** Leave the photo off by default, for both Hebrew and English CVs. Offer it only if the
user insists or the employer asks.

**Why.**
- Ruffle & Shtudiner sent 5,312 CVs to 2,656 Israeli job openings. Callback rates:

  | Men | Callback | Women | Callback |
  |---|---|---|---|
  | Attractive photo | 19.7% | No photo | 16.6% |
  | No photo | 13.7% | Plain photo | 13.6% |
  | Plain photo | 9.2% | Attractive photo | 12.8% |

  A photo helped only attractive men. It hurt women whatever their looks. Overall, CVs with a
  picture got 1.4 points fewer callbacks (p=.07). The paper notes that "In Israel, the choice
  to include a photograph on one's job resume is left to the candidate" [S71].
- Danel (an Israeli staffing firm): there is no legal or professional requirement for a
  photo in Israel [S74].
- Nefesh B'Nefesh blog: "pictures on resumes are not appropriate – keep them for LinkedIn
  only" [S45].
- Harvard and MIT: no picture [S70, S63].

**Sources.**
- [S71] study · field experiment: Ruffle & Shtudiner, "Are Good-Looking People More Employable?", *Management Science* 61(8), 2015. https://ideas.repec.org/a/inm/ormnsc/v61y2015i8p1760-1776.html (full text: https://cdn2.psychologytoday.com/assets/good_looking_people.pdf)
- [S74] practitioner · staffing-firm guide: Danel HR, "תמונה בקורות חיים" (A photo in a CV), n.d. https://danel-jobs.co.il/info-center/%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%91%D7%A7%D7%95%D7%A8%D7%95%D7%AA-%D7%97%D7%99%D7%99%D7%9D/
- [S45] practitioner · NGO blog: Melissa Lousky Bienenfeld, "Writing Your Israeli Resume: The Do's and Don'ts", Nefesh B'Nefesh, n.d. https://www.nbn.org.il/aliyah-inspiration/nbn-blogger-network/nbn-employment-blog/writing-your-israeli-resume-the-dos-and-donts/
- [S70], [S63] (as above).

### E5 `no-protected-details`: Leave out age, marital status, children, ID number and reserve-duty load
**Weight 3 · Strength: Moderate**

**Tip.** By default, omit birth date or age, marital status, number of children, Israeli ID
number, religion and reserve-duty days. Keep military service as experience (H8), without
current reserve load.

**Why.**
- Israel's Equal Employment Opportunities Law protects, among others: sex, sexual
  orientation, personal status, age, pregnancy, fertility treatment, parenthood, religion,
  nationality, country of origin, views, party and reserve service [S73]. Kol Zchut adds
  place of residence. It lists "מהו גילך?" ("how old are you?"), "האם את/ה נשוי/אה?" ("are you
  married?"), "כמה ילדים יש לך?" ("how many children do you have?") and questions about reserve
  days as problem questions that can serve as evidence in a discrimination claim [S43].
- Neumark, Burn & Button (over 40,000 applications, US) found "robust evidence of age
  discrimination in hiring against older women", with less evidence for men [S72].
- Nefesh B'Nefesh, Harvard and MIT say to leave these details out [S44, S70, S63].
- AllJobs still calls marital status "not required but recommended", and ID number helpful
  [S42]. That is a job board's convention, and it runs against the discrimination evidence.
- Service dates and graduation years still reveal approximate age. That can't be avoided
  fully. Drop graduation years for degrees over about 20 years old if the user wants.

**Sources.** [S43], [S44], [S70], [S63], [S42] (as above).
- [S73] practitioner · government guide: Israel Ministry of Economy (Equal Employment Opportunities Commission), "מדריך למעסיקים ולמעסיקות – שוויון הזדמנויות בעבודה" (Guide for employers: equal opportunities at work), 2008. https://www.gov.il/BlobFolder/reports/a-guide-for-employers-equal-opportunities-at-work/he/work-equlity-guide-2008.pdf
- [S72] study · field experiment: Neumark, Burn & Button, "Is It Harder for Older Workers to Find Jobs? New and Improved Evidence from a Field Experiment", *J. Political Economy* 127(2), 2019. https://ideas.repec.org/a/ucp/jpolec/doi10.1086-701029.html

### E6 `consistent-dates`: One date format, right-aligned consistently
**Weight 1 · Strength: Convention**

**Tip.** Use one date format throughout ("03/2021 – 06/2024" or "2021–2024") and put dates in
the same position on every role. In Hebrew, check that ranges render in the right order.

**Why.**
- TheLadders 2012: start and end dates of the current and previous roles were among the six
  items that took about 80% of review time [S54].
- Harvard asks for consistency [S70]. Tel Aviv University asks for "accurate dates" in clear
  chronological order [S41].
- Bidi rendering can reorder a number range next to Hebrew text. See H11 [S53].

**Sources.** [S54], [S70], [S41], [S53].

---

## F. Typos and language errors

### F1 `zero-errors`: Zero spelling and grammar errors
**Weight 3 · Strength: Strong**

**Tip.** Run a spelling and grammar pass in the CV's language before every export. Each extra
error lowers the odds of an interview.

**Why.**
- Sterkens et al. (2023; 445 recruiters, 1,335 CVs, Belgium): five errors gave an "18.5
  percent points lower interview probability", two errors 7.3 points lower. About half the
  penalty came from recruiters seeing lower interpersonal skills, conscientiousness and
  mental ability [S66].
- Martin-Lacroux & Lacroux (2017; 536 recruiters, France): spelling errors "have the same
  detrimental impact on the chances of being shortlisted as a lack of professional
  experience". Rejection for strong-experience candidates rose from 18% with no errors to
  36.1% with 5 and 38.8% with 10 [S60].
- Surveys agree on the direction. 77% of hiring managers named typos or bad grammar a deal
  breaker [S62]. In a 2014 Accountemps survey, 17% would reject for one typo and 46% for two
  [S67]. The experiments suggest surveys overstate how often a single typo leads to
  rejection [S60].
- Harvard lists spelling and grammar errors as its top mistake [S70].

**How to apply.**
- Check names of tools, companies and schools against their official spelling ("JavaScript",
  "PostgreSQL", "Technion").
- In Hebrew, check spelling, verb gender agreement and consistent tense.

**Sources.** [S60], [S62], [S70] (as above).
- [S66] study · vignette experiment: Sterkens, Caers, De Couck, Van Driessche, Geamanu & Baert, "Costly mistakes: Why and when spelling errors in resumes jeopardise interview chances", *PLOS ONE*, 2023. https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0283280
- [S67] popular · recruiter survey: Accountemps (Robert Half), "Survey: One or Two Resume Mistakes Enough for Majority of Managers to Pass on a Job Candidate", PR Newswire, 2014. https://www.prnewswire.com/news-releases/survey-one-or-two-resume-mistakes-enough-for-majority-of-managers-to-pass-on-a-job-candidate-still-managers-more-lenient-than-they-were-five-years-ago-259363771.html

### F2 `polish-raises-hires`: Clean, fluent writing raises hiring odds
**Weight 3 · Strength: Strong**

**Tip.** Beyond fixing errors, make the phrasing fluent and plain. This matters most when the
user writes in a second language (an English CV from a Hebrew speaker, or a Hebrew CV from
an oleh, a new immigrant).

**Why.**
- Wiles, Munyikwa & Horton ran a field experiment with about 500,000 jobseekers on an online
  labour market. The group given algorithmic writing help (spelling, grammar, style) was
  hired "8% more often", with "no evidence that employers were less satisfied" [S24].
- Sterkens found the error penalty works partly through perceived mental ability [S66].

**Sources.** [S24], [S66] (as above).

### F3 `experienced-not-exempt`: Errors hurt strong candidates too
**Weight 2 · Strength: Strong**

**Tip.** Don't relax the proofreading for senior candidates. The penalty is not limited to
weak CVs.

**Why.**
- In Martin-Lacroux & Lacroux, errors doubled the rejection rate for strong-experience
  candidates (18% to 36.1% at 5 errors). Rejection for limited-experience candidates rose
  from 37.2% to 49.4% [S60].
- Sterkens: the white-collar subsample showed a 12.2-point penalty [S66].

**Sources.** [S60], [S66] (as above).

---

## G. Skills and soft-skill claims

### G1 `show-dont-claim-soft-skills`: Show soft skills in bullets; don't list adjectives
**Weight 3 · Strength: Moderate**

**Tip.** Drop self-descriptions like "team player", "results-driven" or "motivated". Show the
trait in an achievement instead.

**Why.**
- CareerBuilder (2,201 hiring managers) rated terms they disliked: "Best of breed" 38%,
  "Go-getter" 27%, "Think outside the box" 26%, "Synergy" 22%, "Results-driven" 16%. "Team
  player", "dynamic" and "detail-oriented" are also on the list [S81].
- LinkedIn's 2010 most-overused list includes "motivated", "results-oriented", "dynamic",
  "team player" and "problem solver". LinkedIn advised replacing them "with actionable
  information" [S89].
- Risavy: exaggerating personal traits is "likely to be less effective than self-descriptive
  statements (e.g., examples and descriptions of favorable education- and job-related
  accomplishments)" [S79].
- MIT shows skills through PAR bullets, e.g. "Organized review sessions for 15 participants"
  [S93].
- Employers do want the traits. NACE (n=237): problem-solving nearly 90%, teamwork nearly
  80% [S39]. They are looking for evidence of them, not the words.

**How to apply.**
- Before: "Excellent communication skills." After: "Presented quarterly results to the
  executive team; wrote the customer-facing migration guide (2,000 readers)."

**Sources.** [S81], [S79] (as above).
- [S89] popular · industry article: Leena Rao, "LinkedIn 2010 Overused Buzzwords…", TechCrunch, 2010. https://techcrunch.com/?p=254285
- [S93] practitioner · university career guide: MIT CAPD, "Resumes: Writing about your skills", n.d. https://capd.mit.edu/resources/resumes-writing-about-your-skills/
- [S39] practitioner · recruiter survey: NACE, "What Are Employers Looking for When Reviewing College Students' Resumes?" (Job Outlook 2025), 2024. https://www.naceweb.org/talent-acquisition/candidate-selection/what-are-employers-looking-for-when-reviewing-college-students-resumes

### G2 `measured-self-promotion`: Measured claims beat superlatives
**Weight 2 · Strength: Moderate**

**Tip.** Remove "world-class", "exceptional", "expert in everything". A specific,
modest-sounding fact persuades more than a superlative.

**Why.**
- Waung et al. (2017) content-analysed 60 CVs and cover letters, then ran an experiment:
  "lower intensity self-promotion" increased perceived job and organisation fit.
  High-intensity claims did worse [S90].
- Knouse, Giacalone & Pollard (1988, via Risavy) found impression management lowered
  perceived likability, truthfulness and employability. Knouse (1994) found the opposite, so
  the older evidence is mixed [S79, S83].

**Sources.** [S79], [S83] (as above).
- [S90] study · research paper: Waung, McAuslan, DiMambro & Mięgoć, "Impression Management Use in Resumes and Cover Letters", *J. Business and Psychology* 32(6), 2017. https://link.springer.com/article/10.1007/s10869-016-9470-9

### G3 `recruiters-infer-traits`: Every line is read as a personality signal, often wrongly
**Weight 2 · Strength: Moderate**

**Tip.** Check what each line implies about the person, not only what it states. Remove items
that signal something unintended, such as long hobby lists or gimmicks.

**Why.**
- Cole, Feild, Giles & Harris (2009; 244 recruiters): recruiters' personality inferences from
  CVs had "low levels of estimated interrater reliability" and "lacked validity", except
  perhaps extraversion and openness. Yet they "predicted the recruiters' subsequent
  employability assessments" [S91].
- Burns et al. (2014): "strong links between resume content and perceptions of
  conscientiousness and agreeableness", and those perceptions were "strongly linked to
  hireability" [S92].

**Sources.** [S92] (as above).
- [S91] study · research paper: Cole, Feild, Giles & Harris, "Recruiters' Inferences of Applicant Personality Based on Resume Screening: Do Paper People have a Personality?", *J. Business and Psychology*, 2009. https://link.springer.com/article/10.1007/s10869-008-9086-9

### G4 `concrete-skills-line`: A short skills line of concrete, checkable skills
**Weight 2 · Strength: Convention**

**Tip.** Use a skills section for hard skills only: tools, languages, frameworks,
certifications and spoken languages with level. Group them, use the job description's
wording, and skip rating bars.

**Why.**
- 76.4% of recruiters in Jobscan's survey filter by skills (commercial source) [S5].
- Exact-match search (B1) means the listed term must be the one searched [S1].
- Graphics such as skill bars break parsing [S9].
- No study tests whether a skills section itself affects outcomes.

**How to apply.**
- "Languages: Hebrew (native), English (full professional), Arabic (conversational)".
- "Backend: Python, Django, PostgreSQL, Redis · Cloud: AWS (ECS, RDS), Terraform".

**Sources.** [S5], [S1], [S9] (as above).

---

## H. Gaps, career changers, juniors, Israel, Hebrew vs English

### H1 `long-current-gap-costs`: A long current gap costs callbacks; fill it with activity
**Weight 3 · Strength: Strong**

**Tip.** A short gap needs no comment. For a current gap over about six months, add what the
user did in it (courses, freelance work, volunteering, a project) as a real entry.

**Why.**
- Kroft, Lange & Notowidigdo (about 12,000 fictitious CVs, US): "At eight months of
  unemployment, callbacks are about 45 percent lower than at one month", falling from about
  7% to 4%. After eight months the extra effect is negligible [S27].
- Eriksson & Rooth (Sweden): employers penalise "contemporary unemployment spells lasting at
  least nine months". Past unemployment followed by work had no effect [S28].
- Hidden Workers: employers report filtering or ranking middle-skills candidates on gaps
  over six months. The report's text says 48%, but its figure seems to show 32% filter and
  48% rank [S23].

**Sources.** [S28], [S23] (as above).
- [S27] study · field experiment: Kroft, Lange & Notowidigdo, "Duration Dependence and Labor Market Conditions: Evidence from a Field Experiment", *Quarterly J. Economics* 128(3), 2013. https://www.nber.org/papers/w18387 (full text: https://users.nber.org/~notom/research/Kroft_Lange_Noto_Resume_Study.pdf)

### H2 `explain-the-gap`: Give a brief, credible reason for a gap
**Weight 3 · Strength: Moderate**

**Tip.** Name the reason in one line, such as "Career break: parental leave", "Relocation to
Israel (aliyah)", "Health recovery, fully resolved" or "Reserve duty". Add what was done
during it, if anything.

**Why.**
- Namingit, Blankenau & Schwab sent 3,771 applications to 1,257 ads. Callback rates:
  newly unemployed 27.4%, gap explained by illness 25.6%, unexplained gap 23.3%. "A credible
  explanation of an employment gap can substantially reduce its scarring effect" [S30].
- Kroft et al. found that "roughly 95 percent of resumes do not provide any discernable
  explanation for the gap" [S27].
- LinkedIn (vendor survey, no published method): 51% of hirers are more likely to contact a
  candidate who gives context for a career break [S33]. Its survey covered nearly 23,000
  workers and more than 7,000 hiring managers [S34].
- One experiment plus a vendor survey: the direction is clear, the size less so.

**Sources.** [S27] (as above).
- [S30] study · field experiment: Namingit, Blankenau & Schwab, "Sick and Tell: A Field Experiment Analyzing the Effects of an Illness-Related Employment Gap on the Callback Rate", working paper 2020 (*J. Economic Behavior & Organization* 185, 2021). https://benjaminbschwab.com/wp-content/uploads/2020/09/sick_and_tellwp.pdf
- [S33] popular · industry survey: LinkedIn News, "A new way to represent career breaks on LinkedIn", 2022. https://news.linkedin.com/2022/march/new-way-to-represent-career-breaks-on-linkedin
- [S34] popular · industry article: LinkedIn Talent Blog, "LinkedIn Members Can Now Spotlight Career Breaks on Their Profiles", 2022. https://www.linkedin.com/business/talent/blog/product-tips/linkedin-members-spotlight-career-breaks-on-profiles

### H3 `caregiving-break`: Present caregiving breaks with what was kept current
**Weight 2 · Strength: Moderate**

**Tip.** For a parenting or caregiving break, label it neutrally and pair it with any
professional activity (courses, freelance, volunteering). Don't hide it behind vague dates.

**Why.**
- Weisshaar (2018; 3,374 job listings, US): callbacks for employed mothers 15.3% and fathers
  14.6%; unemployed 9.7% and 8.8%; stay-at-home parents 4.9% and 5.4% [S29]. A caregiving gap
  was penalised more than job loss.
- LinkedIn: 50% of hiring managers believe people returning from a break gained soft skills,
  and 46% think they undersell them [S33].
- Israeli law protects parenthood and personal status [S73]. The CV should state the break,
  not family details.

**Sources.** [S33], [S73] (as above).
- [S29] study · audit study (author summary): Kristen Weisshaar, "Stay-at-home parents face a big job market penalty when they try to re-enter the workforce", LSE US Politics and Policy blog, 2018 (paper: *American Sociological Review* 2018). https://blogs.lse.ac.uk/usappblog/2018/05/15/stay-at-home-parents-face-a-big-job-market-penalty-when-they-try-to-re-enter-the-workforce/

### H4 `years-instead-of-dates`: Consider listing years per role when gaps are the main problem
**Weight 1 · Strength: Moderate**

**Tip.** For users with several gaps, one option is to list each role with its duration ("3
years") instead of month-year dates. Present it as an option. It departs from the usual
format and some application forms still ask for dates.

**Why.**
- Kristal, Nicks, Gloor & Hauser (preregistered field experiment, UK, n = 9,022; *Nature
  Human Behaviour* 2023): listing jobs "with the number of years worked (instead of
  employment dates) increases callbacks … compared to résumés without employment gaps by
  approximately 8%, and with employment gaps by 15%" [S31, S32].
- It is a single study in one country. Israeli recruiters used to dates may read it as
  hiding something. There is no evidence either way on that.

**Sources.**
- [S31] study · field experiment: Kristal, Nicks, Gloor & Hauser, "Reducing discrimination against job seekers with and without employment gaps", *Nature Human Behaviour* 7, 2023. https://www.alexandria.unisg.ch/bitstreams/c91ad142-6aa4-455d-9166-dc7fc2e32da6/download
- [S32] practitioner · research blog: Leonie Nicks, "Behind the paper: reducing discrimination against job seekers with employment gaps", Behavioural Insights Team, 2023. https://www.bi.team/blogs/behind-the-paper-reducing-discrimination-against-job-seekers-with-employment-gaps/

### H5 `career-changer-combination`: Career changers: a bridging summary, transferable skills, then history
**Weight 3 · Strength: Convention**

**Tip.** For a change of field, open with a summary that names the target role and the
bridge. Follow it with a short "relevant skills" or "relevant projects" block using the job
description's terms, then the chronological history.

**Why.**
- Northwestern-St. Paul: chronological order alone is "generally not recommended because it
  highlights experiences not transferable skills". A combination CV can "highlight
  transferable skills while still featuring work experience". Keywords are "the biggest
  hurdle for career changers" [S35].
- NJIT: the combination CV overcomes the limits of functional and chronological formats
  [S36].
- MIT: "highlight skills that will transfer over" [S37]. Duke: use a summary for "a career
  shift" [S86].
- A pure functional CV is distrusted (C4). Keep employers and dates.

**Sources.** [S37], [S86] (as above).
- [S35] practitioner · university career guide: University of Northwestern-St. Paul, "Career Changers: Guide to Resume Writing", n.d. https://www.unwsp.edu/wp-content/uploads/Career-Development/Helpful-Handouts/CD-CareerChanger_Resume-DP-OL.pdf
- [S36] practitioner · university career guide: NJIT Career Development Services, "The Combination Resume", n.d. https://www.njit.edu/careerservices/combination-resume

### H6 `junior-education-projects`: Juniors: education first, then projects and internships
**Weight 3 · Strength: Moderate**

**Tip.** For students and new graduates, put education right after the contact block. Then
internships, relevant work, and a projects section written in the same achievement form as
jobs.

**Why.**
- NACE Job Outlook 2024, influence as a tie-breaker (1-5 scale): internship with the
  organisation 4.4, internship in the industry 4.3, major 3.9, general work experience 3.7,
  leadership 3.4, extracurriculars 3.2, GPA 3.0+ 3.0, volunteer work 2.5, school attended
  2.5. "Having an internship is the top deciding factor" [S38].
- MIT puts education first for students and asks for "robust projects for classes or
  relevant personal projects" [S37].
- ynet (Israel): for students, education near the top with projects and grades [S47].
- Cole et al. (2007): academics, experience and extracurriculars together predicted
  recruiter-rated employability of recent graduates [S84].

**Sources.** [S37], [S84] (as above).
- [S38] practitioner · recruiter survey: NACE, "Job Outlook 2024", 2023. https://www.naceweb.org/docs/default-source/default-document-library/2023/publication/research-report/2024-nace-job-outlook.pdf
- [S47] popular · industry article: Hiya Bornstein, "קצר ומסודר: כך כותבים קורות חיים" (Short and organised: how to write a CV), ynet, 2014. https://www.ynet.co.il/articles/0,7340,L-4512056,00.html

### H7 `gpa-if-strong`: Grades only if strong, with the scale
**Weight 1 · Strength: Moderate**

**Tip.** Include the degree average only if it is strong, and write the scale ("GPA 3.7/4.0",
"ממוצע 92"). Drop it a few years after graduation.

**Why.**
- NACE: fewer than 40% of US employers screen by GPA, down from a high of 73.3% to 38.3% for
  the 2024 recruiting year [S38].
- MIT: if you include it, "mention the scale it's based on" [S37].
- This is US data. No Israeli equivalent was found.

**Sources.** [S38], [S37] (as above).

### H8 `idf-in-civilian-terms`: Describe military service in civilian terms, with detail only when relevant
**Weight 3 · Strength: Convention**

**Tip.** List IDF or national service with dates and the role translated into civilian
language (team lead, operations coordinator, instructor, analyst). Use full achievement
bullets only when the role is relevant to the target, e.g. tech or intelligence units for
tech roles. Otherwise one or two lines.

**Why.**
- The Ministry of Defense guide lists military service as its own section. It shows how to
  turn a role into skills: "תרגלתי עמידה במצבי לחץ, קבלת החלטות במצבי חוסר ודאות" ("practised
  working under pressure and making decisions under uncertainty") [S40].
- Dialog (hi-tech placement): for tech units such as 8200, state the role in civilian terms,
  then unit, duties, people managed and relevant courses. For other units, dates and main
  roles only [S46].
- ynet: "השירות הצבאי הוא חשוב בעיקר כששירתם ביחידה טכנולוגית" ("military service matters
  mainly if you served in a tech unit") [S47].
- AllJobs: "ציינו את השנים והתפקיד בקצרה" ("state the years and the role briefly") [S42].
- Texas State (US military guide): "Focus more on communicating the functional area of your
  job title", e.g. Squad Leader becomes Team Leader [S49].
- Classified details stay out. The Tafkid Plus ruling holds that requiring military service
  in a job ad is indirect discrimination [S73]. The CV can include service; the employer
  cannot require it.

**How to apply.**
- Before: "מש"ק ת"ש, 2019-2021". After: "Welfare NCO (HR and welfare coordinator), 2019-2021.
  Handled personal and financial cases for 120 soldiers; ran the unit's aid budget."

**Sources.** [S40], [S47], [S42], [S73] (as above).
- [S46] popular · recruiter article: Dialog, "איך לכתוב על שירות צבאי בקו"ח" (How to write about military service on a CV), 2014. https://www.dialog.co.il/new-world/work-search/blogs/work-guide-part-4
- [S49] practitioner · university career guide: Texas State University Career Services, "Military Resume Guide", n.d. https://www.careerservices.txst.edu/students-alumni/resources-services/career-guides/military-resume-guide.html
- [S48] popular · job-board guide: Jobnet, "טיפים ודוגמה לקורות חיים לחייל משוחרר" (Tips and a sample CV for a discharged soldier), n.d. https://www.jobnet.co.il/טיפים_לכתיבת_קורות_חיים_לחייל_משוחרר

### H9 `unpaid-counts`: Volunteering, national service and projects count as experience
**Weight 2 · Strength: Convention**

**Tip.** For juniors and returners, list volunteering, national service (שירות לאומי), student
committees and serious personal projects as experience entries with achievement bullets.

**Why.**
- The Ministry of Defense guide has a section for "informal experience" (national service,
  volunteering) next to work experience [S40].
- NACE gives leadership 3.4, extracurriculars 3.2 and volunteer work 2.5 on its 1-5
  tie-breaker scale. They help, but less than internships [S38].
- kohi's interview tip `unpaid-work-counts` makes the same point for spoken answers.

**Sources.** [S40], [S38] (as above).

### H10 `language-matches-posting`: Write the CV in the language of the posting
**Weight 3 · Strength: Weak**

**Tip.** English when the posting is in English, the company is a multinational or most
tech, or the recruiter asks for it. Hebrew for Hebrew postings at Israeli employers. When in
doubt, prepare both.

**Why.**
- Nefesh B'Nefesh: "if you are sending your resume to an Israeli employer, it's better to
  send a Hebrew language resume" [S44].
- AllJobs: English CVs only "כאשר מבקשים זאת מאיתנו במפורש" ("when explicitly requested")
  [S42].
- Drushim: local tech companies and multinationals "מפרסמות מודעות דרושים באנגלית ומחייבות
  מענה דומה" ("post ads in English and require a matching reply") [S50].
- HRLens (commercial): "Use English when the role is posted in English, the company works
  with global teams, or the recruiter asks for English" [S52].
- For olim (new immigrants), Nefesh B'Nefesh also advises one page, no address, marital
  status or children, and a 3-5 sentence cover note in the email body [S44].
- No survey data backs this. One CV-builder blog claims Comeet parses Hebrew well and
  Greenhouse does not, without tests [S51]. No ATS vendor document opened here confirms
  Hebrew parsing. Treat Hebrew ATS support as unknown.

**Sources.** [S44], [S42] (as above).
- [S50] popular · job-board guide: Drushim, "איך לכתוב קורות חיים באנגלית?" (How to write a CV in English?), 2022. https://www.drushim.co.il/article/118/
- [S52] popular · industry article: HRLens, "Hebrew CV in English for Israel Jobs", 2026. https://www.hrlens.io/for/hebrew-cv-in-english-israel-jobs
- [S51] popular · industry article: Pavel Stegnii, "How Comeet, Greenhouse, and Workable Actually Filter Your CV", korotchaim.com, 2026. https://korotchaim.com/en/blog/how-israeli-ats-filters-actually-work

### H11 `bidi-safe-hebrew`: In Hebrew CVs, keep mixed English and numbers from reordering
**Weight 2 · Strength: Weak**

**Tip.** In a Hebrew CV, check every line that mixes Hebrew with English terms, numbers,
ranges, percentages or URLs. Wrap English and number runs as direction-isolated spans so
they display in the right order. Check the exported PDF text as well as the screen.

**Why.**
- W3C: a phrase in the opposite direction followed by a number can be reordered wrongly on
  display. The fixes are `dir` / `<bdi>` or Unicode isolates (LRI U+2066, RLI U+2067, PDI
  U+2069) [S53].
- NN/g: scanning patterns appear mirrored in right-to-left languages [S58]. So the start of
  a Hebrew line, on the right, is where the key word goes (D4).
- No source was found on how ATS parse Hebrew or bidi text, or on date order in Hebrew CVs.
  This tip rests on the rendering standard only.

**How to apply.**
- Watch for: "2019–2021" flipping, "React.js" or "C#" losing its punctuation position,
  "40%" moving to the wrong side, and email addresses inside Hebrew lines.

**Sources.** [S58] (as above).
- [S53] practitioner · standards guide: W3C Internationalization, "Inline markup and bidirectional text in HTML", n.d. https://www.w3.org/International/articles/inline-bidi-markup/

---

## Myths and weak claims

As in kohi's `UNVERIFIED.md`: these are not all false, but none has a study behind its
number. Attribute them if used, and never repeat the number as fact.

| Claim | Where it comes from | What is actually known |
|---|---|---|
| **"75% of CVs are rejected by ATS before a human sees them"** | Preptel, a company selling an ATS-beating tool, quoted in Computerworld in 2012 [S16]. Preptel closed in 2013 [S17]. | No method was ever published [S20]. An HR consultant traced it through CNBC, TopResume and Forbes back to Preptel and found no peer-reviewed support [S17]. ATS vendors document auto-reject only on knockout questions [S21, S22]. In Enhancv's interviews (commercial), 23 of 25 recruiters said their ATS does not auto-reject on formatting or content; all 25 use eligibility knockout questions [S19]. Also [S15, S18, S26]. Real concern: recruiter-set filters exclude qualified people (Hidden Workers, 88% of employers believe so) [S23]. |
| **"Recruiters look at a CV for 6 seconds" (or 7.4)** | TheLadders 2012 (30 recruiters) and 2018 (no sample size) [S54, S55]. | Vendor studies with no published method. The 2012 paper ends by recommending TheLadders' own style [S54]. Surveys give 39% under a minute and 23% under 30 seconds [S62]. Say "seconds to a minute" and drop the precise number. |
| **"Recruiters read CVs in an F-pattern"** | NN/g web eye-tracking [S57]. | Web pages with little formatting, not CVs. NN/g itself says the F is not universal [S58]. The one peer-reviewed CV eye-tracking study found did not test it [S59]. |
| **"76% (or 43%) of managers reject a CV for one or two typos"** | Accountemps surveys; "43%" attributed to Adecco second-hand [S68]. | Accountemps' own 2014 figure for one typo was 17% [S67]. Experiments show real but smaller effects than stated intentions. Martin-Lacroux & Lacroux attribute the gap to the "declarative nature of the survey" [S60]. Use the experimental numbers (F1). |
| **"Two-page CVs get 2.3x more interest"** | ResumeGo simulation, 2018 [S61]. | The two-page versions carried more content (700-850 against 350-500 words). The vendor sells résumé writing. No peer review. |
| **"Never send a PDF; ATS can't read it"** | Computerworld 2012 [S16]; UIC 2017 [S8]. | Out of date. Greenhouse's failure list is about images, tables, columns and headers, not PDF as such [S9]. Taleo lists PDF as supported [S10]. Recruiters on major ATS say both parse well enough [S15]. |
| **"Two-column CVs are always rejected" / "columns are a solved problem"** | Résumé-builder blogs, both directions [S14]. | Both overclaim. Greenhouse lists columns as a parse failure cause [S9]. Textkernel raised column accuracy from 60% to 82%, not 100% [S11]. |
| **"63% / 83% / 55% of recruiters want tailored CVs"** | Stats-roundup blogs, some credited to Jobvite. | No primary source could be traced. The only verified figure: 18% of hiring managers treat a generic CV as a deal breaker [S62]. |
| **"Stuff keywords to beat the ATS"** | Common advice. | Greenhouse: "This isn't the case with Greenhouse", and its AI "doesn't score or rank applications" [S4]. Search is exact-match (B1), so one honest use in context is enough. |
| **"Israeli CVs need a photo"** | Some commercial CV sites. | Contradicted by the only Israeli field experiment: a photo lowered callbacks for women and plain-looking men [S71]. Also [S74]. |
| **"Comeet parses Hebrew well; Greenhouse doesn't"** | One CV-builder blog, no tests [S51]. | Unverified. No vendor documentation opened confirms Hebrew parsing either way. |
| **"Gaps get 45% fewer callbacks (HBS)", "2024 Indeed/Harvard study on explaining gaps"** | Search snippets and blogs. | Could not be opened or found. The verified gap numbers are in H1-H4. |
| **"X-Y-Z (or STAR) is proven to work"** | Widely repeated. | A practitioner formula from Google's former SVP of People Operations [S75]. The evidence is that accomplishment statements and results help (A1). No study shows one bullet formula beats another. |

---

## Consolidated sources

Deduplicated. Type · tier · author or publisher · title · year · URL. "n.d." means the page shows
no date.

**Research papers, experiments and research reports (tier: study)**

- S23 · research report · Fuller, Raman (HBS), Sage-Gavin, Hines (Accenture) · Hidden Workers: Untapped Talent · 2021 · https://www.hbs.edu/ris/Publication%20Files/hiddenworkers09032021_Fuller_white_paper_33a2047f-41dd-47b1-9a8d-bd08cf3bfa94.pdf
- S24 · field experiment · Wiles, Munyikwa, Horton · Algorithmic Writing Assistance on Jobseekers' Resumes Increases Hires (NBER w30886) · 2023 · https://www.nber.org/papers/w30886
- S25 · audit study · Wilson & Caliskan · Gender, Race, and Intersectional Bias in Resume Screening via Language Model Retrieval (AIES) · 2024 · https://arxiv.org/abs/2407.20371
- S27 · field experiment · Kroft, Lange, Notowidigdo · Duration Dependence and Labor Market Conditions (QJE) · 2013 · https://www.nber.org/papers/w18387
- S28 · field experiment · Eriksson & Rooth · Do Employers Use Unemployment as a Sorting Criterion When Hiring? (AER) · 2014 · https://www.aeaweb.org/articles?id=10.1257/aer.104.3.1014
- S29 · audit study (author summary) · Weisshaar · Stay-at-home parents face a big job market penalty… (LSE blog; ASR 2018) · 2018 · https://blogs.lse.ac.uk/usappblog/2018/05/15/stay-at-home-parents-face-a-big-job-market-penalty-when-they-try-to-re-enter-the-workforce/
- S30 · field experiment · Namingit, Blankenau, Schwab · Sick and Tell (working paper; JEBO 2021) · 2020 · https://benjaminbschwab.com/wp-content/uploads/2020/09/sick_and_tellwp.pdf
- S31 · field experiment · Kristal, Nicks, Gloor, Hauser · Reducing discrimination against job seekers with and without employment gaps (Nature Human Behaviour) · 2023 · https://www.alexandria.unisg.ch/bitstreams/c91ad142-6aa4-455d-9166-dc7fc2e32da6/download
- S57 · eye-tracking study · Nielsen (NN/g) · F-Shaped Pattern For Reading Web Content · 2006 · https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/
- S58 · research article · NN/g · F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant · n.d. · https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- S59 · eye-tracking study · Osanami Törngren, Schütze, Van Belle, Nyström · "We choose this CV because we choose diversity" (Frontiers in Sociology) · 2024 · https://pmc.ncbi.nlm.nih.gov/articles/PMC10954785/
- S60 · vignette experiment · Martin-Lacroux & Lacroux · Do Employers Forgive Applicants' Bad Spelling in Résumés? (BPCQ) · 2017 · https://appendance.com/s/Bad-Spelling-in-Resumes.pdf
- S66 · vignette experiment · Sterkens et al. · Costly mistakes: Why and when spelling errors in resumes jeopardise interview chances (PLOS ONE) · 2023 · https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0283280
- S69 · survey research · Shaikh, Chaparro, Fox · Perception of Fonts: Perceived Personality Traits and Uses (Usability News) · 2006 · https://soma.sbcc.edu/users/russotti/113/personality_Shaikh.pdf
- S71 · field experiment · Ruffle & Shtudiner · Are Good-Looking People More Employable? (Management Science) · 2015 · https://ideas.repec.org/a/inm/ormnsc/v61y2015i8p1760-1776.html
- S72 · field experiment · Neumark, Burn, Button · Is It Harder for Older Workers to Find Jobs? (JPE) · 2019 · https://ideas.repec.org/a/ucp/jpolec/doi10.1086-701029.html
- S79 · literature review · Risavy · The Resume Research Literature: Where Have We Been and Where Should We Go Next? · 2017 · https://ccsenet.org/journal/index.php/jedp/article/download/66404/35947
- S80 · research paper · Thoms, McMasters, Roberts, Dombkowski · Resume Characteristics as Predictors of an Invitation to Interview · 1999 · https://link.springer.com/article/10.1023/A:1022974232557
- S82 · research paper · Tsai, Chi, Huang, Hsu · The Effects of Applicant Résumé Contents on Recruiters' Hiring Recommendations · 2011 · https://api.openalex.org/works/doi:10.1111/j.1464-0597.2010.00434.x
- S83 · research paper · Knouse · Impressions of the resume · 1994 · https://link.springer.com/article/10.1007/BF02230985
- S84 · research paper · Cole, Rubin, Feild, Giles · Recruiters' Perceptions and Use of Applicant Résumé Information · 2007 · https://api.openalex.org/works/doi:10.1111/j.1464-0597.2007.00288.x
- S85 · research paper · Wingate, Robie, Powell, Bourdage · The Signals That Matter · 2025 · https://api.openalex.org/works/doi:10.1111/ijsa.70022
- S90 · research paper · Waung, McAuslan, DiMambro, Mięgoć · Impression Management Use in Resumes and Cover Letters · 2017 · https://link.springer.com/article/10.1007/s10869-016-9470-9
- S91 · research paper · Cole, Feild, Giles, Harris · Recruiters' Inferences of Applicant Personality Based on Resume Screening · 2009 · https://link.springer.com/article/10.1007/s10869-008-9086-9
- S92 · research paper · Burns, Christiansen, Morris, Periard, Coaster · Effects of Applicant Personality on Resume Evaluations · 2014 · https://link.springer.com/article/10.1007/s10869-014-9349-6

**Recruiter surveys**

- S38 · recruiter survey · practitioner · NACE · Job Outlook 2024 · 2023 · https://www.naceweb.org/docs/default-source/default-document-library/2023/publication/research-report/2024-nace-job-outlook.pdf
- S39 · recruiter survey · practitioner · NACE · What Are Employers Looking for When Reviewing College Students' Resumes? · 2024 · https://www.naceweb.org/talent-acquisition/candidate-selection/what-are-employers-looking-for-when-reviewing-college-students-resumes
- S5 · recruiter survey · popular (commercial) · Jobscan · The State of the Job Search in 2025 · 2025 · https://www.jobscan.co/state-of-the-job-search
- S19 · recruiter interviews · popular (commercial) · Enhancv (Doroteya Vasileva) · Does the ATS Reject Your Resume? 25 Recruiters Explain · 2025 · https://enhancv.com/blog/does-ats-reject-resumes/
- S33 · industry survey · popular · LinkedIn News · A new way to represent career breaks on LinkedIn · 2022 · https://news.linkedin.com/2022/march/new-way-to-represent-career-breaks-on-linkedin
- S62 · recruiter survey · popular · CareerBuilder/Harris Poll · Employers Share Their Most Outrageous Resume Mistakes and Instant Deal Breakers · 2018 · https://www.prnewswire.com/news-releases/employers-share-their-most-outrageous-resume-mistakes-and-instant-deal-breakers-in-a-new-careerbuilder-study-300701888.html
- S67 · recruiter survey · popular · Accountemps (Robert Half) · One or Two Resume Mistakes Enough for Majority of Managers to Pass… · 2014 · https://www.prnewswire.com/news-releases/survey-one-or-two-resume-mistakes-enough-for-majority-of-managers-to-pass-on-a-job-candidate-still-managers-more-lenient-than-they-were-five-years-ago-259363771.html
- S81 · recruiter survey · popular · CareerBuilder/Harris Poll · Hiring Managers Rank Best and Worst Words to Use in a Resume · 2014 · https://www.webwire.com/ViewPressRel.asp?aId=186181

**Eye-tracking and vendor studies (commercial)**

- S54 · eye-tracking study · popular · TheLadders (Will Evans) · Keeping an eye on recruiter behavior · 2012 · https://www.bu.edu/com/files/2018/10/TheLadders-EyeTracking-StudyC2.pdf
- S55 · eye-tracking study (press release) · popular · TheLadders via PR Newswire · Ladders Updates Popular Recruiter Eye-Tracking Study… · 2018 · https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html
- S61 · vendor study · popular · ResumeGo · Settling the Debate: One or Two Page Resumes · 2018 · https://www.resumego.net/research/one-or-two-page-resumes/

**ATS vendor documentation**

- S1 · vendor docs · practitioner · Greenhouse · Talent Filtering · n.d. · https://support.greenhouse.io/hc/en-us/articles/27104809835291-Talent-Filtering
- S2 · vendor docs · practitioner · Greenhouse · Search candidates using Boolean queries · n.d. · https://support.greenhouse.io/hc/en-us/articles/202360199-Search-candidates-using-Boolean-queries
- S3 · vendor docs · practitioner · Greenhouse · Search resumes for keywords · n.d. · https://support.greenhouse.io/hc/en-us/articles/115004600186-Search-resumes-for-keywords
- S4 · vendor blog · practitioner · Greenhouse · What really happens after you apply for a job · 2025 · https://my.greenhouse.com/blogs/what-really-happens-after-you-apply-for-a-job
- S9 · vendor docs · practitioner · Greenhouse · Unsuccessful resume parse · n.d. · https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse
- S10 · vendor docs · practitioner · Oracle · Taleo Enterprise: Implementing Recruiting (attachments) · 22D · https://docs.oracle.com/en/cloud/saas/taleo-enterprise/22d/otrcg/c-attachment.html
- S11 · vendor engineering blog · practitioner · Textkernel · Improving extraction from column resumes · n.d. · https://www.textkernel.com/learn-support/blog/improving-extraction-from-column-resumes/
- S21 · vendor docs · practitioner · Greenhouse · Auto-reject · n.d. · https://support.greenhouse.io/hc/en-us/articles/360000653472-Auto-reject
- S22 · vendor docs · practitioner · Workday · Recruiting Subprocesses · n.d. · https://doc.workday.com/workday-education/en-us/course-manuals/recruiting-for-administrators/recruiting-subprocesses.html

**University career guides**

- S8 · practitioner · UIC Office of Career Services · Optimizing Resumes for Applicant Tracking Systems · 2017 · https://careerservices.uic.edu/wp-content/uploads/sites/26/2017/08/Ensure-Your-Resume-Is-Read-ATS.pdf
- S12 · practitioner · Santa Clara University Career Center · Job Scan Common ATS Resume Formatting Mistakes · n.d. · https://www.scu.edu/careercenter/toolkit/job-scan-common-ats-resume-formatting-mistakes/
- S35 · practitioner · University of Northwestern-St. Paul · Career Changers: Guide to Resume Writing · n.d. · https://www.unwsp.edu/wp-content/uploads/Career-Development/Helpful-Handouts/CD-CareerChanger_Resume-DP-OL.pdf
- S36 · practitioner · NJIT · The Combination Resume · n.d. · https://www.njit.edu/careerservices/combination-resume
- S37 · practitioner · MIT CAPD · Career toolkit: Crafting an effective resume · n.d. · https://capd.mit.edu/resources/career-toolkit-crafting-an-effective-resume/
- S41 · practitioner · Tel Aviv University Career Development Center · כתיבת קורות חיים (Writing a CV) · n.d. · https://career.tau.ac.il/writingcv
- S49 · practitioner · Texas State University · Military Resume Guide · n.d. · https://www.careerservices.txst.edu/students-alumni/resources-services/career-guides/military-resume-guide.html
- S63 · practitioner · MIT CAPD · Resumes · n.d. · https://capd.mit.edu/resources/resumes/
- S70 · practitioner · Harvard FAS Mignone Center · Create a Strong Resume · n.d. · https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/
- S77 · practitioner · Stanford Career Development Center · Resumes/Cover Letters · c. 2013 · https://careered.stanford.edu/sites/g/files/sbiybj22801/files/media/file/resume-and-cover-letter-examples.pdf
- S78 · practitioner · University of North Georgia · Accomplishment Statements · n.d. · https://ung.edu/career-services/online-career-resources/resumes-cover-letters/accomplishment-statements.php
- S86 · practitioner · Duke Career Hub · Summary Statements · n.d. · https://careerhub.students.duke.edu/summary-statements/
- S87 · practitioner · Eastern Washington University · Resume Myths · 2024 · https://cdn.ewu.edu/careercenter/wp-content/uploads/sites/36/2024/12/resume-guide_myths-19.pdf
- S88 · practitioner · University of Alabama · Special Resumes · n.d. · https://career.sa.ua.edu/develop/resumes/special_resumes/
- S93 · practitioner · MIT CAPD · Resumes: Writing about your skills · n.d. · https://capd.mit.edu/resources/resumes-writing-about-your-skills/

**Government, legal, NGO and standards guides**

- S40 · government guide · practitioner · Israel Ministry of Defense (Hachvana) · איך כותבים מסמך קורות חיים כשאין ניסיון מקצועי? · n.d. · https://www.hachvana.mod.gov.il/ConsultationAndDirection/Employment/Pages/cv-writing.aspx
- S73 · government guide · practitioner · Israel Ministry of Economy · מדריך למעסיקים ולמעסיקות – שוויון הזדמנויות בעבודה · 2008 · https://www.gov.il/BlobFolder/reports/a-guide-for-employers-equal-opportunities-at-work/he/work-equlity-guide-2008.pdf
- S43 · legal guide · practitioner · Kol Zchut blog · לכל שאלה (לא חייבת להיות) תשובה · 2022 · https://blog.kolzchut.org.il/?p=3444
- S44 · NGO guide · practitioner · Nefesh B'Nefesh · Adjusting Your Resume for the Israeli Market · n.d. · https://www.nbn.org.il/aliyahpedia/employment-israel/managing-the-job-search/adjusting-resume-israeli-market/
- S45 · NGO blog · practitioner · Nefesh B'Nefesh (Melissa Lousky Bienenfeld) · Writing Your Israeli Resume: The Do's and Don'ts · n.d. · https://www.nbn.org.il/aliyah-inspiration/nbn-blogger-network/nbn-employment-blog/writing-your-israeli-resume-the-dos-and-donts/
- S53 · standards guide · practitioner · W3C Internationalization · Inline markup and bidirectional text in HTML · n.d. · https://www.w3.org/International/articles/inline-bidi-markup/

**Practitioner articles and videos**

- S15 · industry article · practitioner · The Tech Resume Inside Out · ATS Myths Busted · 2020 · https://thetechresume.com/samples/ats-myths-busted
- S17 · industry article · practitioner · Christine Assaf (HRTact) · Your job application was rejected by a human, not a computer · 2020 · https://hrtact.com/2020/10/05/your-job-application-was-rejected-by-a-human-not-a-computer/
- S32 · research blog · practitioner · Behavioural Insights Team (Leonie Nicks) · Behind the paper: reducing discrimination against job seekers with employment gaps · 2023 · https://www.bi.team/blogs/behind-the-paper-reducing-discrimination-against-job-seekers-with-employment-gaps/
- S74 · staffing-firm guide · practitioner · Danel HR · תמונה בקורות חיים (A photo in a CV) · n.d. · https://danel-jobs.co.il/info-center/%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%91%D7%A7%D7%95%D7%A8%D7%95%D7%AA-%D7%97%D7%99%D7%99%D7%9D/
- S75 · industry article · practitioner · Laszlo Bock (Google) · My Personal Formula for a Winning Resume · 2014 · https://www.linkedin.com/pulse/20140929001534-24454816-my-personal-formula-for-a-better-resume
- S76 · video · practitioner · Life at Google · Create Your Resume for Google: Tips and Advice · 2019 · https://www.youtube.com/watch?v=BYUy1yvjHxE (no timestamp; transcript not retrieved)
- S26 · commentary · practitioner · Salazar de Leon & Rafi, The Conversation · What everyone gets wrong about the modern job search · 2026 · https://theconversation.com/what-everyone-gets-wrong-about-the-modern-job-search-and-what-actually-works-285582

**Job boards, résumé vendors and popular articles (tier: popular)**

- S6 · industry article · Jobscan · Lever ATS: What Every Job Seeker Should Know · 2026 · https://www.jobscan.co/blog/lever-ats/
- S7 · job-board guide · Indeed Editorial Team · ATS-Friendly Resume: 18 Tips · 2026 · https://www.indeed.com/career-advice/resumes-cover-letters/automated-screening-resume
- S13 · industry article · Muneeb Nawaz, DEV Community · I parsed the same resume six ways… · n.d. · https://dev.to/muneeb_nawaz/i-parsed-the-same-resume-six-ways-to-settle-pdf-or-word-mnk
- S14 · industry article · Enhancv (Volen Vulkov) · The State of Resume Parsing: Does ATS Read Two-Column Resumes? · 2026 · https://enhancv.com/blog/ats-resume-parsing/
- S16 · industry article · Computerworld · 5 insider secrets for beating applicant tracking systems · 2012 · https://www.computerworld.com/article/1458323/5-insider-secrets-for-beating-applicant-tracking-systems.html
- S18 · vendor blog · HiringThing (Pat Brothwell) · Applicant Tracking Systems Aren't Excluding Job Applicants—People Are · 2022 · https://blog.hiringthing.com/applicant-tracking-system-myths
- S20 · industry article · The Interview Guys · The ATS Resume Rejection Myth · n.d. · https://blog.theinterviewguys.com/ats-resume-rejection-myth/
- S34 · industry article · LinkedIn Talent Blog · LinkedIn Members Can Now Spotlight Career Breaks on Their Profiles · 2022 · https://www.linkedin.com/business/talent/blog/product-tips/linkedin-members-spotlight-career-breaks-on-profiles
- S42 · job-board guide · AllJobs · קורות חיים לדוגמה – טיפים ופורמט לכתיבה · n.d. · https://www.alljobs.co.il/Campaigns/CVCenter/CVCenterGuide.htm
- S46 · recruiter article · Dialog · איך לכתוב על שירות צבאי בקו"ח · 2014 · https://www.dialog.co.il/new-world/work-search/blogs/work-guide-part-4
- S47 · news article · ynet (Hiya Bornstein) · קצר ומסודר: כך כותבים קורות חיים · 2014 · https://www.ynet.co.il/articles/0,7340,L-4512056,00.html
- S48 · job-board guide · Jobnet · טיפים ודוגמה לקורות חיים לחייל משוחרר · n.d. · https://www.jobnet.co.il/טיפים_לכתיבת_קורות_חיים_לחייל_משוחרר
- S50 · job-board guide · Drushim · איך לכתוב קורות חיים באנגלית? · 2022 · https://www.drushim.co.il/article/118/
- S51 · industry article · korotchaim.com (Pavel Stegnii) · How Comeet, Greenhouse, and Workable Actually Filter Your CV · 2026 · https://korotchaim.com/en/blog/how-israeli-ats-filters-actually-work
- S52 · industry article · HRLens · Hebrew CV in English for Israel Jobs · 2026 · https://www.hrlens.io/for/hebrew-cv-in-english-israel-jobs
- S56 · industry article · HR Dive · Eye-tracking study shows recruiters look at resumes for 7 seconds · 2018 · https://www.hrdive.com/news/eye-tracking-study-shows-recruiters-look-at-resumes-for-7-seconds/541582/
- S64 · job-board guide · Drushim · מדריך: איך לכתוב קורות חיים? · n.d. · https://www.drushim.co.il/article/13/
- S65 · staffing-firm guide · Adecco US · 5 Most common resume mistakes · n.d. · https://www.adecco.com/en-us/job-seekers/resources/article/common-resume-mistakes-avoid
- S68 · industry article · ERE (John Sullivan) · Why You Can't Get A Job… Recruiting Explained By the Numbers · 2013 · https://www.ere.net/articles/why-you-cant-get-a-job-recruiting-explained-by-the-numbers
- S89 · industry article · TechCrunch (Leena Rao) · LinkedIn 2010 Overused Buzzwords · 2010 · https://techcrunch.com/?p=254285

Note: S25 (Wilson & Caliskan) and S65 (Adecco) are background and are not cited in a tip.
S25 shows that embedding-based AI screeners favoured White-associated names in 85.1% of cases
and female-associated names in 11.1%. It matters if kocha ever ranks CVs itself, not for
writing them.

## Pages that did not load

These are not cited. They are listed so nobody re-adds them from memory:

- Lever help centre
- iCIMS candidate guide
- SAP SuccessFactors parsing languages
- TheLadders 2018 PDF
- Arnulf, Tegner & Larssen 2010 (layout experiment): metadata only
- Blackburn-Brockman & Belanger 2001 (CPA recruiters on CV length): metadata only
- HBR "Resume Gaps Still Matter" 2024: paywalled
- Kol Zchut wiki pages (Cloudflare)
- taasuka.gov.il CV pages (404)
- Princeton and UC Davis career guides
- Inc. and CNBC articles on Google résumé advice
- MDPI 2023 résumé eye-tracking paper
