// Employer-written role descriptions and founder lessons reviewed on November 23, 2026.
(() => {
  'use strict';

  const source = (label, url, note) => ({ label, url, note });
  const whippy = source(
    'Whippy · Implementation Specialist',
    'https://jobs.ashbyhq.com/whippy/5dbb50c3-9ca1-4483-b9d9-dc083b911f1b',
    'Early career, 0–1 years. Whippy values technical study or evidence of building or running something. The role includes configuring software, training customers, and measuring adoption.',
  );
  const distill = source(
    'Distill · Implementation Specialist',
    'https://jobs.ashbyhq.com/distill/e909f05b-e2e8-42ea-91ba-514a5c41a038',
    'Distill’s first implementation specialist takes a customer from kickoff to launch and translates feedback for the founders. The posting asks for prior SaaS onboarding experience.',
  );
  const regal = source(
    'Regal · Technical Support Specialist',
    'https://jobs.lever.co/regal.ai/eae86626-8221-4291-ab57-e29f35b94ab9',
    'Regal specifies 0–1 years of technical support experience or an internship, or a recent technical degree. Its list of relevant areas includes SQL, APIs, SaaS, and basic programming.',
  );
  const certus = source(
    'Certus AI · Technical Success Associate',
    'https://www.certus-ai.com/careers/technical-success-associate',
    'The associate investigates call and integration problems, documents resolutions, and turns repeated requests into playbooks. Certus asks for prior technical experience and proficiency in areas such as APIs or scripting.',
  );
  const leiolai = source(
    'Leiolai · Evaluation Data Specialist',
    'https://leiolai.com/careers/evaluation-data-specialist/',
    'The role involves writing rubrics, validating facts, documenting ambiguous cases, and improving reviewer instructions. Relevant domain, research-support, or quality-review experience can transfer.',
  );
  const glean = source(
    'Glean · AI Data Analyst',
    'https://job-boards.greenhouse.io/gleanwork/jobs/4739203005',
    'This established AI company provides a comparison with smaller teams. Its posting specifies 3–5 years of related experience and describes human grading, benchmark maintenance, failure analysis, and basic SQL.',
  );
  const rippletide = source(
    'Rippletide · Founding Solutions Engineer',
    'https://www.rippletide.com/company/careers/founding-solutions-engineer',
    'Rippletide specifies at least three years in customer-facing technical work. Its responsibilities include integrating APIs, writing sample applications, and leading technical demonstrations.',
  );
  const coval = source(
    'Coval · Solutions Engineer',
    'https://www.ycombinator.com/companies/coval/jobs/tZSJGPI-solutions-engineer',
    'Coval’s employer-written YC listing describes an experienced role that scopes pilots, designs scenarios and metrics, and explains evaluation results to customers.',
  );
  const ycInterview = source(
    'Y Combinator · How to Talk to Users',
    'https://www.youtube.com/watch?v=z1iF1c8w5Lg',
    'Startup School demonstrates interviews about a specific past problem and the workaround a customer already uses.',
  );
  const ycMvp = source(
    'Y Combinator · How to Build an MVP',
    'https://www.youtube.com/watch?v=QRZ_l7cVzzU',
    'Startup School explains how to narrow a first release and learn from early users.',
  );

  window.CAREER_GUIDE = {
    asOf: 'November 23, 2026',
    scope: 'Eight employer-written descriptions illustrate the work and experience these teams request. The sample includes early-stage companies and one established AI employer. Openings and requirements can change. Portfolio assignments are academy exercises based on the work described.',
    roles: [
      {
        title: 'Customer implementation & onboarding',
        stage: 'Early-career route',
        focus: 'Turn a customer’s workflow into a launch plan and stay with the team through its first measurable outcome. Whippy lists a 0–1 year route. Distill expects prior experience running software implementations.',
        skills: [
          'Map the current workflow, its owner, and the baseline for a successful launch.',
          'Configure and test one integration using sample customer data.',
          'Teach a teammate the workflow, collect feedback, and measure first use.',
        ],
        evidence: 'A kickoff brief, a tested configuration, and a one-page training guide. A reviewer should be able to complete one task unaided and see how adoption will be measured.',
        weeks: [9, 12, 14, 19, 21, 22],
        sources: [whippy, distill],
      },
      {
        title: 'Technical support & customer success',
        stage: 'Entry and next-step roles',
        focus: 'Investigate a reported problem, explain its impact to the customer, and give engineering a reproducible case. Regal describes an early-career support role. Certus expects technical experience in its associate role.',
        skills: [
          'Read an HTTP response, query the relevant records, and narrow the cause.',
          'Record expected and observed behavior with a minimal fictional input.',
          'Write a customer update and a separate engineering handoff with a next action.',
        ],
        evidence: 'A support case showing a failed request, a corrected result, and a regression test. Include a customer-facing explanation and a technical issue another teammate could reproduce.',
        weeks: [3, 4, 7, 9, 10, 14, 20],
        sources: [regal, certus],
      },
      {
        title: 'AI evaluation & quality operations',
        stage: 'Quality and operations pathway',
        focus: 'Turn an ambiguous complaint about an AI answer into evidence a team can act on. Leiolai accepts experience in related quality or specialist work. Glean’s analyst example calls for 3–5 years of related experience.',
        skills: [
          'Write a scoring rule with concrete examples for a pass, a failure, and a borderline case.',
          'Check retrieved evidence and distinguish a missing source from an unsupported answer.',
          'Compare two versions on held-out cases, inspect grader disagreement, and recommend a release decision.',
        ],
        evidence: 'A labeled evaluation set, a scoring guide, and a before-and-after error report. Include one disagreement between reviewers, the evidence that resolved it, and a recommendation tied to a failure threshold.',
        weeks: [7, 13, 15, 16, 17, 18, 20],
        sources: [leiolai, glean],
      },
      {
        title: 'Solutions engineering',
        stage: 'Experienced stretch role',
        focus: 'Build a technical proof of concept and defend its design with evidence. Rippletide asks for 3+ years of customer-facing technical experience. Coval also describes a senior bar for pilots and integrations.',
        skills: [
          'Translate discovery notes into a technical requirement and an acceptance test.',
          'Connect an API to a small application, document its failure behavior, and prepare a repeatable demo.',
          'Present the same pilot to an engineer and a decision-maker, covering reliability, cost, and tradeoffs.',
        ],
        evidence: 'A runnable integration, architecture diagram, and recorded pilot demo. Show one failure and recovery, measured results, and the question that must be resolved before a larger rollout.',
        weeks: [10, 12, 14, 17, 18, 20, 24],
        sources: [rippletide, coval],
      },
    ],
    founder: {
      title: 'Founder or early startup operator',
      stage: 'Founder pathway',
      focus: 'Find a repeated problem that someone already spends time or money solving. Test whether a narrowly scoped product helps that person complete one real job.',
      skills: [
        'Interview users about the last occurrence, its cost, and the workaround they used.',
        'Choose one outcome for a small pilot and measure it against the existing workflow.',
        'Estimate operating costs, test willingness to pay, and decide whether to continue.',
      ],
      evidence: 'A short pitch supported by interview notes, a working demo, and an honest pilot readout. Label rehearsals and synthetic tests clearly. Name the decision that real customer evidence would change.',
      weeks: [19, 21, 22, 23, 24],
      sources: [ycInterview, ycMvp],
    },
    sources: [whippy, distill, regal, certus, leiolai, glean, rippletide, coval, ycInterview, ycMvp],
  };
})();
