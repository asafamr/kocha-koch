# Role-specific signals on tech CVs
Prefix: RL

What recruiters and hiring managers look for on CVs for specific tech roles: backend, frontend,
full-stack, data science and ML, data engineering, DevOps/SRE, QA, mobile, security, product
management, UX/UI design and engineering management. General bullet, ATS and layout advice is
in `docs/cv-knowledge-base.md` (cited as KB:A1 etc.), section-level evidence in
`docs/cv-sections-research.md` (cited as SEC:<heading>) and Israeli weak points in
`docs/cv-weak-points-research.md` (cited as WP:1.6 etc.); this file only adds what is specific
to a role. The evidence is mostly practitioner: job postings, hiring-manager and recruiter
guides, career-service pages, Israeli recruitment agencies and some vendor blogs. One source is a
survey (NN/g, 204 UX hiring managers). No study tests role-specific CV content against callbacks.
Every URL was opened in October 2026. Example numbers inside quotes are the sources' own
illustrations, not data.

### RL1 `name-the-lane`: Say which version of the role you are in the top third
**Evidence: practitioner**

**Tip.** Make the target lane (frontend, backend-leaning full-stack, platform SRE, ML engineer)
readable from the title and first bullets, and match it to the posting. See KB:B3, KB:C1.

**Why.**
- A frontend reviewer's first check: "Can the reviewer identify the target frontend lane from the top third?" [Q3]
- Full-stack candidates should not try "to sound equally expert in every framework"; honest positioning is more credible [Q4].
- Management roles are "usually specific to a team and a business need", so name your technical domain [Q24].

### RL2 `defensible-claims-only`: List only tools and claims you can defend in an interview
**Evidence: practitioner**

**Tip.** Every technology and keyword on the CV needs a bullet that shows its use. Drop tools the
user only touched; never let AI tailoring add skills the user lacks. See KB:B8, KB:G4.

**Why.**
- Log-On lists as a mistake "מציינים טכנולוגיות שלא באמת נגעתם בהן. זו הזמנה לשאלה מביכה בריאיון" (listing technologies you did not really touch invites an awkward interview question) [Q14].
- "Only list a keyword you can support with a real, quantified bullet, because an interviewer will ask about anything on the page" [Q18].
- Hiring managers in 2025 complained of "AI-enhanced inbounds that tailor applications to our listing, when the person doesn't have the claimed qualifications" [Q27].

### RL3 `inspectable-work`: Link work the reader can check, if it is polished
**Evidence: practitioner**

**Tip.** For developer, data and security roles, link a GitHub, live demo or published app in the
contact block or on the project name, but only when the linked work is readable and current.
Evidence on GitHub links: SEC:GitHub or portfolio link, WP:1.6.

**Why.**
- Wix: "The most important thing is what they're able to create." [Q29]
- SQLink's recruitment division (via Geektime): "צרפו לינק ללינקדאין ולגיטהאב שלנו" (attach your LinkedIn and GitHub links) [Q28].
- "A live demo, GitHub repo, and README with setup, screenshots, tradeoffs, and limitations are more valuable than another project card." [Q3]
- Tech Interview Handbook: include at least 2 projects with GitHub links [Q2].

### RL4 `backend-scale-ownership`: Backend: show scale, production ownership and reliability
**Evidence: practitioner**

**Tip.** Backend bullets should state load or data size (requests, transactions, users), what the
user owned in production, and what got faster, cheaper or more reliable. The language matters
less than the systems. Bullet shape: KB:A1, KB:A2.

**Why.**
- Stripe's backend posting asks for "strong coding skills in any programming language" and "a high degree of autonomy and ownership" [Q1].
- The same role designs systems that "reliably and efficiently handle billions of money movement requests" and debugs production issues [Q1].
- Tools such as "gRPC, GraphQL, Docker/Kubernetes, AWS" are listed as preferred, not required [Q1].

### RL5 `frontend-ui-evidence`: Frontend: name the UI problems solved, not the framework
**Evidence: practitioner**

**Tip.** Frontend bullets should show performance (Core Web Vitals: LCP, INP, CLS), accessibility,
design-system work and the UI states handled (loading, empty, error). If business metrics are
private, use these instead of invented numbers (KB:A3).

**Why.**
- "A good frontend developer resume does not prove that you know React, CSS, or TypeScript. It proves that someone can trust you with the next frontend problem." [Q3]
- "Do not invent numbers. Frontend work often has valuable evidence even when conversion, revenue, or traffic metrics are private or unavailable." [Q3]
- Its checklist asks whether "React, TypeScript, CSS, accessibility, performance, and testing claims [are] backed by examples" [Q3].

### RL6 `fullstack-both-layers`: Full-stack: each job shows both a frontend and a backend signal
**Evidence: practitioner**

**Tip.** Under each full-stack role, write at least one bullet that touches the UI and one that
touches services or data, ideally one bullet that goes end to end: user problem, layers changed,
result. Lead with the side the posting stresses.

**Why.**
- "every full stack experience entry should contain at least one frontend signal and one backend signal across its bullets." [Q4]
- "Start with the product problem, name the layers you changed, and finish with the measurable outcome." [Q4]
- Listed mistakes include clustering all bullets on one side of the stack and listing every tool touched once [Q4]. Source is a CV-service blog reviewed by a former Google and Airbnb recruiter.

### RL7 `ds-business-impact`: Data science: pair the model metric with the business metric
**Evidence: practitioner**

**Tip.** For each model or analysis, give the technical gain (error, AUC, latency) and what it moved
for the business (revenue, churn, cost, risk). A model metric alone reads as coursework.

**Why.**
- O'Reilly (Michael Li): replace "achieved superior model performance" with "Reduced model error by 20% and training time by 50%" [Q5].
- INFORMS Career Center: "speak to 'how many' projects or 'how impactful' your work was (i.e. % increase in revenue)" [Q6].
- ML guide checked by a technical recruiter: "Show your direct impact on core KPIs like revenue, growth, or retention." [Q7]

### RL8 `ds-data-size-tools-in-context`: Data roles: state data size and name tools inside the bullet
**Evidence: practitioner**

**Tip.** Say how much data (rows, TB, events per day) and which method or library did the work,
in the same bullet. A separate list of libraries proves less. See KB:B8.

**Why.**
- O'Reilly lists "talk about data size", e.g. "streaming over 2TB of data", as one of five rules [Q5].
- It also advises citing technologies in context, e.g. "using warm-start regularized regression in scikit-learn" [Q5].
- It prefers verifiable claims such as "Contributed 2,000 lines to Apache Spark" over "talented coder" [Q5].

### RL9 `ml-in-production`: ML engineers: show models deployed, not only trained
**Evidence: practitioner**

**Tip.** For ML engineer roles, show deployment, pipelines and serving (where it runs, at what
scale, what it cost or saved), plus frameworks named in context. Research-only work belongs
under projects or publications.

**Why.**
- Example bullets in the Aced guide: "Built and deployed predictive models...increasing engagement by 15%" and "ML pipelines integrated into production systems" [Q7].
- It suggests to "link to a GitHub repository of an open-source project you worked on" [Q7].
- Listed mistakes: vague statements without metrics and skills misaligned with the role [Q7]. Aced sells interview prep.

### RL10 `data-eng-pipelines`: Data engineering: name the pipeline, the tools and the measured gain
**Evidence: practitioner**

**Tip.** Describe pipelines by source, volume, tools (Spark, Airflow, Kafka, dbt, cloud) and a
result: processing time, query speed, cost, freshness or downtime. Cut tools the user only
touched.

**Why.**
- Rutgers–Newark career services asks for "detailed, hands-on data pipeline experience" with measurable impact [Q8].
- Its sample metrics: "reducing processing time by 27%", "improving query performance by 18%", plus downtime and cost [Q8].
- Listed mistakes: listing every technology touched and omitting business impact [Q8].

### RL11 `sre-reliability-numbers`: SRE/DevOps: give reliability and toil numbers
**Evidence: practitioner**

**Tip.** Show SLOs owned, incident response (MTTD, MTTR: mean time to detect and to recover),
on-call, and how many hours of manual work the user automated away. Uptime alone is weak.

**Why.**
- "Incident response experience, especially MTTD and MTTR metrics, is a top differentiator that many candidates underplay." [Q9]
- "quantify your toil reduction: how many hours of manual work did you automate per week." [Q9]
- Google caps SRE "ops" work at 50%; the rest goes to engineering that automates operations [Q10].

### RL12 `sre-code-plus-systems`: SRE/platform: show you write code as well as run systems
**Evidence: practitioner**

**Tip.** Include at least one bullet where the user wrote software (a tool, operator, automation in
Python or Go), and name systems depth (Linux internals, networking) when the user has it.

**Why.**
- At Google, "50–60% are Google Software Engineers"; the rest were close to that bar and had skills rare among software engineers [Q10].
- The skills Google names: "UNIX system internals and networking (Layer 1 to Layer 3) expertise" [Q10].
- Wiz lists Python, Go and Bash "with concrete project examples" among SRE CV essentials [Q9].

### RL13 `devops-tools-over-title`: DevOps in Israel: Kubernetes and IaC hands-on count more than the title
**Evidence: practitioner**

**Tip.** If the user did DevOps work under another title (backend, IT, sysadmin), say so in bullets
that name Kubernetes, Terraform or other infrastructure as code, and the cloud used. Use the
target title only where honest (KB:B3).

**Why.**
- An Israeli DevOps recruiter at Medulla: companies search for "כל מה שקשור לטכנולוגיות ה-Micro services: Kubernetes, Infrastracture as a code" [Q11].
- Her advice to employers: "תהיו פתוחים לראות אנשים שאין להם את הטייטל הנחשק אבל נגעו ועבדו עם טכנולוגיות רלוונטיות" (be open to people without the title who worked with the relevant technologies) [Q11].
- For certifications in cloud and DevOps roles see SEC:Certifications.

### RL14 `qa-what-why-improved`: QA/automation: say what you tested, why, and what improved
**Evidence: practitioner**

**Tip.** Replace tool lists with bullets naming the framework built or used, what it covered, and
the result (run time, escaped defects, flaky tests removed).

**Why.**
- Ministry of Testing: "The best CV won't just be a long list of skills, they will be able to tell you what they did, why they did it and how it improved things." [Q12]
- Same author: someone "experienced in Cypress but not Playwright" should not be screened out [Q12].
- Log-On's example bullet: "פיתחתי תהליכי אוטומציה ב־Python באמצעות Selenium ו־Jenkins, ששיפרו את זמני הבדיקה ב־40%" (built automation in Python with Selenium and Jenkins, cutting test time 40%) [Q14].
- A tester on the MoT forum asks for "more or less clear measurements" over task lists [Q13].

### RL15 `mobile-shipped-apps`: Mobile: show apps that shipped, with store links and usage
**Evidence: practitioner**

**Tip.** Name apps the user shipped to the App Store or Google Play, link them, and give usage
(downloads, active users, rating, crash-free rate) when known. Side projects count if published.

**Why.**
- Robert Half's Josh Drew: "That's a very common thing we see—when somebody has developed an application or been on a team where an app has made it onto the App Store." [Q15]
- CompTIA's Cory Althoff: "If 500,000 people are using it, then at least there's some sort of scale" [Q15].
- Althoff also advises highlighting "a really cool side project that captures people's attention" [Q15].

### RL16 `security-hands-on-proof`: Security: show hands-on work, not just a list of certificates
**Evidence: practitioner**

**Tip.** List concrete security work: assessments run, findings or CVEs, bug bounties, CTFs, home
labs, tools on GitHub, talks and write-ups. Certifications go on one line (SEC:Certifications).

**Why.**
- Miessler: "Your primary focus needs to be convincing the hiring manager that you can be useful on day one." [Q16]
- "This is why bounty people and programmers with active Githubs have an advantage." [Q16]
- Carhart: "It is quite possible to write a resume which includes volunteer work, talks, and personal projects related to the field" [Q17].
- Carhart: "I'd consider certifications a 'nice to have' for an entry level candidate" [Q17].

### RL17 `security-writing`: Security: a public write-up is evidence of a core skill
**Evidence: practitioner**

**Tip.** If the user wrote a blog post, advisory, report or talk, link one on the CV. Security work
ends in written findings, and the CV itself should read clearly (KB:F1).

**Why.**
- Miessler: "I believe strong writing is the Uber-skill because clear writing requires clear thinking." [Q16]
- Carhart: interviewers "usually value motivation, critical thinking, and self-study above all else while selecting entry level candidates" [Q17].

### RL18 `pm-outcomes-not-features`: Product management: each bullet ties a decision to a metric
**Evidence: practitioner**

**Tip.** Write PM bullets as the outcome moved (activation, retention, revenue, drop-off), the
product change, and who it was built with. A list of features launched is a changelog, not
evidence of judgement.

**Why.**
- "Each bullet has to carry a measurable result on its own." [Q18]
- Aced's rewrite: "Cut mobile checkout drop-off 22% by shipping a one-tap flow with engineering and design, adding an estimated $1.4M in annual revenue." [Q18]
- An ex-Facebook PM's example: "Led team of 3 (2 marketers, 1 engineer) to execute a referral program... leading to $50,000 in new revenue and 120 new customers." [Q19]
- Lawrence lists "various," "managing," "impact," "proactive" as filler words [Q19].

### RL19 `pm-seniority-scope`: Product management: show scope that matches the level applied for
**Evidence: practitioner**

**Tip.** Junior PMs show their own shipped work and its effect. Senior PMs show strategy across a
roadmap, the size of what they owned, and people they mentored. AI product work, if real, goes
in as quantified outcomes.

**Why.**
- For senior PMs the Aced guide stresses "Product strategy, vision, and outcomes across a roadmap" and mentoring [Q18].
- "A growing number of hiring teams now treat AI product work as a primary hiring signal." [Q18] This is a vendor's claim with no survey behind it.

### RL20 `ux-portfolio-case-studies`: UX/UI: put the portfolio link at the top; the portfolio shows process
**Evidence: survey**

**Tip.** Put the portfolio URL in the contact block, written out. The portfolio should be
scannable case studies: problem, the user's role, constraints, research, iterations and what
changed for users and the business.

**Why.**
- NN/g surveyed "204 UX professionals in charge of hiring about what they look for in a portfolio" [Q20].
- Their quotes: "Show me how you started with an opportunity and produced real value"; "I want to see the messy process" [Q20].
- "Very rarely will hiring managers take the time to read your entire portfolio word for word" [Q20].
- NN/g advises putting the portfolio in the contact section at the top [Q21].

### RL21 `ux-plain-cv`: UX/UI: keep the CV plain; no skill bars, graphics or tool lists
**Evidence: practitioner**

**Tip.** A designer's CV is not the place to show visual design. Use a plain layout (KB:E1), name
tools inside experience bullets, and leave out skill charts, headshots and unsolicited redesign
projects.

**Why.**
- NN/g calls skill charts and technology lists "keyword stuffing that harms your resume's understandability to humans" [Q21].
- "Students and graduates sometimes try to fill a sparse resume with graphics, illustrations, or huge fonts." [Q22]
- NN/g lists unsolicited redesigns among mistakes because they lack real constraints [Q21].

### RL22 `em-team-size-growth`: Engineering managers: state how many people, and what changed for them
**Evidence: practitioner**

**Tip.** For each management role give team size and number of teams, hiring done, growth in
headcount, promotions and retention. Put the management line in its own bullet so it is easy to
find.

**Why.**
- Gotfriends (Israeli tech recruitment): "אם יש לכם ניסיון ניהולי – ציינו אותו בבולט נפרד ופרטו – כמה אנשים ניהלתם" (if you managed, give it its own bullet and say how many people) [Q23].
- Graupera: "include the number of teams and people you managed" and note if direct reports grew [Q24].
- Example from EM Tools: "Promoted 4 engineers from mid-level to senior within 18 months" [Q25].

### RL23 `em-not-ic-cv`: Engineering managers: don't write a developer CV with a manager title
**Evidence: practitioner**

**Tip.** Manager bullets describe team results and people growth, with enough technical context to
show credibility. Skip routine duties (1:1s, reports) unless something distinctive came of them.

**Why.**
- EM Tools calls this "by far the most frequent issue": a manager title where "every bullet point describes individual technical contributions" [Q25].
- Graupera: avoid routine items like "1-1 meetings, hiring, writing reports" unless distinctive [Q24].
- A Lyft EM quoted by Aced: "you want to make sure you're focused on how you helped others grow." [Q26]

## Sources
- Q1 · practitioner (job posting) · Stripe · Backend Engineer, Payments and Risk · n.d. · https://stripe.com/careers/listing/backend-engineer-payments-and-risk/7232592
- Q2 · practitioner · Tech Interview Handbook (Yangshun Tay) · FAANG software engineer resume guide · 2026 · https://www.techinterviewhandbook.org/resume/
- Q3 · practitioner · GreatFrontEnd · How to Write a Frontend Developer Resume That Gets Shortlisted · 2026 · https://www.greatfrontend.com/blog/how-to-write-frontend-developer-resume
- Q4 · popular · SWE Resume (reviewed by Markus Fink) · Full Stack Developer Resume Guide · 2026 · https://www.sweresume.app/articles/fullstack-engineer-resume/
- Q5 · practitioner · Michael Li, O'Reilly · 5 secrets for writing the perfect data scientist resume · 2016 · https://www.oreilly.com/content/5-secrets-for-writing-the-perfect-data-scientist-resume/
- Q6 · practitioner · INFORMS Career Center · Steps to craft data science resumes · n.d. · https://connect.informs.org/careercenter/resources/steps-to-craft-data-science-resumes
- Q7 · popular · Aced (formerly Exponent), with recruiter Alex Reyes · Machine learning engineer resume · 2026 · https://www.aced.io/blog/machine-learning-engineer-resume
- Q8 · practitioner · Rutgers University–Newark Career Resources · Data Engineer Resume Guide (Real Templates) · 2025 · https://careers.newark.rutgers.edu/blog/2025/09/22/data-engineer-resume-guide-real-templates/
- Q9 · popular · Wiz Academy · Site reliability engineer resume example for 2026 · 2026 · https://www.wiz.io/academy/cloud-careers/site-reliability-engineer-resume-example
- Q10 · practitioner · Google (Site Reliability Engineering book) · Introduction · 2016 · https://sre.google/sre-book/introduction/
- Q11 · practitioner · Medulla (Israeli recruitment agency) · כל מה שרציתם/ן לדעת על גיוס למשרות DevOps · 2022 · https://medulla.co.il/devops_positions/
- Q12 · practitioner · Gabbi Trotter, Ministry of Testing · A letter to the hiring manager of software testers: 10 years later · 2025 · https://www.ministryoftesting.com/insights/a-letter-to-the-hiring-manager-of-software-testers-10-years-later
- Q13 · practitioner · Ministry of Testing Club (forum thread) · How to identify the good QA CV and applicants · n.d. · https://club.ministryoftesting.com/t/how-to-identify-the-good-qa-cv-and-applicants/68385
- Q14 · practitioner · Log-On (Israeli tech staffing) · איך כותבים קורות חיים להייטק · 2025 · https://b.log-on.com/%D7%90%D7%99%D7%9A-%D7%9B%D7%95%D7%AA%D7%91%D7%99%D7%9D-%D7%A7%D7%95%D7%A8%D7%95%D7%AA-%D7%97%D7%99%D7%99%D7%9D-%D7%9C%D7%94%D7%99%D7%99%D7%98%D7%A7-%D7%94%D7%9B%D7%A0%D7%95-%D7%9C%D7%9A-%D7%9E%D7%93/
- Q15 · popular · Nathan Eddy, Dice · iOS Developer Resume: Structure and Content for Success · 2023 · https://www.dice.com/career-advice/ios-developer-resume-structure-and-content-for-success
- Q16 · practitioner · Daniel Miessler · Day-1 Skills That Cybersecurity Hiring Managers Are Looking For · 2019 · https://danielmiessler.com/blog/day-1-skills-required-to-land-an-entry-level-cybersecurity-job
- Q17 · practitioner · Lesley Carhart · Starting an InfoSec Career – The Megamix – Chapters 1-3 · 2015 · https://tisiphone.net/2015/10/12/starting-an-infosec-career-the-megamix-chapters-1-3/
- Q18 · popular · Aced (formerly Exponent), with recruiter Alex Reyes · Product Manager Resume: Real FAANG Examples & Templates · 2026 · https://www.aced.io/blog/how-to-write-the-perfect-product-manager-resume
- Q19 · practitioner · Will Lawrence (ex-Facebook PM), Productlife · My product manager resume cheat sheet · 2022 · https://productlife.to/p/my-product-manager-resume-cheat-sheet
- Q20 · survey · Rachel Krause, Nielsen Norman Group · 5 Steps to Creating a UX-Design Portfolio · 2019 · https://www.nngroup.com/articles/ux-design-portfolios/
- Q21 · practitioner · Evan Sunwall, Nielsen Norman Group · Effective Resumes for UX Career Changers · 2022 · https://www.nngroup.com/articles/resumes-ux-career-changers/
- Q22 · practitioner · Evan Sunwall, Nielsen Norman Group · Effective Resumes for UX Students and Graduates · 2023 · https://www.nngroup.com/articles/resumes-ux-students-and-graduates/
- Q23 · practitioner · Gotfriends (Israeli tech recruitment) · זה הזמן להתבלט · 2022 · https://www.gotfriends.co.il/%D7%91%D7%9C%D7%95%D7%92%D7%99%D7%9D/cv-guide/
- Q24 · practitioner · Vidal Graupera (LinkedIn article) · How to Write an Engineering Manager Resume or CV · 2022 · https://www.linkedin.com/pulse/how-write-engineering-manager-resume-cv-vidal-graupera
- Q25 · popular · Stephane Moreau, Engineering Manager Tools · Engineering Manager Resume: Examples & Template · 2026 · https://www.em-tools.io/engineering-manager-resume
- Q26 · popular · Anthony Pellegrino, Aced (formerly Exponent) · How to Write an Engineering Manager Resume · 2026 · https://www.aced.io/blog/how-to-write-an-engineering-manager-resume
- Q27 · practitioner · Gergely Orosz, The Pragmatic Engineer · State of the software engineering jobs market, 2025: what hiring managers see · 2025 · https://newsletter.pragmaticengineer.com/p/state-of-the-tech-market-in-2025-hiring-managers
- Q28 · practitioner · Mor Karshi (SQLink recruitment division), Geektime · מה להוסיף ומה למחוק · 2022 · https://www.geektime.co.il/how-to-write-the-perfect-resume/
- Q29 · practitioner · Wix Careers · How We Hire · n.d. · https://careers.wix.com/how-we-hire
