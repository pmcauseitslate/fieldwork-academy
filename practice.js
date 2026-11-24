(() => {
  const workerUrl = new URL('./practice-worker.js', document.currentScript.src);
  workerUrl.search = new URL(document.currentScript.src).search;
  const exercises = {
    1: {
      language: 'Python',
      label: 'Estimate support workload',
      instructions:
        'Write the calculation that turns a ticket count and minutes per ticket into staff-hours. The editor already supplies the function name and its two inputs.',
      directions: [
        'Read the first line. tickets is the count. minutes_each is the average handling time. When the grader calls workload_hours(10, 12), those names take the values 10 and 12 for that call.',
        'In the starter, replace the 0 after return with a calculation using both input names. Keep the first line, the colon, and the four spaces before return. The line beginning with # is a note for the reader.',
        'Use * for multiplication and / for division. Work out minutes for the whole queue, then convert that result to hours. Use the input names so the same function works for a new queue.',
        'Choose Run tests. Each row compares expected hours with the value the function returned. If a row says Try again, check the units or indentation, edit the code, and run the tests again. Four passing rows complete the coding task.',
      ],
      starter:
        'def workload_hours(tickets, minutes_each):\n    # Replace the 0 with the calculation.\n    return 0\n',
      reference: {
        title: 'Convert a batch of lab sessions into staff-days',
        steps: [
          'The two inputs are the number of sessions and the staff-hours per session. Each call supplies both numbers.',
          'Multiply to find total hours. Divide by eight working hours per staff-day and return the result.',
          'Read the last line. It calls the function with four sessions of three hours and displays the return value. Predict what would change if the first input were zero.',
        ],
        artifact:
          'def session_days(sessions, hours_each):\n    total_hours = sessions * hours_each\n    return total_hours / 8\n\nprint(session_days(4, 3))  # Displays 1.5',
        check:
          'Four sessions at three hours each require 12 hours, or 1.5 eight-hour days. Zero sessions require zero days. In the assessed task the requested output unit is hours.',
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

  function mountPractice(container, week, onPass, onCase) {
    const exercise = exercises[week];
    if (!container || !exercise) return;
    const section = element('section', '', 'code-practice');
    const heading = element('h3', exercise.label);
    const requirement = element('div', 'Required coding task', 'eyebrow');
    const instructions = element('p', exercise.instructions);
    section.append(requirement, heading, instructions);
    if (exercise.directions) {
      const directions = element('ol');
      for (const step of exercise.directions)
        directions.append(element('li', step));
      section.append(directions);
    }
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

    let customButton;
    let activeRun;
    function stopRun(message) {
      if (!activeRun) return;
      clearTimeout(activeRun.timer);
      activeRun.worker.terminate();
      if (message) activeRun.output.textContent = message;
      activeRun = null;
      run.disabled = false;
      if (customButton) customButton.disabled = false;
    }

    function startRun(target, queue, handleResult) {
      if (activeRun) return;
      const source = editor.value;
      if (!source.trim() || source.length > 20000) {
        target.textContent = source.trim()
          ? 'This exercise accepts up to 20,000 characters.'
          : 'Enter code in the editor before running it.';
        return;
      }
      let worker;
      try {
        worker = new Worker(workerUrl);
      } catch {
        target.textContent =
          'This browser could not start the practice runner. Open the hosted course in a browser with Web Workers enabled.';
        return;
      }
      const job = { worker, output: target, timer: null, custom: !!queue };
      activeRun = job;
      run.disabled = true;
      if (customButton) customButton.disabled = true;
      target.textContent = 'Starting the practice runner…';
      job.timer = setTimeout(
        () =>
          stopRun(
            'The runner took too long to load. Check the connection and try again.',
          ),
        30000,
      );
      worker.onerror = () => {
        if (activeRun === job)
          stopRun(
            'The practice runner could not load. Reload this page and try again.',
          );
      };
      worker.onmessage = ({ data }) => {
        if (activeRun !== job) return;
        if (data.ready) {
          clearTimeout(job.timer);
          target.textContent = 'Running the code…';
          job.timer = setTimeout(
            () =>
              stopRun(
                'Execution stopped after five seconds. Check for a loop that never finishes.',
              ),
            5000,
          );
          worker.postMessage({ source, queue });
        } else if (data.error) {
          stopRun(data.error);
        } else {
          stopRun();
          handleResult(data);
        }
      };
      worker.postMessage({ week: Number(week) });
    }

    run.addEventListener('click', () => {
      startRun(output, undefined, (data) => {
        if (!Array.isArray(data.cases)) return;
        const passed = data.cases.filter((result) => result.passed).length;
        output.replaceChildren(
          element('p', passed + ' of ' + data.cases.length + ' tests passed.'),
        );
        const list = element('ul');
        for (const result of data.cases) {
          list.append(
            element(
              'li',
              (result.passed ? 'Passed' : 'Try again') + ' — ' + result.message,
            ),
          );
        }
        output.append(list);
        if (data.stdout) output.append(element('pre', data.stdout));
        if (data.cases.length > 0 && passed === data.cases.length)
          onPass?.(Number(week));
      });
    });
    editor.addEventListener('input', () => {
      if (activeRun)
        stopRun(
          'Code changed during this run. Run the new version to see its result.',
        );
    });

    if (Number(week) === 1) {
      const form = element('form', '', 'queue-trial');
      form.append(
        element('h4', 'Try a queue'),
        element(
          'p',
          'Choose inputs, predict the hours on paper, then run the function from the editor. For the project, try two positive ticket counts at the same handling time. Make one result less than an hour. Finally try zero tickets. Run tests above grades the four official cases.',
        ),
      );
      function numberField(id, text, step, max) {
        const label = element('label', text, 'field-label');
        const input = element('input', '', 'answer-input');
        input.id = id;
        label.htmlFor = id;
        input.type = 'number';
        input.min = '0';
        input.max = String(max);
        input.step = step;
        input.required = true;
        form.append(label, input);
        return input;
      }
      const tickets = numberField(
        'queue-tickets',
        'Ticket count',
        '1',
        1000000,
      );
      const minutes = numberField(
        'queue-minutes',
        'Minutes per ticket',
        'any',
        100000,
      );
      const prediction = numberField(
        'queue-prediction',
        'Predicted staff-hours',
        'any',
        10000000000,
      );
      customButton = element(
        'button',
        'Run this queue',
        'button btn-secondary',
      );
      customButton.type = 'submit';
      const customOutput = element('div', '', 'queue-output');
      customOutput.setAttribute('role', 'status');
      form.append(customButton, customOutput);
      form.addEventListener('input', () => {
        if (activeRun?.custom)
          stopRun(
            'The queue changed during the run. Run it again with the new values.',
          );
      });
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;
        const queue = {
          tickets: tickets.valueAsNumber,
          minutes: minutes.valueAsNumber,
        };
        const expected = prediction.valueAsNumber;
        startRun(customOutput, queue, ({ actual, stdout }) => {
          if (!Number.isFinite(actual)) return;
          const manualHours = (queue.tickets * queue.minutes) / 60;
          const matches = (a, b) =>
            Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
          const correct = matches(actual, manualHours);
          const predicted = matches(expected, actual);
          customOutput.replaceChildren(
            element(
              'p',
              'Predicted: ' +
                expected +
                ' hours. Function returned: ' +
                actual +
                ' hours.',
            ),
            element(
              'p',
              'Hand check: ' +
                queue.tickets +
                ' × ' +
                queue.minutes +
                ' minutes ÷ 60 = ' +
                manualHours +
                ' hours.',
            ),
            element(
              'p',
              correct
                ? predicted
                  ? 'The prediction and function both match the hand check.'
                  : 'The function matches the hand check. Trace the units to revise the prediction.'
                : 'The function differs from the hand check. Check the calculation, then run this queue again.',
            ),
          );
          if (stdout) {
            customOutput.append(
              element('p', 'Printed output'),
              element('pre', stdout),
            );
          }
          onCase?.({ ...queue, expected, actual });
          if (onCase)
            customOutput.append(
              element('p', 'Recorded in the Week 1 project journal.'),
            );
        });
      });
      section.append(form);
    }
    container.replaceChildren(section);
    return () => stopRun();
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
