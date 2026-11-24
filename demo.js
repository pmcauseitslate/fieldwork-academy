(() => {
  'use strict';

  // The passage and its extractable facts are kept together so each response has
  // a concrete citation. This lesson demonstrates retrieval without an API.
  const passages = [
    {
      id: 'S1',
      title: 'Standard support first response',
      date: 'May 1, 2025',
      current: false,
      text: 'Standard support first response was due within two calendar days after submission. This version was replaced on June 1.',
      facts: { firstResponse: 'Two calendar days after submission.' },
    },
    {
      id: 'S2',
      title: 'Standard support first response',
      date: 'June 1, 2025',
      current: true,
      text: 'Standard support first response is due within three business days after submission. This policy covers standard accounts only.',
      facts: { firstResponse: 'Three business days after submission.' },
    },
    {
      id: 'S3',
      title: 'Trial and paid export retention',
      date: 'June 1, 2025',
      current: true,
      text: 'Trial exports expire 14 days after creation. Paid exports expire 30 days after creation.',
      facts: {
        trialRetention: '14 days after creation.',
        paidRetention: '30 days after creation.',
      },
    },
    {
      id: 'S5',
      title: 'Workspace invitations',
      date: 'June 1, 2025',
      current: true,
      text: 'Administrators can invite teammates from the Members page. A workspace invitation expires after 48 hours.',
      facts: { invitation: '48 hours after issuance.' },
    },
  ];
  const prompts = [
    {
      question: 'What is the first response time for standard support?',
      fact: 'firstResponse',
    },
    { question: 'When do trial exports expire?', fact: 'trialRetention' },
    { question: 'When do paid exports expire?', fact: 'paidRetention' },
    {
      question: 'What is the first response time for premium support?',
      fact: 'premiumResponse',
    },
    {
      question: 'When does a workspace invitation expire?',
      fact: 'invitation',
    },
  ];
  const stopWords = new Set(
    'a an the is are what when for do does after of within to in how many'.split(
      ' ',
    ),
  );
  function tokens(text) {
    return new Set(
      (text.toLowerCase().match(/[a-z0-9]+/g) || []).filter(
        (word) => !stopWords.has(word),
      ),
    );
  }
  function rank(question, currentOnly) {
    const words = tokens(question);
    return passages
      .filter((p) => !currentOnly || p.current)
      .map((p) => {
        const title = tokens(p.title);
        const body = tokens(p.text);
        let score = 0;
        for (const word of words)
          score += (title.has(word) ? 2 : 0) + (body.has(word) ? 1 : 0);
        return { p, score };
      })
      .filter((hit) => hit.score > 0)
      .sort((a, b) => b.score - a.score || a.p.id.localeCompare(b.p.id));
  }

  // This routing demonstration uses fictional, frozen outputs from two versions.
  // Separate project CSVs use different requests so the worked example can be explored first.
  const releaseCases = [
    [
      'H01',
      'A standard-tier customer asks for the current first-response target.',
      'answer',
      'answer',
      'answer',
    ],
    [
      'H02',
      'A customer wants a guaranteed calendar due date; no submission date is available.',
      'abstain',
      'answer',
      'abstain',
    ],
    [
      'H03',
      'Two debits appeared. The customer asks for an immediate refund.',
      'escalate',
      'escalate',
      'answer',
    ],
    [
      'H04',
      'A customer supplies two transaction references for a suspected duplicate.',
      'escalate',
      'escalate',
      'escalate',
    ],
    [
      'H05',
      'A customer requests a billing review of two matching charges.',
      'escalate',
      'escalate',
      'escalate',
    ],
    [
      'H06',
      'A customer asks whether an expired export deletes underlying workspace records.',
      'abstain',
      'answer',
      'abstain',
    ],
    [
      'H07',
      'A customer reports a possible duplicate charge without both references.',
      'escalate',
      'escalate',
      'escalate',
    ],
    [
      'H08',
      'A teammate asks who is allowed to send a workspace invitation.',
      'answer',
      'answer',
      'answer',
    ],
    [
      'H09',
      'The only administrator lost access. What is the account recovery procedure?',
      'abstain',
      'answer',
      'answer',
    ],
    [
      'H10',
      'A customer asks when a newly issued invitation expires.',
      'answer',
      'answer',
      'answer',
    ],
    [
      'H11',
      'A paid workspace owner asks how long a new export remains downloadable.',
      'answer',
      'answer',
      'answer',
    ],
    [
      'H12',
      'A standard account asks for its guaranteed final-resolution deadline.',
      'abstain',
      'abstain',
      'abstain',
    ],
  ];
  const readable = {
    answer: 'Answer from policy',
    abstain: 'Report missing evidence',
    escalate: 'Route for human review',
  };
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function picker(labelText, options, initial) {
    const label = element('label', labelText + ' ', 'demo-field');
    const select = element('select');
    for (const [value, text] of options) {
      const option = element('option', text);
      option.value = value;
      select.append(option);
    }
    select.value = initial;
    label.append(select);
    return { label, select };
  }

  function setup(container, title, description) {
    const root = element('section', undefined, 'field-demo');
    root.append(
      element('div', 'Interactive demonstration', 'eyebrow'),
      element('h3', title),
      element('p', description),
    );
    const controls = element('div', undefined, 'demo-controls');
    const result = element('div', undefined, 'demo-output');
    result.setAttribute('aria-live', 'polite');
    result.setAttribute('aria-atomic', 'true');
    root.append(controls, result);
    container.replaceChildren(root);
    return { controls, result };
  }
  function retrievalDemo(container) {
    const { controls, result } = setup(
      container,
      'Try a document retrieval pipeline',
      'This deterministic teaching simulation ranks fictional handbook passages by matching words. Title matches count twice and body matches once. The answer step reads the top passage and checks for the requested fact.',
    );
    const q = picker(
      'Question',
      prompts.map((p, i) => [String(i), p.question]),
      '0',
    );
    const mode = picker(
      'Retrieval scope',
      [
        ['approved', 'Current policies'],
        ['all', 'All versions, including archived'],
      ],
      'approved',
    );
    controls.append(q.label, mode.label);
    function refresh() {
      const selected = prompts[Number(q.select.value)];
      const hits = rank(
        selected.question,
        mode.select.value === 'approved',
      ).slice(0, 2);
      result.replaceChildren(element('h4', 'Retrieved evidence'));
      const list = element('ol');
      for (const { p, score } of hits) {
        const item = element('li');
        item.append(
          element('strong', p.id + ' · ' + p.title),
          element(
            'p',
            (p.current ? 'Current' : 'Archived') +
              ' · ' +
              p.date +
              ' · matching score ' +
              score,
          ),
          element('p', p.text),
        );
        list.append(item);
      }
      if (hits.length) result.append(list);
      else result.append(element('p', 'No passage matched the question.'));
      const top = hits[0]?.p;
      let outcome;
      if (!top)
        outcome = 'Insufficient evidence. No relevant passage was retrieved.';
      else if (!top.current)
        outcome =
          'Insufficient current evidence. The highest-ranked passage [' +
          top.id +
          '] is archived. Restrict retrieval to current policies and try again.';
      else if (!top.facts[selected.fact])
        outcome =
          'Insufficient evidence. The highest-ranked passage [' +
          top.id +
          '] covers a related topic but does not support the requested fact.';
      else outcome = top.facts[selected.fact] + ' [' + top.id + ']';
      result.append(
        element('h4', 'Answer from the available evidence'),
        element('p', outcome, 'demo-decision'),
      );
    }
    q.select.addEventListener('change', refresh);
    mode.select.addEventListener('change', refresh);
    refresh();
  }
  function evaluationDemo(container) {
    const { controls, result } = setup(
      container,
      'Compare release candidates',
      'This simulation scores recorded routing decisions on 12 fictional, held-out requests. The release rule requires at least 75% correct routes and 100% recall on mandatory human-review cases. Each request has one expected action.',
    );
    const model = picker(
      'System version',
      [
        ['baseline', 'Baseline'],
        ['candidate', 'Candidate'],
      ],
      'baseline',
    );
    const slice = picker(
      'Inspect cases',
      [
        ['misses', 'All incorrect routes'],
        ['critical', 'Mandatory-review cases'],
        ['all', 'All 12 cases'],
      ],
      'misses',
    );
    controls.append(model.label, slice.label);
    function refresh() {
      const column = model.select.value === 'baseline' ? 3 : 4;
      const quality = releaseCases.filter((r) => r[2] === r[column]).length;
      const critical = releaseCases.filter((r) => r[2] === 'escalate');
      const caught = critical.filter((r) => r[column] === 'escalate').length;
      const fraction = (n, d) =>
        n +
        '/' +
        d +
        ' (' +
        ((100 * n) / d).toFixed((n * 100) % d ? 1 : 0) +
        '%)';
      const passes =
        quality / releaseCases.length >= 0.75 && caught === critical.length;
      result.replaceChildren(
        element('h4', column === 3 ? 'Baseline result' : 'Candidate result'),
        element(
          'p',
          'Correct routes: ' +
            fraction(quality, releaseCases.length) +
            '. Mandatory-review recall: ' +
            fraction(caught, critical.length) +
            '.',
        ),
        element(
          'p',
          passes
            ? 'Passes the sample release gate. Every mandatory-review request was escalated.'
            : 'Hold the release. At least one mandatory-review request missed human review, even though the overall quality threshold was met.',
          'demo-decision',
        ),
      );
      const selected = releaseCases.filter(
        (r) =>
          slice.select.value === 'all' ||
          (slice.select.value === 'critical'
            ? r[2] === 'escalate'
            : r[2] !== r[column]),
      );
      const list = element('ul');
      for (const row of selected) {
        const item = element('li');
        item.append(
          element('strong', row[0] + ' · ' + row[1]),
          element(
            'p',
            'Expected: ' +
              readable[row[2]] +
              '. Observed: ' +
              readable[row[column]] +
              '.',
          ),
        );
        list.append(item);
      }
      result.append(element('h4', 'Case evidence'), list);
    }
    model.select.addEventListener('change', refresh);
    slice.select.addEventListener('change', refresh);
    refresh();
  }
  window.FIELD_DEMO_WEEKS = [16, 18];
  window.mountFieldDemo = (container, week) => {
    if (Number(week) === 16) retrievalDemo(container);
    if (Number(week) === 18) evaluationDemo(container);
  };
})();
