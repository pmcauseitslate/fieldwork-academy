(() => {
  'use strict';

  const script = new URL(document.currentScript.src);
  const workerURL = new URL('./beginner-worker.js', script);
  workerURL.search = script.search;
  const draftKey = 'fieldwork.guided-python.week1.v1';

  function readGuidedDraft(starter) {
    try {
      const saved = JSON.parse(localStorage.getItem(draftKey) || 'null');
      if (saved?.starter === starter && typeof saved.source === 'string')
        return saved.source.slice(0, 20000);
    } catch {
      /* The editor and other journal data remain available. */
    }
    return null;
  }
  function storeGuidedDraft(starter, source) {
    if (typeof source === 'string')
      localStorage.setItem(
        draftKey,
        JSON.stringify({ starter, source: source.slice(0, 20000) }),
      );
    else localStorage.removeItem(draftKey);
  }
  window.guidedPracticeDraft = {
    read: readGuidedDraft,
    restore: storeGuidedDraft,
  };

  function element(tag, text, className) {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  }

  function errorHelp(error, source) {
    const lineNumber = Number(/on line (\d+)/i.exec(error)?.[1]);
    const lines = source.split('\n');
    const preceding = lines[lineNumber - 2] || '';
    const offending = lines[lineNumber - 1] || '';
    if (
      /SyntaxError/.test(error) &&
      /^\s*def .*:\s*$/.test(preceding) &&
      /^\S/.test(offending)
    ) {
      return 'Python expected a function body here. Add four spaces before the instructions that belong inside the function.';
    }
    if (
      /IndentationError|expected an indented block|unexpected indent/.test(
        error,
      )
    ) {
      return 'Check the spacing. Start each line inside the function with four ordinary spaces. The final print call starts at the left edge.';
    }
    if (/NameError/.test(error)) {
      return 'Compare the spelling in the line named by Python with the names introduced above. Capital and lowercase letters count as different characters.';
    }
    if (/SyntaxError|ParseError/.test(error)) {
      return 'Check the reported line and the line above it. The def line ends with a colon, and each opening parenthesis needs a closing parenthesis.';
    }
    if (/TypeError/.test(error)) {
      return 'Check the function call. This example expects two numbers separated by a comma.';
    }
    if (/TimeLimitError|time limit|timed out/i.test(error)) {
      return 'This example should finish immediately. Check for a loop that keeps running, or restore the example and try one edit at a time.';
    }
    return '';
  }

  window.mountBeginnerPractice = (container, walkthrough) => {
    const starter = walkthrough.code;
    const change = walkthrough.change;
    const section = element('section', '', 'beginner-practice');
    const label = element('label', 'Python practice editor', 'field-label');
    const editor = element('textarea', '', 'code-editor');
    editor.id = 'week-one-practice-editor';
    label.htmlFor = editor.id;
    editor.rows = Math.max(6, starter.split('\n').length + 1);
    editor.maxLength = 20000;
    editor.spellcheck = false;
    editor.setAttribute('autocapitalize', 'off');
    editor.setAttribute('autocorrect', 'off');
    editor.value = readGuidedDraft(starter) ?? starter;

    const run = element('button', 'Run Python', 'button');
    const reset = element('button', 'Restore example', 'button btn-secondary');
    run.type = reset.type = 'button';
    const controls = element('div', '', 'button-row');
    controls.append(run, reset);

    const status = element(
      'p',
      'Run the code to see what Python prints.',
      'save-note',
    );
    status.setAttribute('role', 'status');
    const result = element('pre', '', 'stimulus');
    result.setAttribute('aria-label', 'Printed output');
    result.hidden = true;
    const help = element('p');
    help.hidden = true;
    const compare = element('details', '', 'hint');
    compare.append(
      element('summary', 'Check the reference outputs'),
      element(
        'p',
        'Original example: ' +
          walkthrough.expected +
          '. Changed example: ' +
          change.expected +
          '. ' +
          change.explanation,
      ),
    );

    const lineGuide = element('details', '', 'line-guide');
    const annotated = element('ol');
    for (const line of walkthrough.lines) {
      const item = element('li');
      item.append(
        element('code', line.snippet),
        element('p', line.explanation),
      );
      annotated.append(item);
    }
    lineGuide.append(
      element('summary', 'Read the program line by line'),
      annotated,
    );

    section.append(
      label,
      element(
        'p',
        'Select Run Python to display the result. Open the line-by-line explanation to see how the two inputs produce that number.',
      ),
      editor,
      controls,
      element('h4', 'Output'),
      status,
      result,
      help,
      lineGuide,
      element('h4', 'Change one input'),
      element('p', change.prompt),
      compare,
    );
    container.replaceChildren(section);

    let worker = null;
    let timer = 0;
    function stop() {
      clearTimeout(timer);
      if (worker) worker.terminate();
      worker = null;
      run.disabled = false;
    }
    function clear(message) {
      status.textContent = message;
      result.textContent = help.textContent = '';
      result.hidden = help.hidden = true;
    }
    function persist() {
      try {
        storeGuidedDraft(starter, editor.value);
      } catch {
        /* The current edit remains in the editor. */
      }
    }
    editor.addEventListener('input', () => {
      stop();
      persist();
      clear('Code changed. Run Python to see the result.');
    });
    reset.addEventListener('click', () => {
      stop();
      editor.value = starter;
      persist();
      clear('Original example restored. Run Python to see the result.');
    });
    run.addEventListener('click', () => {
      stop();
      const source = editor.value;
      if (!source.trim()) {
        clear('Enter Python code or choose Restore example to begin.');
        return;
      }
      let current;
      try {
        current = new Worker(workerURL);
      } catch {
        clear(
          'The browser could not start the practice editor. Reload the lesson and try again.',
        );
        return;
      }
      worker = current;
      run.disabled = true;
      clear('Starting Python…');
      function finish(message) {
        if (worker !== current) return false;
        stop();
        status.textContent = message;
        return true;
      }
      timer = setTimeout(
        () =>
          finish(
            'The interpreter took too long to load. Try running the example again.',
          ),
        30000,
      );
      current.onerror = () =>
        finish(
          'The interpreter could not load. Reload this page and run the example again.',
        );
      current.onmessage = ({ data }) => {
        if (worker !== current) return;
        if (data.ready) {
          clearTimeout(timer);
          status.textContent = 'Running Python…';
          timer = setTimeout(
            () =>
              finish(
                'Stopped after five seconds. Check for a loop that keeps running.',
              ),
            5000,
          );
          current.postMessage({ source });
          return;
        }
        const printed = data.output || '';
        if (
          !finish(
            data.error
              ? 'Python stopped with an error.'
              : printed
                ? 'Program finished. Printed output appears below.'
                : 'Program finished without printing any output.',
          )
        )
          return;
        const display = [];
        if (printed) display.push(printed.trimEnd() || '(blank line)');
        if (data.clipped)
          display.push('Output limited to the first 4,000 characters.');
        if (data.error) display.push(data.error);
        result.textContent = display.join('\n');
        result.hidden = !display.length;
        let message = '';
        if (data.error) message = errorHelp(data.error, source);
        else if (!printed)
          message =
            'A function definition stores instructions. A separate print(...) call below the definition displays the value the function returns.';
        else if (/^None$/m.test(printed.trim()))
          message =
            'None is Python’s value for a missing result here. Check that the function returns a value and the final print call displays it.';
        help.textContent = message;
        help.hidden = !message;
      };
    });
    return stop;
  };
})();
