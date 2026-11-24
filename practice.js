(() => {
  const workerUrl = new URL('./practice-worker.js', document.currentScript.src);
  const exercises = {
    1: {
      language: 'Python',
      label: 'Calculate straight-time labor',
      instructions:
        'Complete labor_cost so it returns the number of people × hours per person × hourly rate. For 3 people at 6 hours and $24 per hour, return 432. Use the arguments so the same function works for another crew.',
      starter:
        'def labor_cost(people, hours, rate):\n    # Return the total cost for this shift.\n    return 0\n',
    },
    2: {
      language: 'Python',
      label: 'Check a project budget',
      instructions:
        'Complete budget_status(costs, budget). The costs list contains dollar amounts. Return "over" when their total exceeds the budget and "within" for a total at or below budget. For [600, 240, 160] and a budget of 1000, return "within".',
      starter:
        'def budget_status(costs, budget):\n    # Add the line items and compare the total with the budget.\n    return ""\n',
    },
    7: {
      language: 'SQL',
      label: 'List open RFIs by project',
      instructions:
        'Return the RFI number and project name for every open RFI, ordered by RFI number. Join rfis.project_id to projects.id. The datasets change between tests. An unanswered request has the status text open.',
      schema:
        'projects(id, name)\n  10 | North Yard\n  20 | East Wing\n\nrfis(id, project_id, status)\n  101 | 20 | open\n  102 | 10 | closed\n  103 | 10 | open\n\nExpected rows\n  101 | East Wing\n  103 | North Yard',
      starter:
        'SELECT rfis.id, projects.name\nFROM rfis\nJOIN projects ON projects.id = rfis.project_id\n-- Add the status filter and row order.\n;',
    },
  };

  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }

  function mountPractice(container, week) {
    const exercise = exercises[week];
    if (!container || !exercise) return;
    const section = element('section', '', 'code-practice');
    const heading = element('h3', exercise.label);
    const instructions = element('p', exercise.instructions);
    section.append(heading, instructions);
    if (exercise.schema) {
      const details = element('details');
      details.append(
        element('summary', 'View the sample tables and expected rows'),
        element('pre', exercise.schema),
      );
      section.append(details);
    }

    const label = element('label', `${exercise.language} editor`);
    const editor = element('textarea', '', 'code-editor');
    editor.id = `practice-editor-${week}`;
    label.htmlFor = editor.id;
    editor.maxLength = 20000;
    editor.spellcheck = false;
    editor.setAttribute('autocapitalize', 'off');
    editor.rows = exercise.language === 'SQL' ? 8 : 6;
    const storageKey = `fieldwork.practice.v1.${week}`;
    editor.value = exercise.starter;
    try {
      editor.value = localStorage.getItem(storageKey) ?? exercise.starter;
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
        }
      };
      worker.postMessage({ week: Number(week) });
    });
  }

  window.PRACTICE_WEEKS = Object.keys(exercises).map(Number);
  window.mountPractice = mountPractice;
})();
