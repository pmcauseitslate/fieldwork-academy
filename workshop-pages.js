window.createWorkshopViews = function (h) {
  const pre = (s) => `<pre class="stimulus"><code>${h(s)}</code></pre>`;
  const steps = (items) =>
    `<ol class="workshop-steps">${items.map((item) => `<li>${h(item)}</li>`).join('')}</ol>`;
  function prior(week, work) {
    const content = work.draft
      ? `<p class="journal-excerpt">${h(work.draft)}</p>`
      : '';
    return `<details class="hint"><summary>Revisit the Week ${week} project</summary>${content}${work.projectCode ? pre(work.projectCode) : ''}<a href="#/week/${week}/project">Open the previous project</a></details>`;
  }
  function lesson(week, spec, work, previous, furtherStudy, demo) {
    const ex = spec.example,
      runnable = ex.language !== 'case';
    const material = ex.code && ex.code !== ex.artifact ? pre(ex.artifact) : '';
    return `<div class="eyebrow">WEEK ${String(week).padStart(2, '0')} WORKSHOP</div><h2>Build on Week ${week - 1}</h2><p>${h(spec.bridge)}</p>${prior(week - 1, previous)}
      <div class="worked"><h3>This week’s task</h3><p>${h(spec.goal)}</p></div>
      <details class="workshop-terms" open><summary>New terms</summary><dl>${spec.terms.map(([term, meaning]) => `<dt>${h(term)}</dt><dd>${h(meaning)}</dd>`).join('')}</dl></details>
      ${spec.steps.map((step) => `<h3>${h(step.title)}</h3><p>${h(step.body)}</p>${step.code ? pre(step.code) : ''}`).join('')}
      <section class="first-workshop"><div class="eyebrow">GUIDED EXAMPLE</div><h3>${h(ex.title)}</h3><p>${h(ex.setup)}</p>${steps(ex.steps)}
      ${runnable ? material + '<div id="workshop-editor"></div>' : pre(ex.artifact)}
      <details class="hint"><summary>Check the worked result</summary><p>${h(ex.result)}</p></details>
      <h4>Change one thing</h4><p>${h(ex.change)}</p><label class="field-label" for="workshop-prediction">Predict the outcome</label><textarea id="workshop-prediction" rows="2" maxlength="1200">${h(work.prediction || '')}</textarea>
      <details class="hint"><summary>Compare the changed result</summary><p>${h(ex.changedResult)}</p></details></section>
      <details class="hint"><summary>When something goes wrong</summary>${spec.pitfalls.map((item) => `<h4>${h(item.symptom)}</h4><p>${h(item.fix)}</p>`).join('')}</details>${demo}
      <div class="activity-next"><a class="button" href="#/week/${week}/lab">Open skill lab</a></div>${furtherStudy}`;
  }
  function assignment(spec, work) {
    const t = spec.task;
    return `<div class="eyebrow">INDEPENDENT TASK</div><h2>${h(t.title)}</h2><p>${h(t.brief)}</p>
      ${pre(t.source)}<form id="transfer-form">${t.fields.map((field, i) => `<div class="transfer-field"><label class="field-label" for="transfer-${i}">${h(field.label)}</label><p id="field-hint-${i}">${h(field.hint)}</p><input id="transfer-${i}" data-transfer="${i}" maxlength="800" autocomplete="off" aria-describedby="field-hint-${i} field-result-${i}" class="answer-input" value="${h(work.transferAnswers?.[i] || '')}"><small id="field-result-${i}"></small></div>`).join('')}
      <button class="button btn-secondary">Check task answers</button></form><p role="status" id="transfer-status">${work.transferPassed ? 'Independent answers checked and passed.' : ''}</p>`;
  }
  function project(
    week,
    spec,
    original,
    work,
    references,
    feedback,
    downloads,
  ) {
    const t = spec.task;
    return `${assignment(spec, work)}
      <section class="project-work"><div class="eyebrow">WEEKLY PROJECT</div><h2>Build the portfolio evidence</h2><p>${h(t.evidence)}</p>${t.guide ? steps(t.guide) : ''}
      <details class="hint"><summary>Full project brief and resources</summary><p>${h(original.prompt)}</p><p>${h(original.deliverable)}</p>${downloads}</details>${references}
      <details class="hint"><summary>Help with this project</summary>${spec.pitfalls.map((item) => `<h4>${h(item.symptom)}</h4><p>${h(item.fix)}</p>`).join('')}<a href="#/week/${week}">Revisit the guided example</a></details>
      ${t.starter ? `<p>${t.checks?.length ? 'Complete the starter and run the project checks. Each check must pass before saving the review.' : 'Make the changes in the brief and run the edited project. Record the observed behavior below.'}</p><div id="workshop-editor"></div><p id="project-run-status" class="save-note" role="status">${work.projectRunPassed ? 'Project run recorded.' : ''}</p>` : ''}
      <label class="field-label" for="project-draft">Project evidence</label>${t.template ? '<button type="button" data-outline class="text-link outline-control">Use the journal outline</button>' : ''}
      <textarea id="project-draft" rows="9" maxlength="24000" placeholder="${h(t.template || original.placeholder)}">${h(work.draft || '')}</textarea>
      <p id="draft-status" class="save-note" role="status">Notes are saved in this browser.</p>
      <h3>Review the work</h3>${t.review.map((label, i) => `<label class="choice"><input type="checkbox" name="review" value="${i}" ${work.review?.includes(i) ? 'checked' : ''}><span>${h(label)}</span></label>`).join('')}
      <div class="button-row"><button class="button" data-finish>Save project review</button></div><div id="project-feedback" role="status">${feedback}</div></section>`;
  }
  function normalize(value) {
    return String(value ?? '')
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[‘’]/g, "'")
      .replace(/[–—]/g, '-')
      .trim()
      .replace(/\s+/g, ' ');
  }
  function matches(field, raw) {
    if (field.match === 'literal')
      return field.answers.some(
        (answer) => String(raw ?? '').trim() === String(answer).trim(),
      );
    if (field.match === 'url') {
      const canonical = (text) => {
        const value = String(text ?? '').trim();
        if (!/^\/(?!\/)/.test(value) || value.includes('#')) return null;
        try {
          const url = new URL(value, 'https://academy.invalid');
          if (url.origin !== 'https://academy.invalid') return null;
          url.searchParams.sort();
          return url.pathname + '?' + url.searchParams.toString();
        } catch {
          return null;
        }
      };
      const actual = canonical(raw);
      return (
        actual !== null &&
        field.answers.some((answer) => canonical(answer) === actual)
      );
    }

    const value = normalize(raw);
    if (!value) return false;
    return field.answers.some((answer) => {
      const expected = normalize(answer);
      if (value === expected) return true;
      const numeric = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
      return (
        numeric.test(value) &&
        numeric.test(expected) &&
        Number(value.replaceAll(',', '')) ===
          Number(expected.replaceAll(',', ''))
      );
    });
  }
  return { lesson, project, matches };
};
