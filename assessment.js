// A paper is reproducible from its seed, so a refresh or journal restore retains
// the same prompts, option order and deadline.
(() => {
  'use strict';

  const QUESTION_COUNT = 5;
  const PASS_PERCENT = 80;
  const durations = [10, 20, 100];
  const onboarding = [
    {
      prompt:
        'A command-line program receives the text "12" for a ticket count. Which step allows it to calculate a workload?',
      correct: 1,
      options: [
        {
          text: 'Attach the word tickets to the value.',
          feedback: 'A display label still leaves the program with text.',
        },
        {
          text: 'Convert it to a number and check that the count is valid.',
          feedback:
            'The calculation needs a numeric count in its accepted range.',
        },
        {
          text: 'Print the text twice and compare the outputs.',
          feedback:
            'Printing checks the display. It does not convert the data type.',
        },
      ],
    },
    {
      prompt:
        'An estimate is needed in both a web form and a weekly report. Which design makes it easy to check the same calculation in both places?',
      correct: 2,
      options: [
        {
          text: 'Keep separate copies of the calculation in each display.',
          feedback:
            'A change in one copy can leave the report and the form disagreeing.',
        },
        {
          text: 'Put the estimate inside the function that prints the report title.',
          feedback:
            'The web form would then depend on how the report is presented.',
        },
        {
          text: 'Use one function that accepts numeric inputs and returns the calculated value.',
          feedback:
            'The function can be tested in isolation and reused by both displays.',
        },
      ],
    },
    {
      prompt:
        'A script reports 600 hours for 40 requests that each take 15 minutes. Which test best locates the mistake?',
      correct: 0,
      options: [
        {
          text: 'Trace the units: 40 × 15 is 600 minutes, and 600 ÷ 60 is 10 hours.',
          feedback:
            'Following the units identifies the missing conversion and a known expected result.',
        },
        {
          text: 'Try the script twice and confirm that both results match.',
          feedback: 'A repeatable result can still have the wrong unit.',
        },
        {
          text: 'Round the displayed result to the nearest whole number.',
          feedback: 'Rounding changes the display precision, not the unit.',
        },
      ],
    },
  ];

  function randomStream(seed) {
    let state = seed >>> 0;
    return () => {
      state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
      return state / 4294967296;
    };
  }
  function shuffle(items, random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function paper(lessons, week, attempt) {
    const random = randomStream(attempt.seed);
    const current = lessons[week - 1].questions.map((q) => ({ q, week }));
    const start = (attempt.sequence - 1) % current.length;
    const currentCount = week === 1 ? 4 : 3;
    const items = Array.from(
      { length: currentCount },
      (_, i) => current[(start + i) % current.length],
    );
    const sample = (pool) => pool[Math.floor(random() * pool.length)];
    if (week === 1) {
      items.push({
        q: onboarding[(attempt.sequence - 1) % onboarding.length],
        week: 1,
      });
    } else {
      const previous = lessons[week - 2].questions.map((q) => ({
        q,
        week: week - 1,
      }));
      const recent = sample(previous);
      const older = lessons
        .slice(0, week - 2)
        .flatMap((l) => l.questions.map((q) => ({ q, week: l.week })));
      items.push(
        recent,
        sample(
          older.length ? older : previous.filter((item) => item !== recent),
        ),
      );
    }
    return shuffle(items, random).map(({ q, week: sourceWeek }) => {
      const indices = shuffle(
        q.options.map((_, i) => i),
        random,
      );
      return {
        ...q,
        sourceWeek,
        correct: indices.indexOf(q.correct),
        options: indices.map((i) => q.options[i]),
      };
    });
  }
  function create(minutes, sequence, now = Date.now()) {
    if (!durations.includes(minutes))
      throw new Error('Unsupported quiz duration');
    const seed = crypto.getRandomValues(new Uint32Array(1))[0];
    return {
      seed,
      sequence,
      started: now,
      deadline: now + minutes * 60000,
      answers: Array(QUESTION_COUNT).fill(null),
    };
  }
  function restore(value) {
    if (
      !value ||
      !Number.isSafeInteger(value.seed) ||
      value.seed < 0 ||
      value.seed > 4294967295 ||
      !Number.isSafeInteger(value.sequence) ||
      value.sequence < 1 ||
      !Number.isSafeInteger(value.started) ||
      !Number.isSafeInteger(value.deadline) ||
      !durations.includes((value.deadline - value.started) / 60000) ||
      !Array.isArray(value.answers) ||
      value.answers.length !== QUESTION_COUNT
    )
      return null;
    const a = {
      seed: value.seed,
      sequence: value.sequence,
      started: value.started,
      deadline: value.deadline,
      answers: value.answers.map((n) =>
        Number.isInteger(n) && n >= 0 && n <= 2 ? n : null,
      ),
    };
    if (
      Number.isSafeInteger(value.ended) &&
      value.ended >= a.started &&
      value.ended <= a.deadline
    ) {
      a.ended = value.ended;
      a.expired = value.expired === true;
    }
    return a;
  }
  function result(questions, attempt) {
    const correct = questions.reduce(
      (n, q, i) => n + (q.correct === attempt.answers[i] ? 1 : 0),
      0,
    );
    return {
      correct,
      score: Math.round((100 * correct) / questions.length),
      total: questions.length,
    };
  }
  window.FIELD_ASSESSMENT = {
    paper,
    create,
    restore,
    result,
    durations,
    PASS_PERCENT,
    QUESTION_COUNT,
  };
})();
