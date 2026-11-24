(() => {
  const script = new URL(document.currentScript.src);
  const workerUrl = new URL('workshop-worker.js', script);
  workerUrl.search = script.search;
  const labels = { python: 'Python', sql: 'SQL', html: 'HTML' };
  function make(tag, text, klass) {
    const item = document.createElement(tag);
    if (text) item.textContent = text;
    if (klass) item.className = klass;
    return item;
  }
  function button(text, klass) {
    const el = make('button', text, 'button ' + (klass || 'btn-secondary'));
    el.type = 'button';
    return el;
  }
  function errorHint(message) {
    const hints = [
      [
        /IndentationError|TabError/,
        'Line up instructions inside the same block with four spaces. Check the line above the reported error.',
      ],
      [
        /SyntaxError/,
        'Compare the reported line and the one above with the worked example. Look for missing quotes, colons or closing brackets.',
      ],
      [
        /NameError/,
        'Find the line that first assigns the name. Check that it runs before this line and that both spellings match.',
      ],
      [
        /KeyError|no such column/i,
        'Read the field names in the supplied data. Match the exact name used by the record or table.',
      ],
      [
        /FileNotFoundError/,
        'Open the files supplied in this editor and compare the filename with the one in the program.',
      ],
      [
        /TypeError|ValueError/,
        'Check what each input contains and whether the calculation expects a number, text or a collection.',
      ],
      [
        /no such table/i,
        'Check the table name against the starting database and run its creation statement before using it.',
      ],
      [
        /constraint failed/i,
        'A data rule rejected this row. Find its key, value or parent record and compare it with the table definition.',
      ],
      [
        /AssertionError/,
        'A test expected a different result. Trace its inputs by hand, then compare what the function returns.',
      ],
    ];
    return hints.find(([pattern]) => pattern.test(message))?.[1] || '';
  }
  function mount(host, spec, options) {
    const { language } = spec,
      name = labels[language],
      starter = spec.starter ?? spec.code ?? spec.artifact;
    const label = make(
      'label',
      options.project ? 'Project editor' : 'Worked example editor',
      'field-label',
    );
    const editor = make('textarea', '', 'code-editor');
    label.htmlFor = editor.id = options.project
      ? 'project-code'
      : 'guided-code';
    editor.spellcheck = false;
    editor.setAttribute('autocapitalize', 'off');
    editor.setAttribute('autocorrect', 'off');
    editor.rows = 10;
    editor.maxLength = 40000;
    editor.value = options.saved ?? starter;
    const controls = make('div', '', 'button-row');
    const run = button(
      language === 'html' ? 'Open preview' : 'Run ' + name,
      'btn-primary',
    );
    const reset = button(
      options.project ? 'Restore starter' : 'Restore example',
    );
    const stopButton = button('Stop run');
    stopButton.hidden = true;
    controls.append(run, stopButton, reset);
    if (options.project) {
      const download = button('Download code');
      download.onclick = () =>
        options.download(
          'week-' +
            options.week +
            '-project.' +
            { python: 'py', sql: 'sql', html: 'html' }[language],
          spec.setupSql
            ? spec.setupSql + '\n\n-- Project work\n' + editor.value
            : editor.value,
          'text/plain',
        );
      controls.append(download);
    }
    const status = make('p', '', 'save-note');
    status.setAttribute('role', 'status');
    const output = make('pre', '', 'stimulus workshop-output');
    output.hidden = true;
    const testList = make('ul', '', 'run-checks');
    const preview = make('div', '', 'html-result');
    const files = make('details', '', 'hint');
    const fileNames = [
      ...Object.keys(spec.files || {}),
      ...Object.keys(spec.assetFiles || {}),
    ];
    if (fileNames.length || spec.setupSql) {
      files.append(
        make(
          'summary',
          spec.setupSql
            ? 'Database supplied in this editor'
            : 'Files supplied in this editor',
        ),
      );
      if (spec.setupSql) files.append(make('pre', spec.setupSql, 'stimulus'));
      for (const file of fileNames) {
        const a = spec.assetFiles?.[file];
        if (a) {
          const link = make('a', file, 'text-link');
          link.href = a;
          link.download = file;
          files.append(link);
        } else {
          const getFile = button('Download ' + file);
          getFile.onclick = () =>
            options.download(file, spec.files[file], 'text/plain');
          files.append(getFile, make('pre', spec.files[file], 'stimulus'));
        }
      }
    }
    host.append(label);
    if (fileNames.length || spec.setupSql) host.append(files);
    host.append(editor, controls, status, output, testList, preview);
    let worker = null,
      timer = 0,
      generation = 0,
      detachPreviewCheck;
    function cancel() {
      generation++;
      clearTimeout(timer);
      worker?.terminate();
      worker = null;
      detachPreviewCheck?.();
      detachPreviewCheck = null;
      run.disabled = false;
      stopButton.hidden = true;
    }
    function clear() {
      output.hidden = true;
      output.textContent = '';
      testList.replaceChildren();
      preview.replaceChildren();
    }
    function edit() {
      cancel();
      clear();
      options.onEdit(editor.value);
      status.textContent = 'Edit saved in this journal.';
    }
    editor.oninput = edit;
    reset.onclick = () => {
      if (
        editor.value !== starter &&
        !window.confirm(
          'Replace the edits in this editor with the original code?',
        )
      )
        return;
      editor.value = starter;
      edit();
      status.textContent = 'Original code restored.';
    };
    stopButton.onclick = () => {
      cancel();
      status.textContent = 'Run stopped. The editor still contains the code.';
    };
    run.onclick = async () => {
      cancel();
      clear();
      if (!editor.value.trim()) {
        status.textContent =
          'Enter code or restore the starter before running.';
        return;
      }
      const source = editor.value,
        current = generation;
      function reportChecks(checks) {
        for (const check of checks)
          testList.append(
            make(
              'li',
              (check.passed ? 'Passed · ' : 'Try again · ') +
                check.label +
                (check.message ? ' — ' + check.message : ''),
            ),
          );
        status.textContent =
          checks.filter((c) => c.passed).length +
          ' of ' +
          checks.length +
          ' project checks passed.';
      }
      if (language === 'html') {
        const createFrame = (title) => {
          const frame = make('iframe');
          frame.title = title;
          frame.setAttribute('sandbox', 'allow-scripts allow-forms');
          return frame;
        };
        const header =
          "<!doctype html><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'\">";
        const frame = createFrame('Interactive workshop preview');
        frame.srcdoc = header + source;
        preview.append(frame);
        status.textContent =
          'Preview open. Test the controls inside the frame.';
        if (!spec.checks?.length) {
          options.onPass?.(source);
          return;
        }
        const verify = createFrame('Project checks');
        verify.hidden = true;
        const expressions = spec.checks
          .map((c) => '()=>Boolean(' + c.code + '\n)')
          .join(',');
        const probe =
          "window.addEventListener('load',()=>{const checks=[" +
          expressions +
          "]; const passed=checks.map(check=>{try{return check()}catch{return false}});parent.postMessage({workshopChecks:passed},'*');});";
        verify.srcdoc = header + source + '<script>' + probe + '</script>';
        function receive(event) {
          if (current !== generation || event.source !== verify.contentWindow)
            return;
          const passed = event.data?.workshopChecks;
          if (!Array.isArray(passed) || passed.length !== spec.checks.length)
            return;
          const checks = spec.checks.map((c, i) => ({
            label: c.label,
            passed: passed[i] === true,
          }));
          cancel();
          reportChecks(checks);
          if (checks.every((c) => c.passed)) options.onPass?.(source);
        }
        window.addEventListener('message', receive);
        detachPreviewCheck = () => {
          window.removeEventListener('message', receive);
          verify.remove();
        };
        preview.append(verify);
        timer = setTimeout(() => {
          if (current === generation) {
            cancel();
            status.textContent =
              'The preview checks could not finish. Review the HTML and open the preview again.';
          }
        }, 8000);
        return;
      }
      run.disabled = true;
      stopButton.hidden = false;
      status.textContent =
        language === 'python'
          ? 'Loading Python. The first run downloads the free interpreter.'
          : 'Opening a fresh practice database…';
      const fail = (message) => {
        if (current !== generation) return;
        cancel();
        status.textContent = message;
      };
      timer = setTimeout(
        () =>
          fail(
            'The interpreter could not start in time. Check the connection and select Run again.',
          ),
        60000,
      );
      try {
        const files = { ...spec.files };
        await Promise.all(
          Object.entries(spec.assetFiles || {}).map(async ([file, path]) => {
            const response = await fetch(path);
            if (!response.ok) throw Error('Could not load ' + file);
            files[file] = await response.text();
          }),
        );
        if (current !== generation) return;
        worker = new Worker(workerUrl);
        worker.onerror = () =>
          fail(
            'The interpreter could not load. Check the connection and run again.',
          );
        worker.onmessage = ({ data }) => {
          if (current !== generation) return;
          if (data.running) {
            clearTimeout(timer);
            status.textContent = 'Running ' + name + '…';
            timer = setTimeout(
              () =>
                fail(
                  'Run stopped. Check for a loop or query that keeps running, then try again.',
                ),
              10000,
            );
            return;
          }
          cancel();
          status.textContent = data.error
            ? 'The run stopped. Read the message below.'
            : data.checks?.length
              ? data.checks.filter((c) => c.passed).length +
                ' of ' +
                data.checks.length +
                ' project checks passed.'
              : 'Run complete.';
          output.textContent =
            [
              data.output || '',
              data.error || '',
              data.error ? errorHint(data.error) : '',
            ]
              .filter(Boolean)
              .join('\n') || 'Finished with no printed output.';
          output.hidden = false;
          if (data.checks?.length) reportChecks(data.checks);
          if (!data.error && (data.checks || []).every((c) => c.passed))
            options.onPass?.(source);
        };
        worker.postMessage({
          language,
          source,
          files,
          setupSql: spec.setupSql,
          checks: spec.checks,
        });
      } catch (error) {
        fail('Could not start the exercise. ' + error.message + '. Try again.');
      }
    };
    return cancel;
  }
  window.mountWorkshopEditor = mount;
})();
