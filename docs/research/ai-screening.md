# CVs and AI screening
Prefix: AI

Scope: what changed for CVs in 2023-2026 as both sides adopted AI. Covers LLM screeners and their
biases (including a preference for LLM-written text), recruiter attitudes to AI-written CVs, AI
detection, application volume, hidden-text prompt injection, and what an AI-assisted CV must keep
human. ATS mechanics, keyword use and proofreading are in `docs/cv-knowledge-base.md` (groups B and
F) and are cited by id ("KB B8", "[S24]") rather than repeated. Vendor surveys are self-reported and
run by companies that sell CV services; treat their numbers as direction, not size.

### AI1 `polish-with-ai-facts-from-user`: Let AI fix the wording; take every fact from the user
**Evidence: study**

**Tip.** Use AI for grammar, fluency and phrasing. Build every bullet from facts the user supplied,
starting from the user's own draft or answers.

**Why.**
- Algorithmic writing help raised hires 8% with no drop in employer satisfaction (KB F2, [S24]).
- Anthropic tells applicants: "Please create your first draft yourself, then use Claude to refine
  it" [Q20].
- TopResume (vendor, 600 US hiring managers): 52% find AI acceptable for proofreading, not for final
  drafts [Q23].

### AI2 `specific-beats-polished`: Polish no longer signals ability; specific detail does
**Evidence: study**

**Tip.** Give each bullet details only the user could know: the system, the number, the team, the
outcome. Fluent but generic text no longer sets a candidate apart.

**Why.**
- Freelancer.com data: employers paid more for customised applications before LLMs, "but not
  after" [Q3].
- In the authors' model, losing that signal cut hiring of top-ability workers 19% and raised
  bottom-quintile hiring 14% [Q3].
- Resume Now (vendor, 925 US HR professionals, March 2025): 62% say AI-generated resumes that lack
  customisation will likely be rejected [Q11].

### AI3 `llm-screeners-favour-llm-text`: LLM screeners tend to prefer LLM-written text
**Evidence: study**

**Tip.** Don't strip AI-assisted phrasing out of fear of AI screeners; the evidence points the other
way. The risk is the human reader (AI4) and invented content (AI12), not the wording.

**Why.**
- Xu, Li & Jiang (2,245 pre-LLM human resumes; GPT-4o, LLaMA, Qwen, DeepSeek and others): with
  content held fixed, models preferred their own summaries over human ones 67-82% of the time [Q1].
- In simulation, same-model candidates were 23-60% more likely to be shortlisted; gaps were largest
  in sales and accounting [Q1, Q2].
- Only the summary section was swapped, and the paper is a preprint [Q1].
- Telling the screener to ignore text origin cut the bias 25-71% [Q1], so vendors can remove it.

### AI4 `dont-read-as-generic-ai`: Recruiters say they distrust AI-written CVs; keep the user's voice
**Evidence: survey**

**Tip.** Edit the user's wording rather than replace it, and cut stock phrases and empty adjectives
(KB G1, G2). A human reader who suspects careless AI use may mark the candidate down.

**Why.**
- CV Genius (vendor, 625 UK hiring managers, April-May 2024): 80% distrust AI-generated content
  [Q9]; 74% say they can detect it and 57% are less likely to hire [Q10].
- TopResume (vendor, 600 US hiring managers): 19.6% would reject a candidate for using generative AI
  on a resume or cover letter; 33.5% say they spot one in 20 seconds or less [Q8].
- CV Genius counsellor: "If nothing is written in your own words, should I really take your
  commitment to the job seriously?" [Q9].
- Stated intent overstates real behaviour in surveys (compare KB F1).

### AI5 `ai-detectors-misfire-non-native`: Don't write to beat AI detectors; they misfire on non-native English
**Evidence: study**

**Tip.** Don't run the CV through AI detectors or "humanizer" rewriters. Make it read as the user's
through content: specific, checkable details (AI2).

**Why.**
- Seven GPT detectors flagged TOEFL essays by non-native writers as AI with an average false
  positive rate of 61.22%; 97.8% were flagged by at least one detector. Native US essays were
  classified almost perfectly [Q15]. This applies to Hebrew speakers writing English CVs.
- Resume Now (vendor): 78% of employers say they check applications for signs of automation [Q11].
- Metaview, an AI screening vendor, says its fraud checks target identity and automated
  submissions, and nothing it publishes says it catches hidden text [Q7].

### AI6 `no-hidden-text`: Never hide text or instructions in the CV
**Evidence: study**

**Tip.** No white text, tiny fonts, off-page text or "ignore previous instructions" lines. If the
user asks for this, decline and explain.

**Why.**
- In about 200,000 real resumes from hireEZ, about 1% carried hidden prompt injections [Q4]. The
  rate rose sevenfold between July 2024 and November 2025 [Q5].
- Indeed's tests (10 injections, 5 models, 1,200 runs): o4-mini was fooled 0.8% of the time with no
  guardrails; with the best guardrail, four of five models were fooled 0% of the time [Q6].
- Indeed's authors place hidden attacks "at an extreme end of the spectrum alongside deliberate
  misrepresentations and falsified credentials" [Q6].

### AI7 `hidden-keywords-are-injection`: A hidden keyword list is injection too
**Evidence: study**

**Tip.** Every skill must be visible and shown in use (KB B1, B8). A hidden skills list is the
common form of injection, not a milder trick.

**Why.**
- Over 90% of injections found in real resumes used no explicit instructions [Q4].
- Metaview calls the typical case "a concealed skill list" [Q7].
- In every real case Indeed found, job seekers "used very small font with white text color to hide
  the attack from human recruiters" [Q6].
- Indeed: "an ethical line is crossed when the instructions are hidden from human reviewers" [Q6].

### AI8 `volume-favours-tailored`: Application volume is up; send fewer, tailored CVs
**Evidence: practitioner**

**Tip.** Tailor each CV to one posting, with the matching requirements where a skim lands
(KB B9, D3). A generic CV sent widely lands in the biggest pile with the least to set it apart.

**Why.**
- LinkedIn: 11,000 applications per minute, up 45% in a year [Q12, Q13].
- A typical corporate posting gets about 250 applications [Q12]; one remote role drew 1,200 in days
  [Q14].
- 45% of applicants use AI to complete applications (Canva survey, via [Q13]).
- ChatGPT can produce resumes full of job-description keywords in minutes, which makes qualified
  candidates harder to spot [Q14].

### AI9 `write-for-ai-and-human`: Write for an AI first reader and a human decider
**Evidence: convention**

**Tip.** Plain text, standard headings, the posting's terms used truthfully. The ATS rules
(KB B1-B9) serve LLM screeners and human readers alike.

**Why.**
- The EU AI Act lists AI used "to analyse and filter job applications, and to evaluate candidates"
  as high-risk [Q21].
- NYC Local Law 144 (enforced from 5 July 2023) requires a bias audit and candidate notice before
  automated employment decision tools are used [Q22].
- In an experiment with 528 people, humans followed a racially biased AI's picks up to 90% of the
  time [Q19]. The machine's read carries into the human decision.
- Vendors differ: Greenhouse says its AI does not score or rank applications (KB B8, [S4]).

### AI10 `optional-details-are-proxies`: Personal extras act as demographic proxies; include them only when relevant
**Evidence: study**

**Tip.** List spoken languages and hobbies when the role uses them, not as filler (see also KB E5).
Removing the name does not anonymise a CV.

**Why.**
- Tan et al. (4,100 resume variants, 18 LLMs, EMNLP 2026): language markers alone let models infer
  ethnicity; hobbies and extracurriculars signalled gender; models favoured "Chinese and Caucasian
  males" [Q16].
- Asking the model for a rationale "may paradoxically amplify bias" [Q16].
- GPT-3.5 generated resumes with "immigrant markers, such as non-native English and non-U.S.
  education" for Asian and Hispanic names [Q18].

### AI11 `dont-game-model-bias`: Bias findings differ by model and year; don't write for a guessed bias
**Evidence: study**

**Tip.** Don't reshape the CV around what one model is said to prefer. Keep it truthful and
job-relevant; the screener's model and its biases are unknown to the applicant.

**Why.**
- Gao, Jiang & Yan (14 LLMs, 24,024 paired postings each): the 2023 model showed a +2.12 pp
  pro-White callback gap; all models from 2024 on were neutral or reversed, up to -3.01 pp [Q17].
- Embedding-based screeners favoured White-associated names in 85.1% of tests (KB, [S25]).
- Self-preference (AI3) also depends on which model the employer runs [Q1].

### AI12 `verifiable-facts-only`: The AI rewords; it never adds a fact
**Evidence: practitioner**

**Tip.** Never add a tool, number, title or result the user did not give. Ask for the number; if
there is none, stay qualitative (KB A3). Every line must survive an interview question.

**Why.**
- Anthropic marks AI-written answers about experiences the candidate has not had as "not allowed"
  [Q20].
- Indeed's authors put hidden CV attacks in the same group as "deliberate misrepresentations and
  falsified credentials" [Q6].
- Korn Ferry experts warn that by 2028 one in four candidates could be fake, and employers are
  training staff to spot fraud [Q12].

### AI13 `ai-maps-experience-to-jd`: Use AI to match the user's real experience to the posting
**Evidence: practitioner**

**Tip.** Have the AI compare the posting with what the user has done, then pick and order the
matching items (KB C1). Tailoring is selection from true material, not invention.

**Why.**
- Anthropic suggests applicants ask Claude to "identify the experiences I should highlight in my
  application responses that align most with the job requirements" [Q20].
- Customised applications were valued when customisation was costly [Q3]; specific, true matches
  are what still differ between candidates (AI2).
- Resume Now (vendor): 62% expect uncustomised AI resumes to be rejected [Q11].

## Sources
- Q1 · study (preprint; non-archival at EAAMO and AIES 2025) · Jiannan Xu, Gujie Li, Jane Yi Jiang · AI Self-preferencing in Algorithmic Hiring: Empirical Evidence and Insights · 2025 · https://arxiv.org/abs/2509.00462
- Q2 · news · The Register · Biased bots: AI hiring managers shortlist candidates with AI resumes · 2025 · https://www.theregister.com/2025/09/03/ai_hiring_biased/
- Q3 · study (working paper) · Anais Galdin, Jesse Silbert · Making Talk Cheap: Generative AI and Labor Market Signaling · 2025 · https://arxiv.org/abs/2511.08785
- Q4 · study (USENIX Security 2026) · Mohan Zhang, Yuqi Jia, Zhen Tan, Steven Jiang, Neil Zhenqiang Gong, Tianlong Chen, Dawn Song · Measuring Real-World Prompt Injection Attacks in LLM-based Resume Screening · 2026 · https://arxiv.org/abs/2605.28999
- Q5 · news (university) · Duke Pratt School of Engineering · Thwarting Hidden Resume Hacks Targeting AI Hiring Tools · n.d. · https://pratt.duke.edu/news/thwarting-prompt-injection/
- Q6 · study (RecSys in HR '25 workshop) · Arda Akdemir, Joshua H. Levy (Indeed) · Understanding and Defending Against Resume-Based Prompt Injections in HR AI · 2025 · https://ceur-ws.org/Vol-4046/RecSysHR2025-paper_9.pdf
- Q7 · practitioner (vendor blog) · Metaview, Stephanie Tsimis · Resume prompt injection · 2026 · https://www.metaview.ai/resources/blog/resume-prompt-injection
- Q8 · survey (vendor: TopResume, 600 US hiring managers) · IEEE-USA InSight · What Tech Hiring Managers Really Think of AI-Created Resumes and Cover Letters · 2025 · https://insight.ieeeusa.org/articles/what-tech-hiring-managers-really-think-of-ai-created-resumes-and-cover-letters/
- Q9 · survey (vendor: CV Genius, 625 UK hiring managers) · DIGIT · 80% of hiring managers critical of AI-generated content · 2024 · https://www.digit.fyi/80-of-hiring-managers-critical-of-ai-generated-content/
- Q10 · survey (vendor: CV Genius, 625 hiring managers) · Black Enterprise · Hiring managers reject AI-generated job applications · n.d. · https://www.blackenterprise.com/hiring-managers-reject-ai-generated-job-applications/amp/
- Q11 · survey (vendor: Resume Now, 925 US HR professionals) · Outsource Accelerator · Employers reject AI-generated resumes · 2025 · https://news.outsourceaccelerator.com/employers-reject-ai-generated-resumes/
- Q12 · practitioner · Korn Ferry · The Application Avalanche · 2025 · https://www.kornferry.com/insights/this-week-in-leadership/the-application-avalanche
- Q13 · news · eWeek · Job Seekers – Some Using AI – Flood LinkedIn With 11,000 Applications a Minute · 2025 · https://www.eweek.com/news/ai-job-applications-linkedin/
- Q14 · news · Semafor · Recruiters swamped with AI-generated job applications · 2025 · https://www.semafor.com/article/06/24/2025/recruiters-swamped-with-ai-generated-job-applications
- Q15 · study (Patterns) · Weixin Liang, Mert Yuksekgonul, Yining Mao, Eric Wu, James Zou · GPT detectors are biased against non-native English writers · 2023 · https://arxiv.org/abs/2304.02819
- Q16 · study (EMNLP 2026) · Bryan Chen Zhengyu Tan, Shaun Khoo, Bich Ngoc Doan, Zhengyuan Liu, Nancy F. Chen, Roy Ka-Wei Lee · Small Changes, Big Impact: Demographic Bias in LLM-Based Hiring Through Subtle Sociocultural Markers · 2026 · https://arxiv.org/abs/2603.05189
- Q17 · study (preprint) · Zhenyu Gao, Wenxi Jiang, Yutong Yan · Can LLMs Hire Fairly? Racial Bias in Resume Screening · 2026 · https://arxiv.org/abs/2606.28978
- Q18 · study (preprint) · Lena Armstrong, Abbey Liu, Stephen MacNeil, Danaë Metaxa · The Silicon Ceiling: Auditing GPT's Race and Gender Biases in Hiring · 2024 · https://arxiv.org/abs/2405.04412
- Q19 · study (AIES 2025) · Kyra Wilson, Mattea Sim, Anna-Maria Gueorguieva, Aylin Caliskan · No Thoughts Just AI: Biased LLM Hiring Recommendations Alter Human Decision Making · 2025 · https://arxiv.org/abs/2509.04404
- Q20 · practitioner (employer guidance) · Anthropic · Guidance on candidates' AI usage · n.d. · https://www.anthropic.com/candidate-ai-guidance
- Q21 · convention (law) · EU AI Act · Annex III: High-risk AI systems, point 4 (employment) · 2024 · https://artificialintelligenceact.eu/annex/3/
- Q22 · convention (law) · NYC Department of Consumer and Worker Protection · Automated Employment Decision Tools (Local Law 144) · n.d. · https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page
- Q23 · survey (vendor: TopResume, 600 US hiring managers) · U.S. Chamber of Commerce CO— · Hiring and AI job applications · n.d. · https://www.uschamber.com/co/run/human-resources/hiring-ai-job-applications
