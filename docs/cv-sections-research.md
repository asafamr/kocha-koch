# CV sections and items: what the evidence says

Which sections and items on a CV help a candidate get an interview, and which do not. Scope:
one-page English CVs for Israeli job seekers, mostly tech roles. This file adds to
[cv-knowledge-base.md](cv-knowledge-base.md) (tips cited as `KB H6`, sources as `KB S38`) and
[cv-weak-points-research.md](cv-weak-points-research.md) (claims cited as `WP 1.6`, sources as
`WP W36`). Where those files already cover an item, this file cites them and adds only what
is new. Source IDs `S1`-`S35` are local to this file. Research pass: October 2026. Every URL
here was opened during that pass.

Source types: **study** (field experiment, audit study or peer-reviewed paper), **survey**
(recruiter, employer or developer survey), **practitioner** (career service, government or
recruiter guide), **popular** (news, vendor blog). Vendor surveys and vendor experiments are
labelled as such: the vendor sells the thing being measured.

Most audit studies (fake CVs sent to real job ads, counting callbacks) are from the US or
Europe and test business, sales or clerical jobs. None tests Israeli tech jobs. Treat every
number below as direction, not as an Israeli tech effect size.

## Summary table

| Item | Add it when | Evidence | Sources |
|---|---|---|---|
| Internships, relevant work | Always, for juniors; first after education | study | S5, S6, S9, KB H6 |
| Skills line (tools, languages) | Always; concrete and paired | study (one) + convention | S5, S7, KB G4 |
| Volunteering | The user has it; more so for juniors and returners | study (one, Belgium) | S1, KB H9 |
| GPA | Strong, and within a few years of graduating | study (mixed) | S8, S9, KB H7 |
| Certifications | The job asks for one, or the user has no degree or thin experience | study (mixed) + survey | S10, S11, S18, S19 |
| Online courses, bootcamps | They fill a gap a degree does not; not as a degree substitute | study | S10, S12, WP 1.5 |
| Projects (personal, academic) | Juniors, career changers, anyone with thin experience | survey | S15, S16, KB H6, WP 1.6 |
| GitHub or portfolio link | The repo is readable and the user can explain it | survey | S15, S23, S31, WP W36 |
| LinkedIn URL | The profile is complete and matches the CV | vendor experiment | S22, S10 |
| Open source contributions | The user has real merged work, esp. for infra and platform roles | survey | S17, S18, WP W37 |
| Honors and awards | Selective and recent | study (old, non-tech) | S7 |
| Spoken languages | The job uses them | study (mixed) | S7, S13, S25 |
| Extracurriculars, leadership, sports | They show a skill the job needs | study (mixed) | S2, S4, S5, KB H6 |
| Military or national service | Only if the CV lists it; never add or ask about it; detail only when relevant | convention | KB H8, WP 2.1-2.5 |
| Summary or objective | Career changers and experienced candidates | weak | KB C3 |
| Interests and hobbies | Short, specific and relevant, or skip | study (mechanism) + split convention | S2, S3, S26, S29, S30 |
| References | Never as names on a one-page CV | convention (split) | S24, S25, S27 |
| Minor or second field | Only if it matches the job | study (null) | S5 |
| Hackathons, competitions | Only as projects with results | none | - |
| Publications | Research and ML roles only | none | - |
| Photo, age, marital status | No | study | KB E4, KB E5 |

## Items

### Internships and relevant work experience

- Nunley et al. sent about 9,400 fake CVs of new US graduates to business jobs in 2013.
  Internship experience raised the interview-request rate by about 14%. The major did not
  matter [S6].
- Arellano-Bover et al. sent 36,880 CVs of US college seniors (2016-2017). Sales-type
  internships added 1.15 percentage points of callbacks. Analyst internships added a
  non-significant 0.02 points [S5]. This is business jobs, not tech.
- Kessler, Low & Sullivan (employers at a US university rating CVs they knew were
  fictional): employers valued internship quality highly. Wharton's summary says they
  preferred a 3.6 GPA with a prestigious internship over a 4.0 without one, and gave "no
  credit" for paid summer jobs like waiting tables [S9].
- NACE ranks internships as the top tie-breaker (KB H6).

**Do.** Put internships and any relevant work first after education for juniors. Name the
employer clearly and write results (KB A1). Non-relevant paid work gets one line.

### Skills line

- Arellano-Bover et al. randomised five computer-skills levels. Listing both programming
  and data-analysis skills raised callbacks by 9.3% of the mean. Basic skills, programming
  alone, or data analysis alone had no significant effect [S5].
- Bertrand & Mullainathan (nearly 5,000 CVs, 1,300+ US job ads, 2001-2002): "special skills"
  (such as a certification or foreign language) had a positive, significant effect on
  callbacks. "Computer skills" oddly predicted fewer callbacks [S7]. Old, and clerical and
  sales jobs.

**Do.** Keep KB G4: a short, concrete, grouped skills line using the job ad's words. Skip
"MS Office" for tech roles; basic skills showed no return [S5].

### Volunteering

- Baert & Vujić (Belgium, field experiment, pairs of fake applications to real vacancies):
  volunteers were 7.3 percentage points more likely to get a positive reply, "one third more
  interview invitations". The effect was larger for women and did not grow with the number
  of engagements [S1].
- Bertrand & Mullainathan randomised volunteering too. The paper lists email address,
  honors and special skills as the significant positive items; volunteering is not among
  them [S7].
- The Israeli Ministry of Defense guide: "התנדבות נותנת נקודות זכות ומראה על יוזמה"
  ("volunteering earns credit and shows initiative") [S26].

**Do.** One volunteering entry is enough; more did not help [S1]. Write it as experience
with a result (KB H9). For experienced tech candidates, include it only if it adds a skill
or fills a gap.

### GPA and grades

- Quadlin sent 2,106 applications to 1,053 US entry-level openings. GPA had no significant
  effect for men. Women with moderate GPAs got the most callbacks; high-GPA women were
  penalised, most in math, where high-GPA men got about three times the callbacks [S8].
- Kessler et al.: in STEM jobs, women and minority candidates needed about 0.22 more GPA
  points to be rated the same as otherwise identical white men [S9].
- NACE: under 40% of US employers screen by GPA (KB H7).

**Do.** Keep KB H7: include a strong GPA with its scale, for recent graduates only. A GPA
does not buy much and its value is uneven by gender. Do not pad a CV to make room for it.

### Certifications (AWS, Azure, Kubernetes, etc.)

- Athey & Palikot ran a randomised experiment with over 800,000 Coursera certificate
  earners from developing countries or without degrees. Making it easy to add the
  credential to LinkedIn raised new employment by 6% (1.0 point), 9% for jobs related to
  the certificate. Gains were 12% for the weakest third and near zero for the strongest. In
  CV scoring, a credential added 8.5 points out of 100 on average, 15-20 for weak CVs and
  near zero for strong ones [S10].
- Deng (China, about 4,000 applications to 1,500 postings): advanced certifications raised
  callbacks 42% over basic ones; intermediate ones showed weak or no gains. The effect was
  largest for applicants with strong education [S11]. Registry summary only; no paper was
  opened.
- Burning Glass data via Dice (2020): 1.1% of over a million US software developer and
  engineer postings asked for a certification. Network and systems admin postings asked
  far more often [S19].
- Linux Foundation and edX survey (200+ hiring managers, 2021): 88% said hiring certified
  staff is a priority; 72% are more likely to hire a certified candidate [S18]. The Linux
  Foundation sells certifications.
- Skillsoft (5,100+ IT decision-makers and staff, 2024): 97% of decision-makers say
  certified staff add value. It says nothing about hiring [S20]. Skillsoft sells training.
- HackerRank (2018): "skill endorsements or certificates" rank among the lowest things
  employers care about [S15].
- No Israeli source on certifications in hiring was found.

**Do.** For software developers, a certification is a small signal. It helps most when the
CV is otherwise thin, the role is cloud, DevOps, security or IT, or the job ad names it. Put
it in the skills line or a one-line "Certifications" entry with the year. Do not let it
replace project or work bullets.

### Online courses and bootcamps

- Athey & Palikot above: online certificates help weak profiles, not strong ones [S10].
- Deming et al. (US field experiment): a business bachelor's from a for-profit "online"
  school got 22% fewer callbacks than one from a non-selective public school [S12]. This is a
  degree, not a short course, but it shows employers discount some credentials.
- Israeli bootcamp graduates enter tech less often and into narrower roles (WP 1.5).

**Do.** List a course or bootcamp under education with dates and the tools learned. Back it
with a project from that course. Say so if the user also has a degree (WP 1.5).

### Projects

- No audit study randomises a projects section.
- HackerRank 2018 (39,441 developers and 7,000+ employers surveyed): about 9 in 10 hiring
  managers named previous experience and years of experience among the top qualifications.
  Portfolio or GitHub projects followed: 80% at small companies, 66% at large ones. C-level
  respondents valued GitHub projects more than years of experience [S15]. HackerRank sells
  skills testing.
- HackerRank 2018 Tech Recruiting (nearly 1,000 recruiters and hiring managers): work
  experience ranked first, above education, certifications and school prestige. 75.4% had
  "hired a great candidate who didn't look good on paper" [S16].
- Israeli and international evidence is opinion and interviews (WP 1.6).

**Do.** KB H6 and H9 hold: write projects like jobs, with the user's part, the stack and a
result. Two or three real projects beat a long list [S32, S31].

### GitHub or portfolio link

- The survey numbers in "Projects" apply [S15].
- Marlow & Dabbish: employers saw GitHub activity as a better sign of ability and
  motivation than a CV (WP W36, 13 interviews).
- Oliveira & Figueiredo interviewed 15 recruiters (Brazil, Canada, US). They found detail on
  languages, commits and APIs useful, but wanted project popularity and history too [S23].
- Nisha, an Israeli tech recruiter: "קורות החיים שלכם אומרים שאתם יודעים לתכנת. פרופיל
  ה-GitHub שלכם מוכיח את זה" ("your CV says you can code; your GitHub proves it"). It
  advises 2-3 polished, documented projects over many unfinished ones [S31].
- No study measures callbacks for adding a GitHub link.

**Do.** Add the link in the contact block (KB E3) only if the pinned repos are readable,
have a README and run. An empty or messy profile is a link the user should drop. Link
project names to their repos [S32].

### LinkedIn URL

- ResumeGo (CV-writing vendor) sent 24,570 fake CVs to US job boards (2018-2019). No
  LinkedIn link: 7.9% callbacks. Link to a bare profile: 7.2%. Link to a full profile:
  13.5%. The gap shrank for more senior jobs [S22]. Not peer-reviewed.
- Athey & Palikot: credentials made visible on LinkedIn raised employment for weak
  profiles [S10]. This is about the profile, not the CV link.

**Do.** Include the URL (KB E3) when the profile is complete and agrees with the CV. A bare
profile did not help in the one test [S22].

### Open source contributions

- Linux Foundation and edX 2021: 44% of 200+ hiring managers named open source
  contribution experience as the most important experience they seek, more than any other.
  This is a survey of open-source employers by an open-source foundation [S18].
- Stack Overflow 2017 (developers, not hiring managers; 28,925 answered this question):
  asked what employers should weigh, they rated communication skills 4.10 and track record
  4.09 out of 5. Open source contributions scored 2.81, below previous employers (2.83) and
  above educational credentials (2.77) [S17].
- Developers raise open-source activity by about 16% while job hunting (WP W37). That shows
  they use it as a signal, not that it works.

**Do.** List merged contributions to known projects as a project entry: project, what was
changed, and a link to the PR. Do not list "contributor" without a link.

### Honors and awards

- Bertrand & Mullainathan: honors had a positive, significant effect on callbacks [S7].
  Clerical and sales jobs, 2001-2002.
- No study tests coding competitions (ICPC, Kaggle) or hackathon prizes.

**Do.** One line for selective honors (dean's list, excellence programs, a national prize),
with the year. Israeli guides support listing distinctions from army or school courses
(S26: "סיימתם מסלול... בהצטיינות?", "finished a program with distinction?").

### Spoken languages

- Oreopoulos (Canada, 12,910 CVs to 3,225 postings): for applicants with foreign names,
  "listing fluency in multiple languages ... did not improve the callback rates" [S13].
- Bertrand & Mullainathan: "special skills", which included foreign languages, helped
  [S7].
- Carlsson, Eriksson & Rooth (Sweden): better written language in the cover letter almost
  doubled callbacks from lowest level to near native [S14]. This is about writing quality,
  not a languages line. It supports KB F1 and F2.
- A student audit study found Spanish bilingualism raised callbacks for Chicago customer
  service jobs (131 postings) [S33]. Undergraduate journal; weak.
- AllJobs: list only languages relevant to the job, from fluent to native; skip
  intermediate ones unless required [S25].

**Do.** One line: "Hebrew (native), English (full professional)". Add a third language only
if the job uses it or the level is high. A clean English CV proves English better than the
line does (WP 5.5).

### Extracurriculars, leadership and sports

- Paul et al. (450+ US jobs, pairs of CVs): listing college varsity athletics had no
  significant effect overall. Non-white athletes were 3.2 points less likely to be invited
  [S4].
- Arellano-Bover et al.: study abroad added 0.78 points (5% of the mean), only in jobs heavy
  on interpersonal skills. History and math minors had precisely zero effect [S5].
- Rivera & Tilcsik (316 US law-firm offices): CVs signalled class through sailing vs track,
  classical vs country music, and similar. Upper-class men got more callbacks; upper-class
  women did not, because employers doubted their commitment [S2].
- NACE scores leadership 3.4 and extracurriculars 3.2 out of 5 as tie-breakers (KB H6).

**Do.** Keep activities that show a job skill (led a team of 8, ran a student hackathon,
taught a course). Drop activities that only show who the user is.

### Military or national service

Covered in KB H8, KB E5 and WP 2. One addition: Bertrand & Mullainathan randomised
military experience and did not report it among the significant items [S7]. That is US
clerical work, and says nothing about Israeli tech units.

### Summary or objective

Covered in KB C3 (weak evidence). Nothing new found. Tech Interview Handbook calls a summary
"a game changer" [S32]; Harvard's guide does not use one [S24]. No study since the
1990s tests it.

### Interests and hobbies

- Rivera & Tilcsik: hobbies were one of the class signals that changed callbacks, in
  different directions for men and women [S2].
- Rivera (120 interviews with elite US firm evaluators): evaluators screened for shared
  "leisure pursuits, background, and self-presentation" [S3].
- Israeli practice is split:
  - For: the Ministry of Defense guide recommends hobbies, but specific ones, not "צפייה
    בסרטים, קריאת ספרים" ("watching films, reading books") [S26]. An Aqua Security HR
    manager told Maariv "חד־משמעית כן" ("definitely yes"), especially for juniors [S29].
    Drushim: "אל תפחדו לציין תחביבים אישיים" ("don't be afraid to list personal hobbies")
    [S28].
  - Against: AllJobs lists hobbies among irrelevant content that can hurt [S25]. Calcalist:
    content unrelated to work "יכול לקלקל מאוד" ("can do real damage") [S30].
- Harvard keeps interests as an optional part of a "Skills & Interests" line [S24].

**Do.** Default: no hobbies section. If the page has room and the user wants one, one line
of two or three specific interests, preferably ones that show a skill (marathon runner,
builds home-automation projects). Recruiters read every line as a personality signal
(KB G3), and hobbies carry class and gender signals [S2].

### References

- Harvard lists "List references" under DON'T [S24].
- AllJobs: write "המלצות יינתנו על פי דרישה" ("references on request") at the bottom; do
  not list names [S25]. Tel Aviv University lists references or "on request" as a section
  [S27].
- No study tests either.

**Do.** No reference names on a one-page CV. The "on request" line is an Israeli
convention; drop it when space is tight or the CV is in English for an international
company.

### Photo and personal details

Covered in KB E4 (no photo; Israeli field experiment) and KB E5 (no age, marital status,
ID). Nothing to add.

## No good evidence

- **Hackathons.** No study measures callbacks or hiring for listing a hackathon. Pages
  found were hackathon-platform marketing. Treat a hackathon as a project with a result.
- **Publications** for industry tech roles. Nothing found. Keep for research, ML and
  algorithm roles where the job asks for them.
- **Coding competitions** (ICPC, Codeforces, Kaggle ranks). Nothing found.
- **"87% of tech recruiters check GitHub; active profiles get 40% more callbacks."** Found
  only on SEO blogs, with no source.
- **"76% of hiring managers look at a portfolio before the CV."** A placement firm's own
  estimate (WP W63).
- **"41% of hiring managers value volunteering like paid work" (LinkedIn).** Repeated on
  many sites; no primary LinkedIn page was found.
- **Certification surveys of certified people.** Pearson VUE (nearly 24,000 IT
  professionals, 2025): 63% got or expected a promotion "within the context of" a
  certification [S21]. Self-report by certificate holders, run by a test vendor. It does not
  show certificates cause hiring.
- **Online-certificate callback experiments in progress.** Two registered US audits
  (Churkina et al., 4,000 applications; Zhu & Sinha, 12,000 applications) had no results as
  of their last registry update [S34, S35].
- **References, summary, interests sections.** No test either way since the 1990s.
- **Israel.** No Israeli study tests any CV section. Israeli sources are guides and
  recruiter opinions.

## Sources

- S1 · study · Baert & Vujić, "Does it pay to care? Volunteering and employment opportunities", *J. Population Economics* 31(3), 2018. https://research.vu.nl/en/publications/does-it-pay-to-care-volunteering-and-employment-opportunities/ (summary: https://glabor.org/glo-fellows-stijn-baert-suncica-vujic-find-volunteering-fosters-employment/)
- S2 · study · Rivera & Tilcsik, "Class Advantage, Commitment Penalty", *American Sociological Review*, 2016. https://www.kellogg.northwestern.edu/faculty/research/detail/2016/class-advantage-commitment-penalty-the-interplay-of-social-class (signals listed: https://thesocietypages.org/discoveries/?p=8780)
- S3 · study (interviews) · Rivera, "Hiring as Cultural Matching", *American Sociological Review*, 2012; news summary. https://www.sciencedaily.com/releases/2012/11/121129093008.htm
- S4 · study · Paul, Cheng, Greene & McGee, "The Value of College Athletics in the Labor Market: Results from a Resume Audit Field Experiment", EDRE Working Paper 2021-05. https://edre.uark.edu/_resources/pdf/collegeathleticslabormarket.pdf
- S5 · study · Arellano-Bover, Bussotti, Nunley & Seals, "Unbundling the Effects of College on First-Job Search: Returns to Majors, Minors, and Extracurriculars", IZA DP 17552, 2024. https://docs.iza.org/dp17552.pdf
- S6 · study · Nunley, Pugh, Romero & Seals, "College Major, Internship Experience, and Employment Opportunities: Estimates from a Résumé Audit", Auburn WP 2014-03. https://cla.auburn.edu/econwp/Archives/2014/2014-03.pdf
- S7 · study · Bertrand & Mullainathan, "Are Emily and Greg More Employable than Lakisha and Jamal?", NBER WP 9873, 2003. https://www.nber.org/system/files/working_papers/w9873/w9873.pdf
- S8 · study · Quadlin, "The Mark of a Woman's Record: Gender and Academic Performance in Hiring", *American Sociological Review* 83(2), 2018. https://gap.hks.harvard.edu/mark-womans-record-gender-and-academic-performance-hiring
- S9 · study · Kessler, Low & Sullivan, "Incentivized Resume Rating", *American Economic Review*, 2019. https://irr.wharton.upenn.edu/?p=69 ; Wharton summary: https://knowledge.wharton.upenn.edu/article/uncovering-hiring-bias/
- S10 · study · Athey & Palikot, "The Value of Non-Traditional Credentials in the Labor Market", arXiv 2405.00247, 2025. https://arxiv.org/abs/2405.00247
- S11 · study (registry summary) · Deng, "Occupational Certifications and Employability", AEA RCT Registry. https://www.socialscienceregistry.org/trials/17143
- S12 · study · Deming, Yuchtman, Abulafi, Goldin & Katz, "The Value of Postsecondary Credentials in the Labor Market: An Experimental Study", NBER WP 20528 (*AER* 2016). https://www.nber.org/papers/w20528
- S13 · study (summary) · J-PAL, "Discrimination Against Skilled Immigrants in the Canadian Labor Market" (Oreopoulos). https://www.povertyactionlab.org/evaluation/discrimination-against-skilled-immigrants-canadian-labor-market
- S14 · study · Carlsson, Eriksson & Rooth, "Language Proficiency and Hiring of Immigrants: Evidence from a New Field Experimental Approach", IZA DP 15950, 2023. https://www.iza.org/publications/dp/15950
- S15 · survey (vendor) · HackerRank, "2018 Developer Skills Report". https://www.hackerrank.com/research/developer-skills/2018/
- S16 · survey (vendor) · HackerRank, "2018 Tech Recruiting Report". https://www.hackerrank.com/research/tech-recruiting/2018/ ; sample size: https://www.i-programmer.info/news/150-training-a-education/11824-hackerrank-recruiting.html
- S17 · survey · Stack Overflow, "Developer Survey Results 2017". https://survey.stackoverflow.co/2017
- S18 · survey (vendor) · Linux Foundation and edX, "2021 Open Source Jobs Report". https://press.edx.org/hubfs/edX-Linux-foundation__Open-Source-Jobs-Report-2021.pdf
- S19 · popular (job-postings data) · Nick Kolakowski, "Which Tech Jobs Demand Certifications?", Dice, 2020. https://www.dice.com/career-advice/tech-jobs-demand-certifications
- S20 · survey (vendor) · Skillsoft, "IT Skills and Salary Report" press release, 2024. https://investor.skillsoft.com/news-events/press-releases/detail/413/skillsofts-new-it-skills-salary-report-highlights-trends
- S21 · survey (vendor) · Pearson VUE, "2025 Value of IT Certification Candidate Report" press release. https://www.pearsonvue.com/us/en/about/news/2025/certifications-fuel-the-success-in-the-age-of-ai.html
- S22 · popular (vendor experiment) · Fortune, "Job Applicants With a Comprehensive LinkedIn Profile 71% More Likely to Get Interviews, Study Says" (ResumeGo), 2019. https://fortune.com/2019/03/28/job-applicants-with-a-comprehensive-linkedin-profile-71-more-likely-to-get-interviews-study-says
- S23 · study (interviews, extended abstract) · Oliveira & Figueiredo, "How to Identify Programming Skills from Source Code?", UFMG, 2024. https://homepages.dcc.ufmg.br/~figueiredo/publications/latam2024preprint.pdf
- S24 · practitioner · Harvard FAS Mignone Center, "Create a Strong Resume" (= KB S70). https://careerservices.fas.harvard.edu/resources/create-a-strong-resume/
- S25 · practitioner · AllJobs, "קורות חיים לדוגמה – טיפים ופורמט לכתיבה" (= KB S42). https://www.alljobs.co.il/Campaigns/CVCenter/CVCenterGuide.htm
- S26 · practitioner · Israel Ministry of Defense, "איך כותבים מסמך קורות חיים כשאין ניסיון מקצועי?" (= KB S40). https://www.hachvana.mod.gov.il/ConsultationAndDirection/Employment/Pages/cv-writing.aspx
- S27 · practitioner · Tel Aviv University Career Center, "כתיבת קורות חיים" (= KB S41). https://career.tau.ac.il/writingcv
- S28 · popular · Roytel Alias, "איך מגייסים מסתכלים על קורות החיים שלכם?" (How recruiters look at your CV), Drushim, 2022. https://www.drushim.co.il/article/395/
- S29 · popular · Maariv, "כשהאופי הפך לפקטור משמעותי, קורות החיים שלנו נראים אחרת" (When character became a factor, our CVs look different), 2023. https://www.maariv.co.il/business/article-985054
- S30 · popular · Calcalist, "דייק או 'רוק סטאר'" (things not to write in your CV), 2020. https://www.calcalist.co.il/articles/0,7340,L-3782210,00.html
- S31 · practitioner (recruiter) · Yevgeny Sini, "איך לבנות פרופיל GitHub שימשוך מגייסים" (How to build a GitHub profile that attracts recruiters), Nisha, 2025. https://www.nisha.co.il/%D7%91%D7%A0%D7%99%D7%99%D7%AA-%D7%A4%D7%A8%D7%95%D7%A4%D7%99%D7%9C-github-%D7%9C%D7%9E%D7%AA%D7%9B%D7%A0%D7%AA%D7%99%D7%9D/
- S32 · popular · Yangshun Tay, Tech Interview Handbook, "Resume". https://www.techinterviewhandbook.org/resume/
- S33 · study (undergraduate journal) · Halfpenny, "Does Bilingualism on Resumes Affect Callback Rates?", *Dartmouth Undergraduate Journal of Politics, Economics and World Affairs* 2(1), 2025. https://digitalcommons.dartmouth.edu/dujpew/vol2/iss1/5
- S34 · study (registry, no results) · Churkina, Asensio & Rubenstein, "Hiring Prospects of Online Education". https://www.socialscienceregistry.org/trials/3538
- S35 · study (registry, no results) · Zhu & Sinha, "Labor Market Returns to Upskilling". https://www.socialscienceregistry.org/trials/5718

Pages that did not load and are not cited: the Rivas, Baker & Evans MOOC experiment (*AERA
Open* 2020; sagepub, DOAJ and openICPSR all returned 403), the HackerRank 2018 report on
Medium (403), the Springer page of Thoms et al. 1999 (abstract not shown), and the ITPro
Today article on HackerRank (redirected away).
