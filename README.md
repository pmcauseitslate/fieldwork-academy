# Fieldwork Academy

[Open the academy](https://pmcauseitslate.github.io/fieldwork-academy/) · [Worked examples](https://pmcauseitslate.github.io/fieldwork-academy/#/examples) · [Startup career paths](https://pmcauseitslate.github.io/fieldwork-academy/#/careers)

**The AI Builder’s Field Guide** is a free, 24-week course for students starting without a programming background. Practical assignments develop a customer-support toolkit into an evaluated AI workflow. The final project presents the work as a hiring portfolio or a founder pilot. The suggested commitment is 8–10 hours a week, including outside study and project work.

| Weeks | Area | Portfolio evidence |
| --- | --- | --- |
| 1–6 | Python and Git | A tested operations toolkit, a reproducible bug report, and a repository another person can run |
| 7–10 | SQL and APIs | An integration that handles repeated events and failed requests, with a query that verifies the outcome |
| 11–14 | Application development | An accessible intake form, a service, a usable dashboard, and a release walkthrough |
| 15–18 | Applied AI | A grounded assistant, model comparison, test cases, scoring rules, and a human-review decision |
| 19–20 | Product and engineering | A product brief, acceptance criteria, release checks, and a monitoring plan |
| 21–24 | Startup development | Customer discovery, a narrow MVP, pilot economics, and an evidence-backed case study or pitch |

## Learning and assessment

Each week follows the same learning sequence. The lesson revisits a skill from the preceding project, defines new terms, and walks through a separate example. Learners can change inputs and compare predictions with results. Python and SQL examples run in the browser, HTML examples open as interactive previews, and decision-making exercises use worked case records. Optional reading, videos, and the previous project remain available on the lesson page.

Week 1 introduces a support-workload calculator with four runtime checks and three student-chosen queues. Weeks 2–24 include a different independent task, field-level feedback, and a weekly portfolio assignment. Coding projects provide an editable starter, checks where applicable, and a code download. The quiz opens after the lab, independent work and saved project review. Written evidence and decision quality are self-reviewed. Existing completed weeks and active quiz attempts keep their credit and deadlines.

The weekly assessment has five graded scenario questions. Starting an attempt starts a ten-minute timer. Extended allowances of 20 and 100 minutes are available before starting. A refresh retains the paper, saved answers, and deadline. At expiry, the academy grades the recorded answers; a blank earns zero points. On returning to a closed page, the expired attempt is settled before it can accept further answers. The results show answer explanations and references for missed topics. Retakes draw a fresh paper and retain the highest score.

A passing score of at least 80%, a passed lab, and a self-reviewed project with written evidence complete a week. Weeks 1, 2, and 7 also require the student’s code to pass all runtime tests. Subsequent weeks unlock in order. Each completed week earns 100 XP. The journal offers seven badges, backup and restore, and a Markdown portfolio as completed projects accumulate.

## Free access and local progress

The academy requires no login, payment details, or paid API key. The original Week 1 and Week 2 graded Python labs and Week 7 SQL lab use bundled runtimes. For the additional Python workshops the first run loads a pinned, free Python interpreter over the internet. Python then processes the exercise files in the browser. SQL projects use bundled SQLite, and HTML previews run in an isolated frame. [Pyodide runtime](https://pyodide.org/en/0.27.7/usage/quickstart.html) Downloadable fictional records and simulated model responses support the core assignments. YouTube videos load on request; the library describes any external provider’s enrollment or access requirements.

The learning path, project journal, timed attempts and code drafts are saved in the browser. A journal backup can move them between devices. Students returning from the earlier edition keep their completed-week credit and earlier project and editor records. Unfinished weeks use the current assessments.

## Hiring and founder research

The [career guide](https://pmcauseitslate.github.io/fieldwork-academy/#/careers) connects skills, observable hiring evidence, and course projects. Its eight employer-written role descriptions cover customer implementation, technical support, AI evaluation and solutions engineering. Each role section identifies the experience described in its sources. The founder pathway uses Y Combinator’s teaching on customer discovery and MVPs. These examples were reviewed on November 23, 2026.

- Whippy’s implementation role describes a route with 0–1 years of experience and emphasizes onboarding, configuration and training. [Whippy role description](https://jobs.ashbyhq.com/whippy/5dbb50c3-9ca1-4483-b9d9-dc083b911f1b)
- Regal’s support role connects customer communication with investigating integrations and documenting what went wrong. [Regal role description](https://jobs.lever.co/regal.ai/eae86626-8221-4291-ab57-e29f35b94ab9)
- Glean’s analyst role illustrates a more experienced path using scoring rubrics, SQL, human evaluation, and error analysis. [Glean role description](https://job-boards.greenhouse.io/gleanwork/jobs/4739203005)

The library contains 55 study resources, including 10 videos, plus three field notes linked to the original posts by Andrej Karpathy, Ethan Mollick and Simon Willison. It retains all original roadmap resource URLs.

## Running and publishing

Serve the repository root with a static web server, for example:

```sh
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000/). GitHub Pages publishes the root of the main branch. The course uses project-relative assets and requires no build step.

Run the assessment and curriculum regression checks with `node --test tests/*.test.cjs`.

The core syllabus lives in `course.js`. The three `workshops-*.js` files contain the weekly bridges, guided examples, starter programs and independent cases for Weeks 2–24. The site keeps graded labs and downloadable file mappings in `labs.js`, study resources in `resources.js`, and employer research in `career.js`. `assessment.js` builds the timed quizzes. `practice.js` and `practice-worker.js` run the code exercises. See the [runtime credits](vendor/README.md) and the [font licenses](assets/).
