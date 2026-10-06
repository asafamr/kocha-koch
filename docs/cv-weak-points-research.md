# CV weak points in Israeli tech hiring: what the evidence says

Research for a planned kocha feature: a gentle "points a recruiter may ask about" section that
helps a candidate prepare their story. This file tests five gut feelings about how Israeli tech
(hi-tech) hiring weighs CV signals. It is input for a product decision and for a future AI
prompt. No program parses it.

Scope: tech roles at tech companies and startups in Israel (software, data, hardware and chip,
cyber, product, QA, DevOps). Evidence about the general labour market or other countries is
used only where nothing tech-specific exists, and is labelled **general** or **international**.

22 claims, two appendices, 118 sources (38 study, 11 practitioner, 69 popular). Research pass:
October 2026.

## Conventions

Same conventions as [cv-knowledge-base.md](cv-knowledge-base.md): three source tiers (`study`,
`practitioner`, `popular`), no number that is not in the source, attribute rather than assert,
prefer independent sources, and a list of pages that did not load. Source IDs here are `W1` to
`W118`. `KB S27` means source S27 in the knowledge base.

Differences from the knowledge base:

- **Verdict per claim.** Supported, Partly supported, Perception only, or Not supported.
- **Strength scale, adapted.** No field experiment on Israeli tech hiring exists for any signal
  in this file. The knowledge base reserves "Strong" for experiments on CVs. Here:

| Strength | Meaning in this file |
|---|---|
| **Strong** | A field experiment tests it, or official Israeli data measures it directly in tech and an independent source agrees. |
| **Moderate** | Official or research data shows the pattern in tech without controls, or an experiment supports it in another country or sector. |
| **Convention** | Recruiters and employers report it consistently. Nothing measures it. |
| **Weak** | Only commercial or single-author sources, or the sources disagree. |

- **Sources per claim are IDs with tier.** Type, title, author, year and URL are in the
  [source list](#sources), once.
- **How pages were read.** PDFs and the law texts were read as extracted text, so quotes from
  them are exact. HTML pages were read through a fetch tool that returns a model's extraction of
  the page. Re-open an HTML page before reusing a Hebrew quote from it word for word.
- **Pattern is not cause.** Most Israeli numbers here describe who works in tech. They do not
  show that a recruiter rejected a CV because of the signal. Each claim says which kind it is.

## Summary

| # | Gut feeling | Verdict | Strength |
|---|---|---|---|
| 1 | Institution hierarchy: university > college > bootcamp > no training | Partly supported. The order holds for entry to R&D roles. The university-college gap is moderate and partly reflects who gets admitted. Ranking of named institutions is perception. | Moderate |
| 2 | Army service carries weight, tech units most of all | Supported for tech units as a pattern and as stated employer preference. No measured premium. Officer, commander and combat service: perception only. | Moderate (tech units), Weak (rank and combat) |
| 3 | Employment gaps hurt | Supported internationally by field experiments. No Israeli or tech measurement. | Strong (international), Convention (Israel) |
| 4 | Changing focus, job hopping and odd title moves raise concerns | Supported for job hopping by one experiment outside tech. Career change and title moves: perception, plus one US tech experiment on former founders. | Moderate |
| 5 | Other signals (age, location, English, no network, no experience, portfolio) | Mixed. Junior squeeze and referral reliance are documented. Age and address effects on callbacks are not measured in Israel. Portfolio as a substitute for a degree is perception. | Moderate to Weak |

---

## 1. Academic background and institution

### 1.1 `degree-is-the-main-gate`: A degree, usually in a STEM field, is the main way into a first tech role
**Verdict: Supported · Strength: Strong**

**Evidence.**
- Israel Innovation Authority (IIA) and Start-Up Nation Policy Institute (SNPI), 2021-2022
  report, from online profiles of people who started a first tech role from 2018 on: close to
  80% entered with academic training, and about 70% hold a degree in science and technology
  fields [W1].
- Hardware and algorithm roles: juniors with a hi-tech or STEM degree are over 90%. IT and QA
  "rely extensively" on non-academic training. Data and product roles are mostly graduates, but
  only about a third have hi-tech training [W1].
- Aaron Institute (2020, CBS data, people born 1978-1985): a non-Haredi Jewish man with a STEM
  degree has a 54% chance of working in hi-tech, 4.3 times that of a similar man without one
  (about 12%). Women: 38% against about 7% [W5].
- State Comptroller (2021): about 75% of hi-tech workers are graduates and 22% have no degree
  [W3].
- Caveats in the sources: profile data under-reports military and non-academic training [W1].
  The same Aaron Institute file counts 21.5 thousand men without a STEM degree in hi-tech
  against 19.2 thousand with one, so no-degree workers are a large group in absolute terms [W5].

**What a candidate can do.** With a relevant degree: put it where it is seen first (KB H6).
Without one: lead with the nearest equivalent the role accepts, such as tech-unit training,
a completed course plus shipped work, or years in a tech role, and be ready to say how you
learned what the degree would have taught.

**Sources.** [W1] study, [W3] study, [W5] study.

### 1.2 `university-over-college-for-rnd`: University graduates get more of the R&D junior jobs than college graduates
**Verdict: Supported as a pattern · Strength: Moderate**

**Evidence.**
- Of new tech workers with academic training, over 60% come from universities and 36% from
  colleges (michlalot), although both produce a similar number of hi-tech graduates. The report
  reads this as a difficulty for college graduates in entering a tech role [W1].
- State Comptroller: colleges supply about half of hi-tech graduates, but only 26% of juniors
  hired by R&D companies in the first half of 2019 were college graduates (survey answered by
  108 of 131 companies). Many college graduates go to tech roles in banks, insurers and
  government [W3]. An earlier figure in the same report, first half of 2018, 101 companies, 570
  juniors: 75% university, 22% college, 3% straight from the army [W3].
- The gap is larger at multinationals: 72% university graduates in multinational R&D centres
  against 56% in local companies, and 66% in companies of over 500 people against 55% in
  companies of 1-10 (regression on 9,885 observations) [W1].
- SNPI (2023, about 83,000 graduates with online profiles): 78% of university computing
  graduates worked in hi-tech against 69% of college graduates. The authors write that the
  difference between the groups is smaller than the variation inside each group [W4, W50].
- None of these control for ability. They show where graduates end up, not what a recruiter did
  with a CV.

**What a candidate can do.** A college graduate aiming at R&D can show what the institution
name does not: grades with the scale, a demanding final project, a student job or internship in
a tech company. Local companies and smaller teams hire more college graduates than multinational
R&D centres do [W1].

**Sources.** [W1] study, [W3] study, [W4] study, [W50] popular.

### 1.3 `university-wage-gap`: University graduates earn more, but in computer science the gap is small and partly selection
**Verdict: Partly supported · Strength: Moderate**

**Evidence.**
- **General, all fields.** Bank of Israel (2019; cohort born 1978-1985; controls include bagrut
  and psychometric scores): in 2008-2015 the annual gross wage of university graduates was about
  10% above public-college graduates, and private-college graduates were 6-7% above
  public-college graduates. The hourly gap was 4-6%. Engineering graduates earn more if they
  studied at a university [W6].
- **CS, Chief Economist review reported by Ynet (2018; about 184,000 graduates aged 26-39).**
  CS graduates of universities earn about NIS 30,000, of non-budgeted colleges about 26,000, of
  budgeted colleges about 22,000. An institution whose students' average psychometric score is
  10% higher predicts a wage 5% higher on average, which points to admission selection [W52].
  The original review was not opened.
- **CS, against a large gap.** CBS Higher Education Survey 2017 (people who began studying in
  2010), reported by Calcalist: 84% of college CS graduates worked in hi-tech, one point below
  university graduates, and 62% of CS graduates of both types earned over NIS 13,000 net. For
  all hi-tech fields together: 60% of university graduates against 49% of college graduates
  earned over that amount [W51]. "Hi-tech" here is any hi-tech job, not R&D at a tech company.
- **Old.** Neaman Institute (2007): college graduates in first jobs were paid 20-30% less than
  university graduates [W7].
- **International.** A correspondence experiment with 2,400 fictitious applications to IT and
  accounting jobs in the US, UK and Australia found university prestige was not a significant
  predictor of callbacks. A high skills match gave 79% more callbacks [W8].

**What a candidate can do.** Show the skills match for the specific role. That is the one thing
an experiment found to move callbacks where prestige did not [W8].

**Sources.** [W6] study, [W7] study, [W8] study, [W51] popular, [W52] popular.

### 1.4 `named-institution-ranking`: A fixed ranking of named institutions
**Verdict: Perception only · Strength: Weak**

**Evidence.**
- No official table of tech pay or tech employment by institution was found, and no Israeli
  recruiter survey or experiment on institution prestige.
- SNPI (2023) names two colleges that do as well as universities: the Academic College of Tel
  Aviv-Yaffo is second among all institutions in the share of computing graduates working in
  hi-tech, and the College of Management is at about 77% [W4].
- A 2016 analysis by Workey, a recruiting platform, of 27,400 CS graduates shows clusters by
  employer: 64% of AudioCodes hires from Ben-Gurion University, 83% of EMC ScaleIO from the
  Technion, 48% of Broadcom from Tel Aviv University, 64% of Salesforce from IDC Herzliya (now
  Reichman University). Mobile and web companies had more college graduates. Small companies
  hired from the founders' own institution [W53]. This shows geography and personal networks at
  least as much as quality.
- A 2012 Forbes Israel table: CS pay three years after the degree was NIS 20,866 for the
  Technion, 20,263 for IDC and 20,228 for Tel Aviv University [W54]. One old magazine table.

**What a candidate can do.** None needed for the institution name itself. If a recruiter asks
about it, the answer is the work: projects, grades, and what you built since.

**Sources.** [W4] study, [W53] popular, [W54] popular.

### 1.5 `bootcamp-below-degree`: Bootcamp and course graduates enter less often, and into narrower roles
**Verdict: Supported · Strength: Moderate**

**Evidence.**
- About 13% of first tech jobs went to people with non-academic hi-tech training: 9% had only
  that training, 4% had it on top of a degree. They are placed mainly in Israeli companies, in
  software, QA and IT roles. Their share falls from 18% in companies of 1-10 people to 11% in
  companies of over 500 [W1].
- The bootcamp share of new entrants rose from 2.5% in 2005 to 13% in 2019. The IIA and SNPI
  warn that the industry may retreat from this openness in a downturn [W2]. Over 75% of 2019
  bootcamp entrants joined a local company, and 46% of bootcamp graduates already had a degree
  [W4, W50].
- In the first half of 2019, 3% of juniors hired had trained in coding bootcamps. The market
  trained about 1,000 people a year in about 20 programmes [W3].
- The IIA bootcamp programme reported 660 trainees and 75% placement in 2019 [W57]. A labour
  expert writing in 2025 says there is no real placement data for fast courses [W58].
- **Perception, old and unsourced.** A 2016 Calcalist article quoting the staffing firm SQLink:
  65% of hi-tech companies and 85% of startups require a relevant degree, and course graduates
  start at up to 50% lower pay [W55]. An IIA official in 2017: 84% of employers say bootcamp
  graduates are good for them, with no source for the figure [W56].
- **2024-2025.** Reports say retraining courses were hit harder than degrees in the junior
  squeeze [W68]. See 5.1.

**What a candidate can do.** Name the programme, its length and its selection. Then show two or
three finished projects with links, and any prior degree or work experience that the new skill
builds on. 46% of bootcamp graduates have a degree, so say so if you do [W4].

**Sources.** [W1] study, [W2] study, [W3] study, [W4] study, [W50] popular, [W55] popular,
[W56] popular, [W57] popular, [W58] popular, [W68] popular.

### 1.6 `portfolio-replaces-degree`: No formal training, but a strong portfolio
**Verdict: Perception only · Strength: Weak**

**Evidence.**
- No Israeli data on self-taught developers, GitHub, side projects, hackathons or open source as
  hiring signals was found. Only opinion: a Silverfort manager says candidates who did real
  projects are easier to assess [W61], a Facebook Israel hiring manager said in 2019 that people
  are considered without a degree [W62], and a placement firm's guide advises 3-5 GitHub
  projects with figures it does not source [W63].
- **International.** Interviews with seven employers and six job seekers (2013): GitHub
  activity was seen as a more reliable indicator of ability and motivation than a CV [W36].
  A study of about 22,900 GitHub developers found open-source activity rises about 16% during a
  job search. It shows developers use it as a signal, not that it works [W37].
- **International, against.** Burning Glass Institute and Harvard Business School (2024, US):
  when large firms dropped degree requirements, hiring of people without degrees rose by 0.14
  percentage points, "not even 1 in 700 hires" [W35].

**What a candidate can do.** Treat projects as experience entries with results (KB H9), and
make the first technical conversation easy: a live link, a readable repository, and one
project you can explain end to end.

**Sources.** [W35] study, [W36] study, [W37] study, [W61] popular, [W62] popular, [W63] popular.

### Exceptions to the hierarchy

- **Strong college programmes.** Two colleges match university outcomes in SNPI's data [W4].
- **Tech-unit service.** The State Comptroller writes that some companies prefer tech-unit
  alumni to university graduates with no experience [W3]. See 2.1.
- **Role family.** QA and IT lean on non-academic training. Hardware and algorithms almost
  never do [W1].
- **Employer type.** Local and small companies are more open than multinational R&D centres [W1].
- **Experience.** 47% of hi-tech workers did not study computing [W4, W50]. All the data above
  is about the first job. No source measures how long the institution matters after it.
- **Open University.** Its claim of the highest CS graduate pay appears only in sponsored
  content, with no figures [W60]. Unverified.

---

## 2. Army service

### 2.1 `tech-unit-signal`: Service in a technological unit carries weight in tech hiring
**Verdict: Supported as a pattern and as stated employer preference. Size of the premium: not measured · Strength: Moderate**

**Evidence.**
- Aaron Institute survey (2022; 606 employees in 30 hi-tech companies, not representative): 37%
  served in a technological unit. By role: R&D 50%, product 30%, business analysis 25%,
  marketing and sales 21% [W18].
- State Comptroller (2021): the training and experience from these units let soldiers "join the
  civilian hi-tech market quickly", and companies "sometimes even prefer" them to university
  graduates. The basis is interviews by a consulting firm, not a measurement [W3]. The 2023
  audit calls these roles experience "considered useful in the civilian labour market" [W19].
- Swed and Butler (2015, *Armed Forces & Society*): workers' profiles show "a very high
  proportion of military capital amongst employees" and "an institutional preference for those
  who possess it". Abstract only. No numbers [W21].
- The placement firm GotFriends says firms prefer tech-unit alumni and top graduates, and that
  about 4-6 thousand hi-tech workers a year come from the army [W67].
- Ethosia, a placement firm, in 2019: 11% of tech employees are alumni of units such as 8200,
  Mamram and Lotem, and 20% of employees at companies founded by tech-unit veterans served in
  the founder's unit. No sample or method [W75]. The 11% and the 37% above use different
  samples and definitions. Neither is representative.
- Founders: in a 2013 Globes survey of over 200 startups, 36% of founders who served were in
  technology units [W76]. An investor's review of nearly 200 Israeli cyber acquisitions says
  nearly 50% of founders of companies acquired for over $100 million served in 8200 [W77].
- **Not found.** Any study that measures a wage or callback premium for tech-unit alumni with
  controls. An Aaron Institute paper on CBS data states it has no military-service information
  [W5]. The figures in circulation (8200 alumni earn 10-20% or about 20% more) come from a
  recruiter's marketing page and an unsourced op-ed [W64, W65].
- **Dissent.** A startup CEO: "Except for very specialized areas, it does not matter what you
  did in the military" [W80]. A head of data: unit service is "a total black box" because
  candidates cannot say what they did, so he needs to see them solve problems [W81].

**What a candidate can do.** Served in a tech unit: state the role in civilian terms with what
was built and at what scale, inside what is cleared for release (KB H8). Did not: nothing is
missing from the CV. Show the same things the unit is taken to signal, which are hands-on
experience and work in a team under deadlines.

**Sources.** [W3] study, [W5] study, [W18] study, [W19] study, [W21] study, [W64] popular,
[W65] popular, [W67] popular, [W75] popular, [W76] popular, [W77] popular, [W80] popular,
[W81] popular.

### 2.2 `unit-instead-of-degree`: Tech-unit service replaces a degree
**Verdict: Partly supported · Strength: Moderate**

**Evidence.**
- Of hi-tech employees who served in a tech unit, about 80% hold a degree and about 60% hold a
  hi-tech degree [W18].
- Only 3% of juniors in the first half of 2018 were hired directly after military service
  [W3].
- A placement firm states that alumni of 8200, Mamram and other tech units "routinely" enter
  without a degree [W63]. A bootcamp CEO said in 2019 that elite-unit service or a degree was
  once a basic condition and no longer is [W82]. Both have a commercial interest.
- Read together: the unit usually comes with a degree, and replaces it for a minority.

**What a candidate can do.** Tech-unit alumni without a degree can state the training course
(length, selection) and years of hands-on work as the equivalent, and say whether a degree is
in progress.

**Sources.** [W3] study, [W18] study, [W63] popular, [W82] popular.

### 2.3 `rank-and-combat`: Officers, commanders, instructors and combat service are valued in tech hiring
**Verdict: Perception only · Strength: Weak**

**Evidence.**
- Ethosia (2019, no method): a third of tech employees are combat veterans, and 30% of tech
  managers are former combat soldiers (2017). The CEOs quoted say combat service signals
  resilience and leadership [W75].
- Against: among startup founders in the Globes survey, 37% were officers and 63% NCOs, and the
  article concludes that being an officer "does not increase the chances" of leading a startup
  [W76].
- **General.** Asali (2017): a wage premium from military service of 11.6% for men and 4.6% for
  women among Jewish Israelis, across the whole labour market [W25]. Abstract only.
- No source ties rank, command or instructor roles to tech hiring decisions.

**What a candidate can do.** Describe command or instruction as management experience in
numbers: people led, training delivered, budget or equipment owned (KB H8).

**Sources.** [W25] study, [W75] popular, [W76] popular.

### 2.4 `unequal-access-to-units`: Who gets into tech units, and who does not serve at all
**Verdict: Supported · Strength: Strong**

The signal in 2.1 is not available to everyone. This is the main reason for care in wording.

**Access to tech units.**
- Periphery residents were about 16.5% of soldiers in the main tech tracks (Intelligence and
  C4I) against about 32% of all IDF units, in December 2021. The Chief of Staff set a target of
  30% by the end of 2026 [W19].
- IDF data for the end of 2022, reported by Globes: 10% of tech-unit soldiers come from the top
  socio-economic decile, which is 4% of the population [W73].
- Women were about 40% of soldiers in technological positions (2020), and 20% of R&D positions
  in hi-tech [W20]. In 2017 the IDF gave 27% of army programmers and 12% of cyber positions
  [W74].

**Who does not serve** (shares of all 18-year-olds liable for the draft, not of Jews only).
- Draft years 2020-2022: 67-69% of men and 54.6-55.5% of women enlisted [W26].
- Men exempt in 2022: 31.7%. Yeshiva study 18.4%, mental health 6.5%, other medical 1.9%,
  abroad 2.5%, criminal record and other grounds 2.4% [W26].
- Women exempt in 2022: 45.4%. Religious declaration 37.1%, mental health 3.7%, other medical
  1.3%, abroad 2.2% [W26].
- Arab citizens are not called up under a standing IDF order and may volunteer. Their share of
  the yearly draft cohort did not exceed 1.5% in 2010-2019. Druze men are conscripted (since
  1956) and Circassian men (since 1958) [W26, W27]. Arab citizens are about 21% of the
  population [W15].
- Haredi men: about 1,200 enlisted in each of 2021 and 2022, an estimated 10% of Haredi
  18-year-olds [W27].
- New immigrants: under the IDF order released in 2021 (dated 2010), men arriving at 22-27 may
  only volunteer and those arriving at 28 or older are exempt [W48].
- National-civic service: about 18,000 volunteers, about 70% Jewish and 30% Arab and Druze.
  People with disabilities are about 8% of the Jewish volunteers [W28].

**The same groups are under-represented in hi-tech.**
- In 2025, 94.7% of hi-tech employees were non-Haredi Jews, 3.2% Haredi and 2.1% Arab [W11].
- Women were 34% of hi-tech employees in the first half of 2025 [W15]. In 2023, 38% of women in
  hi-tech worked in R&D against 53.5% of men [W16].
- Bank of Israel (2025): the Arab share of hi-tech graduates rose from 4.6% to 9.0% while the
  share among young hi-tech employees stayed at 3.7% (2023). The paper says hiring relies
  heavily on closed social networks, personal referrals and "friend brings friend" [W17].
- A Knesset committee summary (2023) lists among the barriers for Arab candidates the lack of
  training and work experience compared with those who did military or civic service [W49].
  It reports what participants said. No study measures how much of the gap comes from unit
  networks.

**What a candidate can do.** Nothing needs explaining. Not having served is not a CV gap. The
years after school are covered by what the person did: studies, work, national-civic service,
volunteering (KB H9).

**Sources.** [W11] study, [W15] study, [W16] study, [W17] study, [W19] study, [W20] study,
[W26] study, [W27] study, [W28] study, [W48] practitioner, [W49] practitioner, [W73] popular,
[W74] popular.

### 2.5 `service-and-the-law`: What Israeli law says about military service in hiring
**Verdict: Supported (legal sources) · Strength: Strong for the statute, Moderate for the case law**

This is general employment law. No ruling or guidance about tech employers or ads asking for
tech-unit graduates was found. It is not legal advice.

**Equal Employment Opportunities Law, 5748-1988** [W39].
- **Section 2(a)** bans discrimination among employees and job seekers on these grounds: sex,
  sexual orientation, personal status, pregnancy, fertility treatment, IVF, parenthood, age,
  race, religion, nationality, country of origin, place of residence, outlook, party, and
  reserve duty ("שירות במילואים"), including a call-up, expected reserve duty, its frequency
  and length, of the person, their spouse or their child's other parent. It covers hiring,
  terms, promotion, training, dismissal and retirement benefits.
- Regular military service, and not having served, is not on the list. Courts reach it through
  **section 2(b)**, which treats a condition "not relevant to the matter" ("שלא ממין הענין")
  as discrimination, together with the nationality and religion grounds.
- **Section 2(c)**: no discrimination where the requirement follows from the character or
  nature of the job.
- **Section 2A** (added by Amendment 2, 1995 [W40]): an employer may not ask for a person's
  military profile ("פרופיל צבאי", the IDF's medical-fitness code) and may not use it if it
  reaches them.
- **Section 8**: a job ad may not discriminate under section 2.
- **Section 9**: the burden of proof moves to the employer once the applicant shows they met
  the stated requirements, and also if the employer asked, directly or indirectly, for
  information on a protected ground.
- **Section 10**: the labour court may award compensation without proof of financial damage,
  in an amount it sees fit. The NIS 120,000 figure in the text is a cap for sexual-harassment
  claims under section 7 only.

**Rulings.** Both regional labour court cases were read through secondary summaries, not the
judgments.
- *State of Israel v. Tafkid Plus* (Regional Labour Court, case 4517/03): ads for receptionists
  required "after military or national service". The court held that the requirement itself is
  indirect discrimination on nationality and religion because it is not relevant to the job
  [W41]. Also KB S73.
- *Kadi v. Israel Railways* (Tel Aviv Regional Labour Court, case 3863-09, 2009): a tender for
  railway lookouts required army service. The court held the requirement was never relevant to
  the job [W41]. Adalah's summary of its parallel suit: setting military service as a
  requirement for wholly civilian positions "is indirect discrimination, because the majority
  of Arab citizens in the country do not perform military service" [W42, W43].
- *Papo v. Hefziba Books* (case 28225-07-23, 14 March 2024): an interviewer at a bookstore
  asked whether the candidate was about to enlist and said she does not employ people "who do
  not contribute to the state". The claim was accepted: not serving was not a relevant
  consideration for the job [W44].
- A job where military background is relevant, such as security guard, falls under 2(c) [W41].
- In 2013 a minister planned to challenge "the high-tech industry's practice of granting
  preferential treatment in hiring to job candidates who have performed military service"
  [W43]. A bill that year to declare preference for those who served not to be discrimination
  was criticised by the Israel Democracy Institute. Its final status was not verified [W45].
- No National Labour Court ruling on this point was found.

**Reservists.** The Discharged Soldiers (Reinstatement in Employment) Law, 1949, voids a
dismissal made because of reserve duty, and a 2024 amendment extends protection to spouses
[W46, W47]. The Equal Employment Opportunities Commission received 1,475 complaints in 2024,
the most since it was founded. 63% were tied to reserve duty (49% reservists, 13% spouses), and
about 10% of all complaints concerned hiring [W83, W84].

**Interview questions.** Employment lawyers quoted in 2014: all questions about the military
profile are forbidden, and "did you do reserve duty?" or "how often?" are not acceptable [W86].
Also KB S43 and KB S73. The Commission's own guidance pages did not load.

**What this means for kocha.** A candidate may list service. An employer may not require it
for a job that does not need it, and may not ask about profile or reserve duty. So the product
must not present "did not serve" or "reserve duty" as a weak point. See
[Sensitive ground](#sensitive-ground).

**Sources.** [W39] practitioner, [W40] practitioner, [W41] practitioner, [W42] practitioner,
[W43] practitioner, [W44] practitioner, [W45] practitioner, [W46] practitioner,
[W47] practitioner, [W83] popular, [W84] popular, [W86] popular.

---

## 3. Employment gaps

### 3.1 `gaps-cost-callbacks`: A long current gap lowers callbacks, and an explanation helps
**Verdict: Supported · Strength: Strong (international, general). No Israeli measurement.**

Summary of knowledge-base tips H1-H4:
- Kroft, Lange and Notowidigdo (US, about 12,000 fictitious CVs): at eight months of
  unemployment, callbacks are about 45 percent lower than at one month [KB S27]. Eriksson and
  Rooth (Sweden): employers penalise current spells of nine months or more, and past
  unemployment followed by work has no effect [KB S28].
- Namingit, Blankenau and Schwab (3,771 applications): callbacks were 27.4% for the newly
  unemployed, 25.6% for a gap explained by illness and 23.3% for an unexplained gap [KB S30].
- Weisshaar (US): callbacks were 4.9% for stay-at-home mothers against 15.3% for employed
  mothers [KB S29].
- Kristal et al. (UK, n = 9,022): listing years worked instead of dates raised callbacks for
  CVs with gaps by about 15% [KB S31].

None of these is about tech or Israel.

**What a candidate can do.** One line with the reason, and an entry for what was done in the
gap (KB H1, H2).

**Sources.** KB S27, S28, S29, S30, S31 (all study).

### 3.2 `gaps-in-israeli-tech`: Gaps in Israeli tech since 2022
**Verdict: Perception only for the penalty. The rise in gaps is Supported · Strength: Convention**

**Evidence.**
- Hi-tech job seekers at the Employment Service rose from about 7,000 in January 2019 to about
  15,000 in April 2025 [W88], and to 16,300 in December 2025, of whom about 59% came from
  software [W89]. The share with up to four years' experience fell from 74% in 2023 to about
  60% in 2026, so more of them are experienced people [W69].
- Unemployment in hi-tech services averaged about 3.4% in 2024, above the under-3% of other
  industries [W9].
- Ethosia data: the average job search is 14 weeks in the industry as a whole and 11 months
  for juniors with under two years' experience [W70].
- Named tech recruiters (2024): one gives an average search of 3.7 months and says people
  searching for a year are usually sending CVs without targeting. Another says a long search
  is "always examined by employers". A third advises filling the gap with a volunteer project,
  studies or courses [W90].
- No Israeli study or recruiter survey measures a callback penalty for a gap, in tech or
  elsewhere.

**What a candidate can do.** Say the gap came with a layoff round if it did. That is now common
and needs one line. Add what you built, learned or contributed in the months since.

**Sources.** [W9] study, [W69] popular, [W70] popular, [W88] popular, [W89] popular,
[W90] popular.

### 3.3 `reserve-duty-gap`: Reserve duty (miluim) since October 2023 as a gap
**Verdict: Not supported as a CV-screening penalty. The employment cost is Supported · Strength: Moderate**

**Evidence.**
- Tech was hit harder than other sectors. In the fourth quarter of 2023, full absence among
  technology workers was about 7% against 3% in other occupations. By the second half of 2024
  it was under 2% in each hi-tech field [W9].
- From the start of the war to June 2024 employers filed 560 requests to dismiss reservists and
  277 were approved. The report says most were for hi-tech workers [W92].
- **General.** An Employment Service survey of 841 reservists: 41% were dismissed or had to
  leave their job [W91]. A Taub Center study reported in 2026: a reservist with over 200 days
  loses about 5% of wage over 5-20 years [W93]. Commission complaints: see 2.5.
- No evidence was found that a recruiter marks down a CV for months of reserve duty. Doing so
  is discrimination on a protected ground [W39].

**What a candidate can do.** Optional: a neutral dated line such as "Reserve duty" explains the
months (KB H2). Leave out the expected future load (KB E5). The product must not prompt for it.

**Sources.** [W9] study, [W39] practitioner, [W91] popular, [W92] popular, [W93] popular.

---

## 4. Changing focus, job hopping and title moves

### 4.1 `job-hopping`: Frequent job changes lower callbacks
**Verdict: Supported outside tech. In Israeli tech: perception · Strength: Moderate**

**Evidence.**
- **International, general.** Cohn, Maréchal, Schneider and Weber (*Journal of the European
  Economic Association*, 2021): 1,680 applications to 840 clerical vacancies in German-speaking
  Switzerland, for applicants aged 26 with eight years' experience at one employer or four.
  Pooled callback rates: 20.2% for one employer and 14.0% for four. In a survey of 83 HR
  professionals the four-employer CV was rated lower on work attitude. The effect size is
  similar to the unemployment effect in Kroft et al. [W32].
- **Tenure norms in tech are short.** Israeli hi-tech workers changed jobs every 2.8 years on
  average in 2015 (web developers 2.5, hardware 3.7), from 47,500 profiles on a recruiting
  platform [W94]. In the first half of 2026, 4.3% of employees at 289 hi-tech companies
  resigned voluntarily [W13]. In 2018 the voluntary departure rate was 10.2%, and switchers got
  1.5% to 8.6% more pay [W98]. US median tenure in January 2026 was 4.1 years overall and 3.0
  for ages 25-34 [W38].
- **Perception.** A US tech job board (2017): managers worry about stays under two years and
  want three to five [W96].
- No Israeli recruiter survey on job hopping was found, and no tech-specific experiment. With
  an average of 2.8 years, two-year stays are close to the norm in Israeli tech, so the Swiss
  clerical result may overstate the effect here. That is an inference, not a finding.

**What a candidate can do.** Give the reason for a short stay in a few words where it is
external (layoff round, company closed, acquisition, contract role), and show what was shipped
in each role so the stay reads as complete.

**Sources.** [W13] study, [W32] study, [W38] study, [W94] popular, [W96] popular, [W98] popular.

### 4.2 `career-change`: A change of field or focus raises recruiter concerns
**Verdict: Perception only · Strength: Convention**

**Evidence.**
- No study was found on how tech employers rate career changers at CV screening, in Israel or
  elsewhere.
- Career change into tech is common: 47% of hi-tech workers did not study computing, and 46% of
  bootcamp graduates hold another degree [W4, W50].
- A Drushim job-board survey of inexperienced tech job seekers (2021, sample size not given):
  38% came from career-switch courses, 44% took over a year to find a first tech job, and 62%
  believe industry connections strongly affect hiring [W59].
- Reports in 2025 say retraining-course graduates were hit harder than degree holders in the
  junior squeeze [W68].
- The concern is consistent with the general advice in KB H5. It is not measured.

**What a candidate can do.** Open with one line that names the target role and the bridge from
the previous field, then list what from the old career carries over to this job (KB H5).

**Sources.** [W4] study, [W50] popular, [W59] popular, [W68] popular.

### 4.3 `overqualified-or-ex-founder`: Lateral or downward moves, overqualification, and former founders
**Verdict: Supported by experiments abroad · Strength: Moderate**

**Evidence.**
- **International, tech-specific.** Botelho and Chang (*Organization Science*, 2023): 2,400
  applications to entry-level software engineering jobs in six US metro areas. Callbacks were
  24% for non-founders, 16.2% for failed founders and 10.9% for successful founders. In 20
  interviews, recruiters worried that a successful founder "will leave after a few months"
  [W34].
- **International, general.** Galperin, Hahl, Sterling and Guo (*Administrative Science
  Quarterly*, 2020): in four experiments, hiring managers saw highly capable candidates as less
  committed to the organisation than adequate ones, and penalised them. The mechanism is
  expected flight risk [W33].
- No Israeli evidence. Israel has many former founders, so the founder result is relevant, but
  it has not been tested here.

**What a candidate can do.** Say why this role and why now, in the summary line: what you want
to do in it for the next few years. The concern in both studies is commitment, so answer that
directly.

**Sources.** [W33] study, [W34] study.

---

## 5. Other signals a candidate can prepare for

### 5.1 `no-experience-junior`: Having no tech experience is the hardest position in 2024-2026
**Verdict: Supported · Strength: Strong**

**Evidence.**
- Juniors (up to two years' hi-tech experience) were about 32% of R&D hires in 2020, 22% in
  2021 and 26% in the second half of 2022 [W1, W2]. The series that could be opened ends there.
- Taub Center (2025) describes a "sharp decline" in openings for inexperienced workers and
  calls it the juniors crisis [W9]. The Knesset research centre (2025, 2026): a fall in demand
  for junior roles, including software testers and QA, and evidence that some companies are
  cutting junior hiring and prefer experienced workers. Hi-tech services vacancies fell from
  about 22.4 thousand in January 2022 to about 13.4 thousand in May 2026 [W10, W11].
- IIA and Zviran survey (June 2026, 289 companies): 9.8% of companies cut hiring because of AI,
  up from 3% in December 2025 [W13].
- Ethosia data in Globes (2025): 88 of 5,641 open vacancies (1.5%) were for candidates with no
  experience, and 83% of junior vacancies were in Tel Aviv and the centre. Its CEO: "Three
  years are the new two years" [W71]. Job-board data (2021): 4.5% of tech ads were open to
  people with no experience [W59].
- GotFriends: students in hi-tech fields rose from about 25,000 thirteen years ago to over
  50,000 [W67].

**What a candidate can do.** Count everything that is real experience: student jobs,
internships, army roles, projects with users, open-source contributions (KB H6, H9). Apply
where juniors are hired, which the data says is local and smaller companies [W1].

**Sources.** [W1] study, [W2] study, [W9] study, [W10] study, [W11] study, [W13] study,
[W59] popular, [W67] popular, [W71] popular.

### 5.2 `no-referral`: Hiring leans on referrals, so having no one inside is a disadvantage
**Verdict: Supported · Strength: Moderate**

**Evidence.**
- Bank of Israel (2025): hi-tech hiring practices rely heavily on closed social networks,
  personal referrals and "friend brings friend". In a 2020 PresenTense survey, 78% of Arab
  respondents knew no one working in hi-tech, against 32% of Jewish respondents [W17, W87].
- A Viola survey reported in 2019 (sample size not given): 90% of Israeli tech companies
  surveyed had a referral programme, and 47% named it their most effective hiring source [W95].
- No figure was found for the share of Israeli tech hires that come from referrals.

**What a candidate can do.** This is not a CV fix. The CV can be sent with a short note to a
named person at the company. Meetups, alumni groups and former colleagues are where those names
come from.

**Sources.** [W17] study, [W87] popular, [W95] popular.

### 5.3 `age`: Age over about 45
**Verdict: Partly supported · Strength: Moderate (international experiment), Weak (Israeli tech)**

**Evidence.**
- **International, general.** Neumark, Burn and Button (US, over 40,000 applications) found
  "robust evidence of age discrimination in hiring against older women", with less evidence
  for men [KB S72].
- An Employment Service report (2013): the share of workers aged 45-55 in hi-tech fell from 27%
  in 1998 to 17% in 2011, while it rose in other industries [W97]. A 2020 report put Israelis
  over 45 at 29% of hi-tech workers [W98]. The two use different age bands and do not form a
  trend.
- Ages 35-50 were 42.6% of hi-tech job seekers in December 2025, up from 40.5% a year earlier
  [W89].
- Anecdote: an engineer was asked at 45 whether he would be comfortable working with younger
  people [W99].
- Age is a protected ground [W39]. No Israeli correspondence study on age was found.

**What a candidate can do.** Leave out birth year and graduation years that only date you
(KB E5). Give the last 10-15 years the space (KB C6) and show current tools in recent bullets.

**Sources.** KB S72 study, [W39] practitioner, [W89] popular, [W97] popular, [W98] popular,
[W99] popular.

### 5.4 `location`: Living in the periphery
**Verdict: Not supported as a CV signal. Job concentration is Supported · Strength: Moderate**

**Evidence.**
- 68% of hi-tech jobs are in the Central and Tel Aviv districts (2023) [W17]. 86% of
  software-developer openings in 2021 were in those two districts [W100].
- The Bank of Israel finds that geography is not the main explanation for Arab
  under-representation, because gaps between Arab residents of the centre and of the north are
  negligible [W17]. Taub: remote work has not yet promoted hi-tech employment in the periphery
  [W9].
- Place of residence is a protected ground [W39]. No evidence was found that the address on a
  CV changes callbacks.

**What a candidate can do.** City only in the contact block (KB E3). If commuting or relocating
is settled, a short line such as "Relocating to Tel Aviv area" removes the question.

**Sources.** [W9] study, [W17] study, [W39] practitioner, [W100] popular.

### 5.5 `english`: English proficiency
**Verdict: Supported as a requirement. Effect on callbacks not measured · Strength: Moderate**

**Evidence.**
- IIA (2025): skills that must improve include maths, computer science and English, and
  client-facing roles need spoken English in particular [W14].
- Bank of Israel (2025): hi-tech requires proficiency in English. Haredi schools do not fully
  teach English, science and maths, and the state programme for Arab candidates includes
  strengthening English [W17].
- A vendor index ranks Israel 46th, score 524, from self-selected test takers [W101].

**What a candidate can do.** Show it instead of claiming it: an English CV for English postings
(KB H10), and bullets that mention work done in English, such as documentation, customers
abroad or talks.

**Sources.** [W14] study, [W17] study, [W101] popular.

---

## Appendix A: institutions and programmes reported as signals in tech hiring

**Caveat.** These are signals recruiters are reported to use. They are not a ranking of
people's worth, and not a ranking of institutions. No source found supports ordering
institutions inside a group. Use this to help a candidate present what they have, never to tell
them what they lack.

**Group 1: research universities.** As a group they supply over 60% of new tech workers with
academic training, and 72% in multinational R&D centres [W1].

| Institution | What a source says | Source |
|---|---|---|
| Technion | Clusters at hardware and defence employers (Rafael, Elbit, Intel; 83% of EMC ScaleIO hires). Hosts the Brakim and Silon army tracks. | [W53], [W113], [W114] |
| Tel Aviv University | Clusters at Apple, Microsoft and Broadcom (48% of Broadcom hires). | [W53] |
| Hebrew University | Hosts the Talpiot track. | [W110] |
| Ben-Gurion University | 64% of AudioCodes hires. | [W53] |
| Reichman University (IDC Herzliya) | 64% of Salesforce hires; CS pay close to the Technion in a 2012 table. | [W53], [W54] |
| Weizmann Institute | Grouped with the Hebrew University, Tel Aviv University and the Technion as the "elite" group in the Bank of Israel wage study (all fields). | [W6] |
| Bar-Ilan, Haifa, Open University | No tech-hiring data found. The Open University's pay claim is sponsored content. | [W60] |

**Group 2: colleges (michlalot).** As a group, 36% of new tech workers with academic training
and 26% of R&D juniors [W1, W3].

| Institution | What a source says | Source |
|---|---|---|
| Academic College of Tel Aviv-Yaffo | Second among all institutions in the share of computing graduates working in hi-tech. | [W4] |
| College of Management | About 77% of computing graduates work in hi-tech, close to the university average of 78%. | [W4] |
| Afeka, HIT, Shenkar, JCT (Machon Lev), Braude, Sami Shamoon, Hadassah, Ruppin, Azrieli | No source opened gives data on them, in either direction. Do not rank them. | none |

**Degree fields.** About 70% of people in a first tech role hold a science or technology
degree. Hardware and algorithm roles are over 90% hi-tech or STEM graduates [W1].

**Army academic tracks.** Talpiot, Psagot, Brakim, Silon and the academic reserve (Atuda) combine
a degree with service. See Appendix B.

**Non-academic training.** Coding bootcamps and practical-engineer training are the only
training for 9% of first tech jobs, mostly in local companies and in software, QA and IT [W1].
The IIA-supported bootcamps reported 75% placement in 2019 [W57].

**Exceptions to keep in view.** Strong college programmes [W4]; tech-unit service [W3]; QA and
IT roles [W1]; local and small companies [W1]; any candidate with experience, since all of this
is first-job data.

## Appendix B: army units, tracks and roles reported as signals for tech roles

**Caveat.** These are signals recruiters are reported to use. They are not a ranking of
people's worth. About a third of men and almost half of women liable for the draft do not
enlist, and Arab citizens are not called up [W26]. Use this table only to translate service a
candidate already lists into civilian terms. Never ask for a unit, and never treat a missing
one as a gap. The descriptions come from Wikipedia pages unless marked, so they are the public
description of the unit, not a statement about any person's role.

| Unit or track | Hebrew | Civilian terms: what it does and what it implies | Source |
|---|---|---|---|
| Unit 8200 | יחידה 8200 | Signals intelligence, code decryption, cyber. Implies software, data or security work. The role is usually classified. | [W103] |
| Unit 81 | יחידה 81 | Intelligence technology unit that builds technology for special forces. Implies hardware and software R&D. | [W104] |
| Mamram | ממר"ם | The IDF's central computing unit: runs and develops its computer and network systems. Implies infrastructure, DevOps, IT operations. | [W105] |
| School for Computer Professions (Basmach) | בסמ"ח | The IDF programming school. A selective programming course. Graduates are described as sought after in industry. | [W105] |
| Lotem | לוט"ם | Technology division of the C4I Directorate. Includes Mamram, Matzpen, Shachar, Hoshen. | [W106] |
| Matzpen | מצפ"ן | In-house software house for command-and-control systems. Implies software development on large systems. | [W106] |
| Shachar | שחר | In-house software house for enterprise systems. Implies ERP-type development. | [W106] |
| Hoshen | חושן | Operates IDF communications networks. Implies network and telecom operations. | [W106] |
| Matzov | מצו"ב | Encryption and information security. Implies security engineering and applied cryptography. | [W107] |
| Ofek 324 | אופק 324 | Air Force software unit: engineering, development and maintenance of software systems. | [W108] |
| Unit 9900 | יחידה 9900 | Visual and geospatial intelligence. Implies imagery and GIS analysis. | [W109] |
| Talpiot | תלפיות | BSc in physics, maths or CS at the Hebrew University, then R&D roles as an officer. Nine years in total. | [W110] |
| Havatzalot | חבצלות | Intelligence officers' track with a double-major BA, then six years in intelligence. Analysis and research, not engineering. | [W111] |
| Psagot | פסגות | Academic-reserve track: electrical engineering and physics, or software engineering with an MSc in CS, then defence R&D. | [W112] |
| Brakim | ברקים | Technion BSc and MSc in mechanical engineering in four years, then service in R&D bodies. | [W113] |
| Silon | סילון | Technion BSc and MSc in aerospace engineering, then weapons and flight-system development. | [W114] |
| Academic reserve (Atuda) | עתודה אקדמית | Degree first, then service plus 2-3 extra years in the degree field, usually as an officer. A degree plus about five years of professional work. | [W115] |
| Technological reserve | עתודה טכנולוגית | Technician or practical-engineer diploma (grades 13-14), then service in the Air Force, Navy, Intelligence, Ordnance or C4I. Covers the Air Force and Navy technical tracks. | [W116] |
| Magshimim (pre-army feeder) | מגשימים | After-school cyber programme for high-school students with potential for tech units. Globes gives two different shares of graduates who reach tech units, so no number is used here. | [W73] |

**Leadership roles.**

| Role | What the evidence supports | Source |
|---|---|---|
| Officer, commander | CEOs describe leadership and responsibility as transferable. No source ties rank to tech hiring, and founder data shows no officer advantage. Describe as management: people led, scope, results. | [W75], [W76] |
| Course instructor (מדריך/ה) | No source found. Describe as training and technical communication. | none |
| Combat service | A placement firm reports a third of tech employees are combat veterans. Perception of resilience and teamwork. Not measured. | [W75] |

**National and civic service (Sherut Leumi).**

| Track | What the evidence supports | Source |
|---|---|---|
| Carmel 6000 (כרמל 6000) | Tech national-service track, mostly religious women: a six-week programming bootcamp, then two years building applications for nonprofits with industry mentors. About 30 participants in 2018. | [W117], [W118] |
| National-civic service in general | About 18,000 volunteers. List it as experience with what was done (KB H9). No source ties general civic service to tech hiring. | [W28] |

**Not found.** Sources for Gama Cyber, Shoham, and Navy-specific or Air Force-specific tracks
beyond Ofek and the technological reserve. Civic-service tech programmes for Haredi or Arab
candidates. Do not describe these from memory.

---

## Sensitive ground

**The signals are unevenly available.** Tech-unit service depends on a selection at 17-18 that
favours the centre and higher-income families: 16.5% periphery in tech tracks against 32% in
the IDF as a whole [W19]. Arab citizens are not called up, about 18% of draft-age men are exempt
for yeshiva study, 37% of women are exempt by religious declaration, and immigrants arriving
after 22 are not drafted [W26, W48]. The same groups are 2.1% (Arab) and 3.2% (Haredi) of hi-tech
employees [W11]. University admission is also selective: the Chief Economist's data ties part of
the university wage gap to psychometric scores [W52].

**Some of these signals are protected grounds.** Age, place of residence, nationality,
religion, parenthood and reserve duty are listed in section 2(a) [W39]. Requiring military
service for a job that does not need it has been held to be indirect discrimination [W41, W44].
An employer who asks for information on a protected ground carries the burden of proof [W39].

**General-population experiments show discrimination exists.** These are **general**, not tech.
Ariel et al. (2015) ran correspondence tests on Arab and Jewish lawyers and Mizrahi and
Ashkenazi applicants and found significant discrimination against both groups [W31]. In a 2014
Commission survey, 42% of employers were negative about hiring an Arab man and 37% about a
Haredi man [W30]. A product that tells users which signals they lack can repeat this pattern.

**Product rules that follow.**

1. **Never list as a point to prepare for:** not having served, the type of unit, military
   profile, reserve duty, age, address, nationality, religion, family status or health. These
   are either protected grounds or facts the employer may not require.
2. **Only raise what is on the CV and what the candidate can act on:** a current gap, short
   stays, a change of field, a role below the last title, no tech experience yet, a course with
   no project shown.
3. **Institution and unit names are for translation, not scoring.** Appendices A and B help
   describe what a candidate already lists. The product must not rate a CV lower for a college,
   a bootcamp or no unit, and must not show the appendix groupings to the user as a ladder.
4. **Say what the evidence is.** Where a claim here is "Perception only" or "Weak", the product
   should not present it to a user as fact.
5. **This file is not legal advice.** The case law was read through summaries. A lawyer should
   review any user-facing text that mentions rights.

**Wording guidance.**

- Frame it as a question a recruiter may ask and a story to have ready. Not a flaw, a red flag
  or a weakness.
- Forward-looking: "A recruiter may ask about the eight months since your last role. One line on
  what you did in that time answers it." Not: "Your gap will hurt you."
- Describe the CV, not the person: "the CV does not yet show a project", not "you lack
  experience".
- Give a next step in the same sentence. Every claim above has one.
- No comparison with other candidates, and no mention of what "most recruiters prefer" unless
  the claim is rated Strong or Moderate.
- Let the user dismiss any point. Some will have reasons they do not want to write down.

## Claims not to repeat

These appeared in search results or marketing pages and could not be verified. Do not use the
numbers.

| Claim | Where it comes from | Status |
|---|---|---|
| "8200 alumni earn 10-20% (or about 20%) more" | A placement firm's marketing page and an op-ed with no source [W64, W65]. | No data behind it. |
| "90% of hi-tech employees have military service; 60% served in combat or tech units" | A blog post about Swed and Butler that no longer loads. | Article text not opened. The abstract has no numbers [W21]. |
| "Only 360 juniors entered Israeli hi-tech last year" | CTech, 2025 [W66]. | Source inside the article unclear, and it conflicts with the IIA junior-hire series [W1, W2]. |
| "65% of companies and 85% of startups require a degree" | SQLink via Calcalist, 2016 [W55]. | Staffing-firm figure, no method, ten years old. |
| "Open University CS graduates earn the most (almost NIS 36,000)" | Sponsored content and a search snippet [W60]. | No figures on the page. |
| "76% of hiring managers look at a portfolio before the CV"; "40-50% of companies do not require a degree" | A placement firm's guide [W63]. | The firm's own estimate. |
| "Technion graduates are employed in hi-tech at 2.8 times the average rate" | Search snippet of a Neaman Institute paper. | Page not opened. |
| "83% of employers prefer not to hire Arabs" (Kiryat Ono study) | Search snippet. | Not read in full. |

## Sources

Deduplicated. ID · type · tier · author or publisher · title · year · URL. "Abstract only"
means the full text did not load.

**Research papers, official statistics and research reports (tier: study)**

- W1 · research report · study · Israel Innovation Authority and Start-Up Nation Policy Institute · הון אנושי בהייטק הישראלי: תמונת מצב 2021-2022 (Human capital in Israeli hi-tech 2021-2022) · 2022 · https://innovationisrael.org.il//sites/default/files/דון ההון האנושי 2021-2022.pdf
- W2 · research report · study · Israel Innovation Authority and Start-Up Nation Policy Institute · דוח הון אנושי בהייטק הישראלי 2022-2023 (Human capital in Israeli hi-tech 2022-2023) · 2023 · https://innovationisrael.org.il//sites/default/files/דוח הון אנושי בהייטק הישראלי - תמונת מצב 2022-2023.pdf
- W3 · government audit · study · State Comptroller · פעולות המדינה להגדלת מספר העובדים בתעשיית ההיי-טק (State actions to increase the number of hi-tech workers), Annual Report 71B · 2021 · https://library.mevaker.gov.il/sites/DigitalLibrary/Documents/2021/71B/2021-71b-106-Labor-Market-High-tech.pdf
- W4 · research report · study · Start-Up Nation Policy Institute (ed. Uri Gabai) · איפה ללמוד את מקצועות המחשב על מנת לעבוד בהייטק? (Where to study computing to work in hi-tech) · 2023 · https://www.storydoc.com/ee95ba65ce2b62c1/4c09b33e-0248-49a1-960c-8d6626cb63b5/63fe229d3e659e000c1dfa5d
- W5 · policy paper · study · Bental, Peled, Sumkin, Aaron Institute · התעסוקה בהייטק: מקורותיה ואפשרויות הרחבתה (Hi-tech employment: sources and ways to expand it) · 2020 · https://runi.ac.il/media/cadpzp0q/hi-tech.pdf
- W6 · research summary · study · Achdut, Gutman, Zussman, Lipiner, Maayan, Bank of Israel · התשואה במונחי שכר להשכלה הנרכשת באוניברסיטאות ובמכללות (The wage return to education at universities and colleges) · 2019 · https://boi.org.il/media/jx5jjkeb/התשואה-במונחי-שכר-להשכלה.docx
- W7 · research paper (abstract only) · study · Zussman, Furman, Kaplan, Romanov, Samuel Neaman Institute · The quality of Israeli academic institutions: what the wages of graduates tell about it · 2007 · https://neaman.org.il/en/quality-israeli-academic-institutions-wages-graduates-tell-about/
- W8 · field experiment (international) · study · Mihut, *Studies in Higher Education* · Does university prestige lead to discrimination in the labor market? · 2021 · https://esri.ie/publications/does-university-prestige-lead-to-discrimination-in-the-labor-market-evidence-from-a
- W9 · policy paper · study · Debowy, Epstein, Weiss, Taub Center · Employment in the High-Tech Sector and Technology Occupations: Present and Future Challenges · 2025 · https://www.taubcenter.org.il/wp-content/uploads/2025/09/High-tech-employment-2025-ENG-2.pdf (Hebrew: https://www.taubcenter.org.il/wp-content/uploads/2025/09/High-tech-employment-2025-HEB-2.pdf)
- W10 · parliamentary review · study · Rotenberg, Knesset Research and Information Center · תיאור וניתוח מגמות במגזר ההייטק (Trends in the hi-tech sector) · 2025 · https://fs.knesset.gov.il/globaldocs/MMM/f42519ae-0dc9-f011-a865-005056aa9911/2_f42519ae-0dc9-f011-a865-005056aa9911_11_21179.pdf
- W11 · parliamentary review · study · Rotenberg, Knesset Research and Information Center · תיאור וניתוח מגמות בענף ההייטק (Trends in the hi-tech sector, update) · 2026 · https://fs.knesset.gov.il/globaldocs/MMM/bee908ef-9874-f111-a13e-005056aa7c52/2_bee908ef-9874-f111-a13e-005056aa7c52_11_21659.pdf
- W12 · research report (background, not cited in a claim) · study · Israel Innovation Authority and Start-Up Nation Central · High-Tech Human Capital Report 2020 · 2021 · https://innovationisrael.org.il//sites/default/files/2020 High-Tech Human Capital Report - English Version.pdf
- W13 · employer survey · study · Israel Innovation Authority with Zviran · High-Tech Employment Survey · 2026 · https://innovationisrael.org.il/en/wp-content/uploads/sites/3/2026/08/High-Tech-Employment-Survey_english.pdf
- W14 · official report · study · Israel Innovation Authority · 2025 High-Tech Employment: Status Report · 2025 · https://innovationisrael.org.il/en/wp-content/uploads/sites/3/2025/04/Innovation-Authority-High-Tech-Employment-Report-English-Final.pdf
- W15 · official report · study · Israel Innovation Authority · דו"ח שנתי: מצב ההייטק 2025 (Annual report: the state of hi-tech 2025) · 2025 · https://innovationisrael.org.il/wp-content/uploads/2025/09/Annual-Report-The-State-of-High-Tech-hebrew.pdf
- W16 · official report · study · Israel Innovation Authority and Aaron Institute · Women in High-Tech Status Report 2024 · 2024 · https://innovationisrael.org.il/wp-content/uploads/sites/3/2024/03/Women-in-High-Tech-2024-Report-Eng-UPDATED.pdf
- W17 · research paper · study · Sadeh and DeMalach, Bank of Israel Research Division · השתלבות האוכלוסיות הערבית והחרדית במגזר ההייטק הישראלי (Integration of the Arab and Haredi populations in Israeli hi-tech), paper 2025.08 · 2025 · https://boi.org.il/media/lvhm00gn/202508h.pdf
- W18 · policy paper · study · Hashai, Sumkin, Nir, Aaron Institute · מהן המיומנויות הנדרשות מעובדי ההייטק (Which skills are required of hi-tech employees), Policy Paper 2022.08 · 2022 · https://www.runi.ac.il/media/rq2fpfdt/high-tech-policy.pdf
- W19 · government audit · study · State Comptroller · המיון והגיוס לצה"ל – ביקורת מעקב מורחבת (IDF screening and recruitment, extended follow-up audit) · 2023 · https://library.mevaker.gov.il/sites/DigitalLibrary/Documents/2023/2023.2/2023.2-207-Miyun-Giyus.pdf
- W20 · policy paper (English summary) · study · Sumkin, Lifshitz, Bental, Nir, Shalev, Aaron Institute · How can Women Be Encouraged to Choose Excellence Tracks…, Policy Paper 2023.09 · 2023 · https://runi.ac.il/media/b1jdhhwu/how-can-women-be-encouraged-to-choose-excellence-tracks-english-version.pdf
- W21 · research paper (abstract only) · study · Swed and Butler, *Armed Forces & Society* 41(1) · Military Capital in the Israeli Hi-tech Industry · 2015 · https://api.openalex.org/works/doi:10.1177/0095327X13499562
- W22 · research paper (abstract only; background, not cited in a claim) · study · Honig, Lerner, Raban, *Small Business Economics* 27(4) · Social Capital and the Linkages of High-Tech Companies to the Military Defense System: Is there a Signaling Mechanism? · 2006 · https://ideas.repec.org/a/kap/sbusec/v27y2006i4p419-437.html
- W23 · research paper (abstract only; background) · study · Baram and Ben-Israel, *Israel Studies Review* · The academic reserve: Israel's fast track to high-tech success · 2019 · https://cris.iucc.ac.il/en/publications/the-academic-reserve-israels-fast-track-to-high-tech-success-2/
- W24 · working paper (abstract page; background) · study · Breznitz, Samuel Neaman Institute, STE-WP-13 · The Army as Public Space: The Role of the IDF in the Israeli Software Innovation System · 2002 · https://neaman.org.il/EN/Role-IDF-Israeli-Software-Innovation-System-STE-WP-13
- W25 · working paper (abstract only; general) · study · Asali, MPRA Paper 78096 · Military Service and Future Earnings Revisited · 2017 · https://mpra.ub.uni-muenchen.de/78096
- W26 · official statistics · study · Almasi, Knesset Research and Information Center · חייבי גיוס בני 18 ושיעורי גיוס לפי קבוצות אוכלוסייה – עדכון (18-year-olds liable for the draft and enlistment rates by group) · 2024 · https://fs.knesset.gov.il/globaldocs/MMM/2e7046f7-7df2-ee11-8162-005056aa4246/2_2e7046f7-7df2-ee11-8162-005056aa4246_11_20527.pdf
- W27 · official statistics · study · Almasi and Weininger, Knesset Research and Information Center · גיוס ופטור מגיוס לגברים בקבוצות אוכלוסייה שונות (Draft and exemption for men by population group) · 2025 · https://fs.knesset.gov.il/globaldocs/MMM/32b8ae93-49cc-ef11-a856-005056aa1f91/2_32b8ae93-49cc-ef11-a856-005056aa1f91_11_20777.pdf
- W28 · official statistics · study · Noy, Knesset Research and Information Center · נתונים על מתנדבי השירות הלאומי-אזרחי (Data on national-civic service volunteers) · 2022 · https://fs.knesset.gov.il/globaldocs/MMM/66434f56-875d-ec11-813c-00155d0824dc/2_66434f56-875d-ec11-813c-00155d0824dc_11_19435.pdf
- W29 · infographic (background, not cited in a claim) · study · Israel Democracy Institute · הפטור במספרים (The exemption in numbers) · 2024 · https://idi.org.il/media/24139/decision-time-exemption-in-numbers.pdf
- W30 · policy study · study · Hermon, Porat, Feldman, Kricheli-Katz, Israel Democracy Institute · אפליה תעסוקתית בישראל: התמודדות מבדלת (Employment discrimination in Israel: a differentiated approach), Policy Study 121 · 2018 · https://www.idi.org.il/media/11312/employment-discrimination-in-israel-a-differentiated-approach.pdf
- W31 · field experiment (abstract only; general) · study · Ariel, Tobby-Alimi, Cohen, Ben Ezra, Cohen, Sosinski, *Law & Ethics of Human Rights* 9(1) · Ethnic and racial employment discrimination in low-wage and high-wage markets: randomized controlled trials using correspondence tests in Israel · 2015 · https://cris.huji.ac.il/en/publications/ethnic-and-racial-employment-discrimination-in-low-wage-and-high/
- W32 · field experiment (international, general) · study · Cohn, Maréchal, Schneider, Weber, CESifo Working Paper 7976 (*JEEA* 19(1), 2021) · Frequent Job Changes Can Signal Poor Work Attitude and Reduce Employability · 2019 · https://www.ifo.de/DocDL/cesifo1_wp7976.pdf
- W33 · experiments (publication page; international, general) · study · Galperin, Hahl, Sterling, Guo, *Administrative Science Quarterly* 65(2) · Too Good to Hire? Capability and Inferences about Commitment in Labor Markets · 2020 · https://www.gsb.stanford.edu/faculty-research/publications/too-good-hire-capability-inferences-about-commitment-labor-markets
- W34 · field experiment (university summary; international, tech) · study · Botelho and Chang, *Organization Science*, via Yale Insights · Startup Founders Are at a Disadvantage When Applying for Jobs · 2023 · https://insights.som.yale.edu/insights/startup-founders-are-at-disadvantage-when-applying-for-jobs
- W35 · research report (international) · study · Burning Glass Institute and Harvard Business School · Skills-Based Hiring: The Long Road from Pronouncements to Practice · 2024 · https://static1.squarespace.com/static/6197797102be715f55c0e0a1/t/65cc355c4935cb001349a4cd/1707881822922/Skills-Based+Hiring+02122024+vF.pdf
- W36 · interview study (international) · study · Marlow and Dabbish, CSCW · Activity Traces and Signals in Software Developer Recruitment and Hiring · 2013 · https://www.cs.cmu.edu/~xia/resources/Documents/Marlow-cscw13.pdf
- W37 · working paper (international) · study · Abou El-Komboz and Goldbeck, ifo · Career Concerns As Public Good: The Role of Signaling for Open Source Software Development · 2024 · https://www.ifo.de/publikationen/2024/working-paper/career-concerns-public-good-role-signaling-open-source-software-0
- W38 · official statistics (international) · study · US Bureau of Labor Statistics · Employee Tenure news release · 2026 · https://www.bls.gov/news.release/tenure.nr0.htm

**Law texts, rulings, legal and government documents (tier: practitioner)**

- W39 · law text · practitioner · Hebrew Wikisource · חוק שוויון ההזדמנויות בעבודה, התשמ"ח–1988 (Equal Employment Opportunities Law, consolidated text) · current · https://he.wikisource.org/wiki/חוק_שוויון_ההזדמנויות_בעבודה
- W40 · official gazette · practitioner · Knesset · חוק שוויון ההזדמנויות בעבודה (תיקון מס' 2), התשנ"ה–1995 (Amendment 2, adds section 2A) · 1995 · https://fs.knesset.gov.il/13/law/13_lsr_211089.pdf
- W41 · legal guide · practitioner · Workers' rights portal (workrights.co.il) · האם דרישת עובדים לאחר שירות צבאי הנה דרישה מפלה ואסורה? (Is requiring post-army workers discriminatory and forbidden?) · n.d. · https://www.workrights.co.il/אחרי-שירות-צבאי
- W42 · NGO press release · practitioner · Adalah · Statement on Tayeh v. Israel Railway Company (Labor lawsuit 4962/09) · 2009 · https://www.adalah.org/en/content/view/7020
- W43 · NGO statement · practitioner · Adalah · Statement on military service as a hiring criterion in hi-tech · 2013 · https://www.adalah.org/en/content/view/8118
- W44 · law-firm note · practitioner · Goldfarb Seligman labour department · מעסיק חויב לפצות מועמדת לעבודה שהופלתה מחמת אי שירות צבאי (Employer ordered to compensate a candidate discriminated against for not serving) · 2024 · https://alliott.co.il/wp-content/uploads/2024/04/מעסיק-חויב-לפצות-מועמדת-לעבודה-שהופלתה-מחמת-אי-שירות-צבאי.pdf
- W45 · institute op-ed · practitioner · Kremnitzer and Steiner, Israel Democracy Institute · רישיון חוקי להפלות לרעה (A legal licence to discriminate) · 2013 · https://www.idi.org.il/articles/6977
- W46 · law text · practitioner · Hebrew Wikisource · חוק החיילים המשוחררים (החזרה לעבודה), תש"ט–1949 (Discharged Soldiers (Reinstatement in Employment) Law) · current · https://he.wikisource.org/wiki/חוק_החיילים_המשוחררים_(החזרה_לעבודה)
- W47 · law-firm note · practitioner · Shibolet · מלחמת חרבות ברזל: זכויות בני/ות זוג של משרתי מילואים (Iron Swords war: rights of reservists' spouses) · 2024 · https://www.shibolet.com/מלחמת-חרבות-ברזל-זכויות-בני-ות-זוג-ש/
- W48 · official document · practitioner · IDF Spokesperson (freedom-of-information reply) · Standing order on drafting new immigrants, updated February 2010 · 2021 · https://m.www.idf.il/media/disdmicy/בקשה-ומענה.pdf
- W49 · parliamentary document · practitioner · Knesset Science and Technology Committee and Special Committee for Young People · סיכום והחלטות: הרחבת פוטנציאל ההון האנושי מהחברה הערבית לתחומי ההייטק (Summary and decisions: widening Arab human capital in hi-tech) · 2023 · https://fs.knesset.gov.il/25/Committees/25_ci_bg_4629330.pdf

**News, job boards, recruiter marketing and encyclopedia pages (tier: popular)**

- W50 · news article · popular · Srugim · דו"ח: מחצית מעובדי ההייטק לא למדו מחשבים (Report: half of hi-tech workers did not study computing) · 2023 · https://www.srugim.co.il/776448-דוח-ההייטק-מחצית-מהעובדים-לא-למדו-מחשב
- W51 · news article (reports CBS survey) · popular · Shahar Ilan, Calcalist · פער זעיר בתעסוקה ושכר בין הייטקיסטים בוגרי מכללות לבוגרי אוניברסיטאות (A tiny gap in employment and pay between college and university hi-tech graduates) · 2019 · https://www.calcalist.co.il/articles/0,7340,L-3766885,00.html
- W52 · news article (reports Ministry of Finance review) · popular · Ynet · האוצר: אלו הבדלי השכר בין בוגרי אוניברסיטאות למכללות (Treasury: the pay gaps between university and college graduates) · 2018 · https://www.ynet.co.il/economy/article/5130925
- W53 · news article (vendor data) · popular · Maayan Manela, Calcalist · גוגל ואפל מעדיפות את תל אביב; רפאל ואינטל דווקא את הטכניון (Google and Apple prefer Tel Aviv; Rafael and Intel the Technion) · 2016 · https://www.calcalist.co.il/articles/0,7340,L-3701021,00.html
- W54 · news article · popular · Walla / Forbes Israel · איזו אוניברסיטה תניב לכם שכר גבוה יותר? (Which university will get you higher pay?) · 2012 · https://finance.walla.co.il/item/2577746
- W55 · news article (staffing-firm data) · popular · Calcalist · חלום הקריירה בהייטק עדיין עובר באוניברסיטה (The hi-tech career dream still runs through university) · 2016 · https://www.calcalist.co.il/articles/0,7340,L-3700146,00.html
- W56 · news article · popular · Ynet · Article quoting an Innovation Authority official on coding bootcamps (Hebrew title not recorded) · 2017 · https://www.ynet.co.il/economy/article/5031008
- W57 · news article · popular · CTech · Article on the Innovation Authority bootcamp programme: 660 trainees, 75% placement (title not recorded) · 2021 · http://www.calcalistech.com/ctech/articles/0,7340,L-3910167,00.html
- W58 · opinion · popular · Orna Rodi, Calcalist · Opinion piece on fast training courses and missing placement data (Hebrew title not recorded) · 2025 · https://www.calcalist.co.il/local_news/article/skysqjlugx
- W59 · job-board survey · popular · Drushim · Survey of inexperienced tech job seekers (Hebrew title not recorded) · 2021 · https://www.drushim.co.il/article/287/
- W60 · sponsored content · popular · Calcalist with the Open University · Sponsored article on Open University computer-science graduates (Hebrew title not recorded) · 2025 · https://www.calcalist.co.il/article/sjtlrxkzxg
- W61 · news article · popular · Maariv · Article quoting tech employers on candidates with real projects (Hebrew title not recorded) · 2025 · https://www.maariv.co.il/economy/israel/article-1244107
- W62 · news article · popular · Ynet · Article quoting a Facebook Israel hiring manager on hiring without a degree (Hebrew title not recorded) · 2019 · https://www.ynet.co.il/articles/0,7340,L-5611980,00.html
- W63 · recruiter marketing · popular · Nisha · מפתח תוכנה ללא תואר (Software developer without a degree) · 2026 · https://www.nisha.co.il/מפתח-תוכנה-ללא-תואר/
- W64 · recruiter marketing · popular · Nisha · Page on Unit 8200 alumni in the job market (Hebrew title not recorded) · 2025 · https://www.nisha.co.il/8200/
- W65 · opinion · popular · Esther Luzzatto, Maariv · Op-ed on 8200 alumni (Hebrew title not recorded) · 2020 · https://www.maariv.co.il/journalists/Article-810742
- W66 · news article · popular · Maayan Manela, CTech · 'Insane damage and a macroeconomic drama': How AI and outsourcing are killing junior jobs · 2025 · https://www.calcalistech.com/ctechnews/article/xgkjv7ipy
- W67 · news article (recruiter data) · popular · Eitan Gerstenfeld, Bizportal · סיים תואר במדעי המחשב ולא מוצא עבודה – משבר הג'וניורים בהייטק (Finished a CS degree and can't find work: the hi-tech juniors crisis) · 2025 · https://www.bizportal.co.il/BizTech/news/article/20013347
- W68 · news article · popular · Amit Bar, Bizportal · Article on falling enrolment and retraining courses in the junior squeeze (Hebrew title not recorded) · 2025 · https://www.bizportal.co.il/career/news/article/20019765
- W69 · news article (Employment Service data) · popular · Ariel Feiglin, Maariv · לא רק ג'וניורים: גם עובדים ותיקים בהייטק הישראלי נפגעים (Not only juniors: veteran Israeli hi-tech workers are hit too) · 2026 · https://www.maariv.co.il/economy/israel/article-1340766
- W70 · news article (recruiter data) · popular · Meytal Vaizberg, Globes · Juniors struggling to find tech jobs in Israel · 2025 · https://en.globes.co.il/en/article-1001499933
- W71 · news article (recruiter data) · popular · Globes · Jobs scarce for juniors in Israel's tech industry · 2025 · https://en.globes.co.il/en/article-jobs-scarce-for-juniors-in-israels-tech-industry-1001512559
- W72 · news article (background, not cited in a claim) · popular · Shahar Ilan, Calcalist · שיעור החיילים מהפריפריה במסלולים הטכנולוגיים – 16.5% בלבד (Share of periphery soldiers in tech tracks: only 16.5%) · 2023 · https://www.calcalist.co.il/local_news/article/rkgifg5ai
- W73 · news article (IDF data) · popular · Assaf Gilead, Globes · Are the Israeli army's technology units elitist? · 2023 · https://en.globes.co.il/en/article-are-the-israeli-armys-technology-units-elitist-1001443862
- W74 · news article · popular · Shoshanna Solomon, Times of Israel · IDF targets women for tech as Israel feels worker pinch · 2017 · https://www.timesofisrael.com/idf-targets-women-for-tech-as-israel-feels-worker-pinch/
- W75 · news article (recruiter data) · popular · Maayan Manela, Calcalist · לא רק 8200: השירות הצבאי שנותן יתרון בהייטק (Not only 8200: the military service that gives an edge in hi-tech) · 2019 · https://www.calcalist.co.il/articles/0,7340,L-3775205,00.html (English: https://www.calcalistech.com/ctech/articles/0,7340,L-3775416,00.html)
- W76 · news article (newspaper survey) · popular · Tzahi Hoffman, Globes · Start-up entrepreneurs are older than you think · 2014 · https://en.globes.co.il/en/article-start-ups-entrepreneurs-are-older-than-you-think-1000931356
- W77 · news article (investor review) · popular · CTech · From Unit 8200 to Wiz's $32B exit · 2025 · https://www.calcalistech.com/ctechnews/article/sjltwsk2kg
- W78 · news article (background, not cited in a claim) · popular · Sophie Shulman, CTech · Israel's elite military units built a tech powerhouse. Now the state wants a share. · 2026 · https://www.calcalistech.com/ctechnews/article/rypq9w4lmx
- W79 · news article (background, not cited in a claim) · popular · Tzahi Hoffman, Globes via Mako · Article on tech-unit graduates' advantage in job search (Hebrew title not recorded) · 2009 · https://www.mako.co.il/finances-hitech/tech/Article-3828353be772321006.htm
- W80 · news article · popular · Daniel Farber-Ball, CTech · Combat vs. Tech: Does your IDF service determine your future? · 2021 · https://www.calcalistech.com/articles/0,7340,L-3925556,00.html
- W81 · vendor blog · popular · Alooba · Yoav Reisner on hiring in Israel's tech market: stability, military experience and non-traditional talent · n.d. · https://www.alooba.com/articles/yoav-reisner-on-hiring-in-israels-tech-market-stability-military-experience-and-non-traditional-talent/
- W82 · news article · popular · Mako · Article quoting the CEO of the Elevation bootcamp (Hebrew title not recorded) · 2019 · https://www.mako.co.il/pzm-magazine/Article-a6825720d106b61026.htm
- W83 · news article (reports Commission annual report) · popular · Sharon Birkman, Ice · המחיר הכבד של המילואים: זינוק דרמטי בתלונות על אפליה (The heavy price of reserve duty: a sharp jump in discrimination complaints) · 2025 · https://www.ice.co.il/local-news/news/article/1053982
- W84 · news article (reports Commission annual report) · popular · Walla Finance · Article on the Commission's 2024 annual report (Hebrew title not recorded) · 2025 · https://finance.walla.co.il/item/3731882
- W85 · news article (background, not cited in a claim) · popular · Calcalist · Article on the Commissioner's first reservist lawsuit (Hebrew title not recorded) · 2024 · https://www.calcalist.co.il/local_news/article/by9s4bj6c
- W86 · news article · popular · Mako · Article on what may be asked in a job interview (Hebrew title not recorded) · 2014 · https://www.mako.co.il/study-career-career/articles/Article-589fd7b52b74641006.htm
- W87 · news article · popular · CTech · Study reveals majority of Arabs are blind to Startup Nation · 2021 · https://www.calcalistech.com/ctech/articles/0,7340,L-3898194,00.html
- W88 · news article (Employment Service data) · popular · Shahar Ilan, Calcalist · מספר דורשי העבודה בהייטק יותר מהוכפל (The number of hi-tech job seekers more than doubled) · 2025 · https://www.calcalist.co.il/calcalistech/article/hkhjd1elxe
- W89 · news article (Employment Service data) · popular · Hadas Bartel, Bizportal · כ-16 אלף דורשי עבודה בהייטק, עלייה של יותר מ-120% מ-2022 (About 16 thousand hi-tech job seekers, up over 120% since 2022) · 2026 · https://www.bizportal.co.il/BizTech/news/article/20027670
- W90 · news article (named recruiters) · popular · Maayan Manela, Calcalist · מחפשים עבודה זמן רב ומתקשים למצוא? כך תצאו מהלופ (Searching a long time and struggling? How to get out of the loop) · 2024 · https://www.calcalist.co.il/calcalistech/article/rj6qarvg1l
- W91 · news article (Employment Service survey; general) · popular · Yuval Bagno, Maariv · סקר מטריד: 40% ממשרתי המילואים נאלצו לעזוב עבודה (Worrying survey: 40% of reservists had to leave a job) · 2025 · https://www.maariv.co.il/news/military/article-1184140
- W92 · news article · popular · Bacalov and Adri, N12 · רוב הבקשות ממשרד העבודה לפיטורי מילואימניקים: של הייטקיסטים (Most requests to the Labour Ministry to dismiss reservists are for hi-tech workers) · 2024 · https://www.mako.co.il/news-money/2024_q3/Article-d53af414b31b091026.htm
- W93 · news article (reports Taub Center study; general) · popular · Shahar Ilan, Calcalist · Article on the long-run wage cost of reserve duty (Hebrew title not recorded) · 2026 · https://www.calcalist.co.il/local_news/article/hyzozspsmx
- W94 · news article (vendor data) · popular · Maayan Manela, Calcalist · מדלגים: עובדי ההייטק מחליפים מקום עבודה כל 2.8 שנים בממוצע (Hopping: hi-tech workers change jobs every 2.8 years on average) · 2015 · https://www.calcalist.co.il/articles/0,7340,L-3676008,00.html
- W95 · news article (VC survey) · popular · CTech · Article on the Viola survey of Israeli tech companies' hiring (title not recorded) · 2019 · https://www.calcalistech.com/ctech/articles/0,7340,L-3770804,00.html
- W96 · job-board article (international) · popular · Dice · Article on what recruiters and managers fear when hiring (title not recorded) · 2017 · https://www.dice.com/career-advice/recruiters-managers-fear-hiring
- W97 · news article (reports Employment Service report) · popular · Miki Peled, Calcalist · Article on the falling share of workers aged 45-55 in hi-tech (Hebrew title not recorded) · 2013 · https://www.calcalist.co.il/articles/0,7340,L-3620311,00.html
- W98 · news article (reports IIA and SNC report) · popular · Israel21c · Report: It pays to be an Israeli high-tech employee · 2020 · https://archive.israel21c.org/report-it-pays-to-be-an-israeli-high-tech-employee/
- W99 · news article · popular · Maayan Manela, Calcalist · אי אפשר למצוא עובדים, אבל אף אחד לא יעסיק אותך בגיל 50 (You can't find workers, but nobody will hire you at 50) · 2021 · https://www.calcalist.co.il/calcalistech/article/bjlcbqmzy
- W100 · news article (CBS data) · popular · Nimrod Bousso, Nadlan Center · Article on where software-developer vacancies are located (Hebrew title not recorded) · 2022 · https://www.nadlancenter.co.il/article/6188
- W101 · vendor index · popular · EF Education First · EF English Proficiency Index: Israel · n.d. · https://www.ef.co.uk/epi/regions/middle-east/israel
- W102 · news article (vendor survey; international; background, not cited in a claim) · popular · Campus Technology · 4 Out of 5 Companies Have Hired a Coding Bootcamp Graduate · 2017 · https://campustechnology.com/articles/2017/05/03/4-out-of-5-companies-have-hired-a-coding-bootcamp-graduate.aspx
- W103 · encyclopedia · popular · Wikipedia · Unit 8200 · n.d. · https://en.wikipedia.org/wiki/Unit_8200
- W104 · encyclopedia · popular · Wikipedia · Unit 81 · n.d. · https://en.wikipedia.org/wiki/Unit_81
- W105 · encyclopedia · popular · Wikipedia · Mamram · n.d. · https://en.wikipedia.org/wiki/Mamram
- W106 · encyclopedia · popular · Hebrew Wikipedia · לוט"ם (Lotem) · n.d. · https://he.wikipedia.org/wiki/לוט"ם
- W107 · encyclopedia · popular · Hebrew Wikipedia · מצו"ב (Matzov) · n.d. · https://he.wikipedia.org/wiki/מצו"ב
- W108 · encyclopedia · popular · Hebrew Wikipedia · יחידת אופק (Ofek unit) · n.d. · https://he.wikipedia.org/wiki/יחידת_אופק
- W109 · encyclopedia · popular · Wikipedia · Unit 9900 · n.d. · https://en.wikipedia.org/wiki/Unit_9900
- W110 · encyclopedia · popular · Wikipedia · Talpiot program · n.d. · https://en.wikipedia.org/wiki/Talpiot_program
- W111 · encyclopedia · popular · Wikipedia · Havatzalot Program · n.d. · https://en.wikipedia.org/wiki/Havatzalot_Program
- W112 · encyclopedia · popular · Hebrew Wikipedia · תוכנית פסגות (Psagot programme) · n.d. · https://he.wikipedia.org/wiki/תוכנית_פסגות
- W113 · encyclopedia · popular · Hebrew Wikipedia · תוכנית ברקים (Brakim programme) · n.d. · https://he.wikipedia.org/wiki/תוכנית_ברקים
- W114 · encyclopedia · popular · Hebrew Wikipedia · תוכנית סילון (Silon programme) · n.d. · https://he.wikipedia.org/wiki/תוכנית_סילון
- W115 · encyclopedia · popular · Wikipedia · Atuda · n.d. · https://en.wikipedia.org/wiki/Atuda
- W116 · encyclopedia · popular · Hebrew Wikipedia · עתודה טכנולוגית (Technological reserve) · n.d. · https://he.wikipedia.org/wiki/עתודה_טכנולוגית
- W117 · news article (JTA, hosted by AMIT) · popular · Sam Sokol, JTA · Article on the Carmel 6000 tech national-service track (title not recorded) · n.d. · https://amitchildren.org/?p=32447
- W118 · news article · popular · Srugim · Article on 30 women in the Carmel 6000 project (Hebrew title not recorded) · 2018 · https://www.srugim.co.il/272671-צפו-30-בנות-בפרויקט-חדשני-שישנה-את-המדינ

Knowledge-base sources reused here: KB S27, S28, S29, S30, S31, S43, S72, S73. They are listed
in [cv-knowledge-base.md](cv-knowledge-base.md) and are not counted in the 118.

## Pages that did not load

These are not cited. They are listed so nobody re-adds them from memory.

- Israel Innovation Authority, "State of High-Tech 2026" (Hebrew PDF): over the 10 MB fetch limit
- Start-Up Nation Central, 2018 Human Capital Report (PDF): over the 10 MB fetch limit
- Israel Innovation Authority web pages (press releases for the 2025 employment report, the 2021-2022 human-capital report, the 2024 women report, the 2026 employers survey, the human-capital site): HTTP 403. The PDFs on the same domain loaded.
- Bank of Israel press-release and publication web pages: bot check. The docx and PDF loaded.
- Equal Employment Opportunities Commission pages on gov.il: HTTP 403. No Commission page or annual report was read directly.
- Kol Zchut, "military service cannot be a binding condition for hiring": HTTP 403
- Swed and Butler 2015 full text (SAGE): HTTP 403. The UT Austin blog post about it: HTTP 410.
- Ariel et al. 2015 full text (De Gruyter): HTTP 405
- The Media Line, "Only 1.8% of Israeli tech workers are Arab": paywalled
- JDC, "Leaping2HT" report: HTTP 404
- Maala instruction PDF: HTTP 404
- Makor Rishon article on the "Mamriot" cyber track: HTTP 403
- Israel Hayom tech article: HTTP 403
- Statista page on Israeli tech workers: paywalled
- Hebrew Wikipedia pages for Matzpen, the computing school, Magshimim and Gama Cyber: HTTP 404 on the titles tried
- Drushim job ads: HTTP 410
- The original Ministry of Finance Chief Economist review (2018) and the Employment Service hi-tech report: not located
- The Tafkid Plus and Kadi judgments themselves: not located. Summaries only.
