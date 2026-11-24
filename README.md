# Fieldwork Academy

[Start the free course](https://pmcauseitslate.github.io/fieldwork-academy/)

**The AI Builder’s Field Guide** is a 24-week, self-paced course in applied AI, software development and technology entrepreneurship. Build a construction-tech portfolio project, Fieldwork AI, starting with a labor calculator and finishing with a measured MVP demonstration. Plan for 8–10 hours each week, including outside study and project time.

| Weeks | Level | What you build |
| --- | --- | --- |
| 1–6 | Programming foundations | A tested Python project-management toolkit |
| 7–10 | Databases and APIs | A reporting database with a repeatable import |
| 11–14 | Application development | A usable application with a documented release |
| 15–18 | Applied AI and automation | A grounded document workflow with human review |
| 19–20 | Engineering and product | A product brief, tested release plan and architecture walkthrough |
| 21–24 | Technology entrepreneurship | An MVP, evidence from user testing and a final demonstration |

## Learning and assessment

Each week has a lesson, worked example, skill lab, five-question assessment and project. Later quizzes revisit earlier material. Pass the lab, score at least 80% on the quiz, and record and self-review project evidence to unlock the following week. Every completed week earns 100 XP. There are seven achievement badges. After Week 24, the field journal can produce a Markdown portfolio of the learner’s project evidence.

The Week 1 and Week 2 Python exercises and the Week 7 SQL exercise run real code in a browser worker using locally bundled open-source engines. The other weeks use tasks such as tracing calculations, finding invalid inputs, ordering workflow steps, and selecting evidence. Optional downloadable starter files contain fictional project records, test cases and sample model outputs.

## Free access and progress

The website, grading and practice editors require no account, payment information or API key. Videos load from YouTube on request. The library includes direct links to the original courses and notes the provider’s access requirements. Some providers offer optional paid certificates or cloud services. Every required project has a free path through local tools, supplied examples or simulated integrations.

Progress, code drafts and project notes stay in the learner’s browser. The Achievements page supports downloading and restoring a journal backup. The course provides personal learning milestones with automatic feedback on fixed-answer tasks and a self-review checklist for projects.

## Sources

The resource library preserves the original roadmap’s 31 distinct learning and setup links. Across 17 Exa searches, 85 candidate results surfaced (83 distinct URLs). Official course pages, YouTube embed metadata and original posts on X were checked on November 23, 2026. The 47 study resources include 10 videos. Three additional field notes explain how to apply practitioners’ recommendations to the course project.

- Learn how a model is trained, then test how it behaves when a fact is missing. [Andrej Karpathy’s LLM walkthrough](https://x.com/karpathy/status/1887211193099825254)
- Increase a task’s difficulty gradually and note when it needs human judgment. [Ethan Mollick on exploring model capabilities](https://x.com/emollick/status/2114503849826549842)
- Compare prompt or model changes against the same small, repeatable evaluation suite. [Simon Willison on small evaluations](https://x.com/simonw/status/2083310510729216039)

## Running and publishing

The site uses static HTML, CSS and JavaScript with project-relative asset paths. From the repository directory, run:

```sh
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000/). GitHub Pages serves the root of the main branch. Pushing an update to that branch triggers a new deployment.

Edit `course.js` for lessons and weekly projects, `labs.js` for graded labs and downloads, and `resources.js` for courses, videos and practitioner recommendations. `practice.js` and `practice-worker.js` implement the optional coding editors. See [runtime credits](vendor/README.md) and [font licenses](assets/) for third-party software and typefaces.
