(() => {
  const workerUrl = new URL('./practice-worker.js', document.currentScript.src);
  workerUrl.search = new URL(document.currentScript.src).search;
  const exercises = {
    1: {
      language: 'Python',
      label: 'Estimate support workload',
      instructions:
        'Complete workload_hours(tickets, minutes_each). Return the staff-hours needed to handle that many tickets. For 10 tickets at 12 minutes each, return 2. The grader also tests fractional durations and empty queues.',
      starter:
        'def workload_hours(tickets, minutes_each):\n    # Calculate the batch duration in hours.\n    return 0\n',
      reference: {
        title: 'Convert a batch of lab sessions into staff-days',
        steps: [
          'Name the inputs: number of sessions and staff-hours per session. Keep the calculation independent of screen input.',
          'Multiply to find total hours. Divide by eight working hours per staff-day and return the result.',
          'Run a small hand-checked case, a fraction, and a zero case before reusing the method.',
        ],
        artifact:
          'def session_days(sessions, hours_each):\n    total_hours = sessions * hours_each\n    return total_hours / 8\n\nassert session_days(4, 3) == 1.5\nassert session_days(0, 3) == 0',
        check:
          'Four sessions at three hours each require 12 hours, or 1.5 eight-hour days. In the assessed task the requested output unit is hours.',
      },
    },
    2: {
      language: 'Python',
      label: 'Check a usage budget',
      instructions:
        'Complete budget_status(costs, budget). The costs list contains usage charges in dollars. Return "over" when their sum exceeds the budget and "within" otherwise. For [600, 240, 160] and a budget of 1000, return "within".',
      starter:
        'def budget_status(costs, budget):\n    # Add all usage charges and compare the total with the budget.\n    return ""\n',
      reference: {
        title: 'Check whether a pilot reached its interview target',
        steps: [
          'Represent each day’s count as one list element and add the observations.',
          'The stated rule counts equality as reaching the target. Put that boundary into the comparison.',
          'Check below-target, exact-target, and empty-list cases and write the expected labels by hand.',
        ],
        artifact:
          'def interview_result(daily_counts, target):\n    interviews = sum(daily_counts)\n    if interviews >= target:\n        return "met"\n    return "pending"\n\nassert interview_result([2, 3], 5) == "met"\nassert interview_result([], 3) == "pending"',
        check:
          'Five completed interviews meet a target of five. Read the separate budget rule carefully to decide whether equality counts as over.',
      },
    },
    7: {
      language: 'SQL',
      label: 'List open tickets by account',
      instructions:
        'Return the ticket ID and account name for every open ticket, ordered by ticket ID from smallest to largest. Join tickets.account_id to accounts.id. Each test uses fresh records.',
      schema:
        'accounts(id, name)\n  10 | Orbit\n  20 | Nova\n\ntickets(id, account_id, status)\n  101 | 20 | open\n  102 | 10 | closed\n  103 | 10 | open\n\nExpected rows\n  101 | Nova\n  103 | Orbit',
      starter:
        'SELECT tickets.id, accounts.name\nFROM tickets\nJOIN accounts ON accounts.id = tickets.account_id\n-- Add the required filter and row order.\n;',
      reference: {
        title: 'Join published articles to their knowledge collections',
        steps: [
          'Start with articles, whose collection_id points to a row in collections.',
          'Join on that relationship and retain articles marked published.',
          'Select the collection label and article title, then sort by article title for a predictable report.',
        ],
        artifact:
          "SELECT collections.label, articles.title\nFROM articles\nJOIN collections ON articles.collection_id = collections.id\nWHERE articles.state = 'published'\nORDER BY articles.title;\n\n-- collections: (8, 'Help')\n-- articles: ('Setup', 8, 'published'), ('Draft FAQ', 8, 'draft')\n-- Expected: ('Help', 'Setup')",
        check:
          'The draft article is excluded. A second published article titled Access must sort before Setup. The ticket exercise requires its own table names, fields, and ordering column.',
      },
    },
  };

  function practiceDraftKey(week) {
    const edition = Number(week) === 2 ? 1 : 2;
    return `fieldwork.practice.v${edition}.${week}`;
  }

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function mountPractice(container, week, onPass) {
    const exercise = exercises[week];
    if (!container || !exercise) return;
    const section = element('section', '', 'code-practice');
    const heading = element('h3', exercise.label);
    const requirement = element('div', 'Required coding task', 'eyebrow');
    const instructions = element('p', exercise.instructions);
    section.append(requirement, heading, instructions);
    if (exercise.schema) {
      const details = element('details');
      details.append(
        element('summary', 'View the sample tables and expected rows'),
        element('pre', exercise.schema),
      );
      section.append(details);
    }

    const example = exercise.reference;
    const reference = element('details', '', 'worked');
    const steps = element('ol');
    for (const step of example.steps) steps.append(element('li', step));
    const sample = element('pre', '', 'stimulus');
    sample.append(element('code', example.artifact));
    reference.append(
      element('summary', 'Worked coding example'),
      element('h4', example.title),
      steps,
      sample,
      element('p', example.check),
    );
    section.append(reference);

    const label = element('label', `${exercise.language} editor`);
    const editor = element('textarea', '', 'code-editor');
    editor.id = `practice-editor-${week}`;
    label.htmlFor = editor.id;
    editor.maxLength = 20000;
    editor.spellcheck = false;
    editor.setAttribute('autocapitalize', 'off');
    editor.rows = exercise.language === 'SQL' ? 8 : 6;
    const storageKey = practiceDraftKey(week);
    editor.value = exercise.starter;
    try {
      editor.value = localStorage.getItem(storageKey) ?? exercise.starter;
      const previousKey = `fieldwork.practice.v1.${week}`;
      const earlier =
        previousKey === storageKey ? null : localStorage.getItem(previousKey);
      if (earlier !== null) {
        const archive = element('details', '', 'hint');
        archive.append(
          element('summary', 'Earlier edition draft'),
          element('pre', earlier, 'stimulus'),
        );
        section.append(archive);
      }
    } catch {
      /* Storage may be disabled. */
    }
    editor.addEventListener('input', () => {
      try {
        localStorage.setItem(storageKey, editor.value);
      } catch {
        /* The editor still runs in memory. */
      }
    });
    const run = element('button', 'Run tests', 'button btn-secondary');
    run.type = 'button';
    const output = element('div', '', 'practice-output');
    output.setAttribute('aria-live', 'polite');
    output.setAttribute('aria-atomic', 'true');
    section.append(label, editor, run, output);
    container.replaceChildren(section);

    run.addEventListener('click', () => {
      const source = editor.value;
      if (!source.trim()) {
        output.textContent = 'Enter your code, then run the tests.';
        return;
      }
      if (source.length > 20000) {
        output.textContent = 'This exercise accepts up to 20,000 characters.';
        return;
      }
      let worker;
      try {
        worker = new Worker(workerUrl);
      } catch {
        output.textContent =
          'This browser could not start the practice runner. Open the hosted course in a browser with Web Workers enabled.';
        return;
      }
      run.disabled = true;
      output.textContent = 'Starting the practice runner…';
      let timer = setTimeout(
        () =>
          finish(
            'The runner took too long to load. Check your connection and try again.',
          ),
        30000,
      );

      function finish(message) {
        clearTimeout(timer);
        worker.terminate();
        run.disabled = false;
        if (message) output.textContent = message;
      }

      worker.onerror = () =>
        finish(
          'The practice runner could not load. Reload this page and try again.',
        );
      worker.onmessage = ({ data }) => {
        if (data.ready) {
          clearTimeout(timer);
          output.textContent = 'Running your code…';
          timer = setTimeout(
            () =>
              finish(
                'Execution stopped after five seconds. Check any loops or joins and try again.',
              ),
            5000,
          );
          worker.postMessage({ source });
        } else if (data.error) {
          finish(data.error);
        } else if (Array.isArray(data.cases)) {
          finish();
          const passed = data.cases.filter((result) => result.passed).length;
          output.replaceChildren(
            element('p', `${passed} of ${data.cases.length} tests passed.`),
          );
          const list = element('ul');
          for (const result of data.cases) {
            list.append(
              element(
                'li',
                `${result.passed ? 'Passed' : 'Try again'} — ${result.message}`,
              ),
            );
          }
          output.append(list);
          if (data.stdout) output.append(element('pre', data.stdout));
          if (data.cases.length > 0 && passed === data.cases.length) {
            onPass?.(Number(week));
          }
        }
      };
      worker.postMessage({ week: Number(week) });
    });
  }

  window.PRACTICE_WEEKS = Object.keys(exercises).map(Number);
  window.PRACTICE_REFERENCES = Object.fromEntries(
    Object.entries(exercises).map(([week, exercise]) => [
      week,
      exercise.reference,
    ]),
  );
  window.practiceDraftKey = practiceDraftKey;
  window.mountPractice = mountPractice;
})();
