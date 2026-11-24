(() => {
  'use strict';
  const levels = window.COURSE_LEVELS;
  const lessons = levels.flatMap((level) => level.lessons);
  const library = window.AI_RESOURCES;
  const labs = window.WEEKLY_LABS;
  const main = document.getElementById('main');
  const key = 'fieldwork-academy-v1';
  const h = (value) =>
    String(value ?? '').replace(
      /[&<>"']/g,
      (char) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[char],
    );
  const paths = {
    path: '<path d="M4 6h6a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h9"/><circle cx="4" cy="6" r="2"/><path d="m16 17 3 3-3 3"/>',
    book: '<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1zM12 6v14"/>',
    library: '<path d="M4 4h3v16H4zM10 4h3v16h-3zM15 6l3-1 4 14-3 1z"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8 14-1 8 5-3 5 3-1-8"/>',
    bolt: '<path d="m14 2-9 12h6l-1 8 9-12h-6z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>',
    levels: '<path d="m12 3 9 5-9 5-9-5zM3 12l9 5 9-5M3 16l9 5 9-5"/>',
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v5m10-5v5M3 10h18"/>',
    compass:
      '<circle cx="12" cy="12" r="9"/><path d="m15.7 8.3-2.2 5.2-5.2 2.2 2.2-5.2z"/>',
    flag: '<path d="M5 21V4m0 1c5-5 9 4 15-1v10c-6 5-10-4-15 0"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
    open: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2M12 14v3"/>',
    chevron: '<path d="m8 10 4 4 4-4"/>',
    right: '<path d="m9 6 6 6-6 6"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    terminal:
      '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 9 3 3-3 3m6 1h5"/>',
    data: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 4 16 4 16 0V6M4 12c0 4 16 4 16 0"/>',
    apps: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20M6 6.5h.1m3 0h.1M6 13h5m-5 3h9"/>',
    ai: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>',
    product:
      '<path d="M3 5h7v5H3zm11 0h7v5h-7zM8 16h8v5H8zM6 10v3h12v-3m-6 3v3"/>',
    venture: '<path d="m3 19 6-9 3 4 3-9 7 14zM15 5V2l5 1-5 1"/>',
    play: '<path d="m8 5 11 7-11 7z"/>',
    tool: '<path d="m5 20 7-7m0-1-7-7 2-2 7 7m-2 3 7 7 2-2-7-7"/>',
    search: '<circle cx="10" cy="10" r="6.5"/><path d="m15 15 5 5"/>',
    external:
      '<path d="M13 4h7v7m0-7L10 14M9 5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
    star: '<path d="m12 2 2.9 6.2 6.8 1-4.9 4.8 1.2 6.8-6-3.2-6 3.2 1.2-6.8-4.9-4.8 6.8-1z"/>',
    pen: '<path d="m4 16-1 5 5-1L20 8l-4-4zM14 6l4 4"/>',
    target:
      '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    save: '<path d="M5 3h12l4 4v14H3V3zM7 3v6h9V3M7 21v-8h10v8"/>',
    download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"/>',
    branch:
      '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="19" r="2"/><path d="M6 7v10m0-3c6 0 12-2 12-6"/>',
  };
  const icon = (name, size = 18) =>
    `<svg aria-hidden="true" class="icon" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.compass}</svg>`;
  const levelIcons = ['terminal', 'data', 'apps', 'ai', 'product', 'venture'];
  const levelTitles = [
    'Programming foundations',
    'Databases & APIs',
    'Application development',
    'Applied AI & automation',
    'Engineering & product',
    'Technology entrepreneurship',
  ];
  const levelBlurbs = [
    'Build your first Python toolkit and track your work with Git.',
    'Turn project records into reliable queries and integrations.',
    'Give your tools an interface that other people can use.',
    'Ground AI outputs in evidence and test an automated workflow.',
    'Define your product, test releases, and plan a dependable system.',
    'Validate a problem, price an MVP, and demonstrate its value.',
  ];
  const num = (n) => String(n).padStart(2, '0');
  const levelOf = (week) =>
    levels.findIndex((level) =>
      level.lessons.some((lesson) => lesson.week === week),
    );
  const allBadges = () => [
    {
      title: 'First steps',
      goal: 'Complete your first week',
      icon: 'compass',
      earned: count() > 0,
    },
    ...levels.map((l, i) => ({
      title: l.badge,
      goal: `Complete Level ${num(i + 1)}`,
      icon: levelIcons[i],
      earned: l.lessons.every((x) => done(x.week)),
    })),
  ];
  function emptyState() {
    return { completed: {}, work: {} };
  }
  function validState(v) {
    return (
      v &&
      typeof v === 'object' &&
      v.completed &&
      typeof v.completed === 'object' &&
      !Array.isArray(v.completed) &&
      v.work &&
      typeof v.work === 'object' &&
      !Array.isArray(v.work)
    );
  }
  let progress = emptyState(),
    writable = true;
  try {
    const cached = JSON.parse(localStorage.getItem(key) || 'null');
    if (validState(cached)) progress = cached;
  } catch {
    /* Storage may be unavailable. */
  }
  function save() {
    try {
      localStorage.setItem(key, JSON.stringify(progress));
    } catch {
      writable = false;
      document.body.classList.add('storage-warning');
    }
  }
  function done(week) {
    return progress.completed[week] === true;
  }
  const count = () => lessons.filter((l) => done(l.week)).length;
  const nextWeek = () => lessons.find((l) => !done(l.week))?.week || 24;
  const available = (w) =>
    w === 1 || lessons.filter((l) => l.week < w).every((l) => done(l.week));
  const levelAvailable = (i) => available(levels[i].lessons[0].week);
  function workFor(week) {
    const w = progress.work[week];
    if (!w || typeof w !== 'object') progress.work[week] = {};
    return progress.work[week];
  }
  const xp = () => count() * 100;
  const pct = () => Math.round((100 * count()) / lessons.length);
  const completedLevels = () =>
    levels.filter((l) => l.lessons.every((x) => done(x.week))).length;
  function toast(msg) {
    const node = document.getElementById('notice');
    node.textContent = msg;
    node.classList.add('on');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => node.classList.remove('on'), 3600);
  }
  function nav(view) {
    document.getElementById('nav').innerHTML = [
      ['course', 'path', 'Learning path', '#/'],
      ['library', 'library', 'Library', '#/library'],
      ['achievements', 'award', 'Achievements', '#/achievements'],
    ]
      .map(
        ([id, im, t, href]) =>
          `<a href="${href}" ${view === id ? 'aria-current="page"' : ''}>${icon(im)}<span>${t}</span></a>`,
      )
      .join('');
    document.getElementById('xp-chip').innerHTML =
      icon('bolt', 15) + `<b>${xp().toLocaleString()} XP</b>`;
  }
  function stamp(im, small = false) {
    return `<span class="stamp ${small ? 'small' : ''}" aria-hidden="true"><span>${icon(im, small ? 23 : 32)}</span></span>`;
  }
  function dashboard() {
    const full = count() === lessons.length;
    const nextBadge = allBadges().find((b) => !b.earned);
    return `<section class="hero"><div class="hero-copy"><div class="hero-kicker"><i></i> FREE INTERACTIVE COURSE</div><h1>The AI Builder’s<br>Field Guide<span>.</span></h1><p>Learn to code, work with AI, and turn a construction problem into a product you can demo.</p><a class="button hero-btn" href="${full ? '#/achievements' : '#/week/' + nextWeek()}">${icon(full ? 'award' : 'compass', 18)} ${full ? 'View achievements' : count() || Object.keys(progress.work).length ? 'Continue learning' : 'Start learning'}</a></div></section>
    <div class="dashboard"><section class="path-section"><div class="section-heading"><div class="eyebrow"><i></i> CURRICULUM</div><h2>Your learning path</h2></div><div class="path-meta">${icon('levels', 16)} 6 levels <b>·</b> ${icon('calendar', 16)} 24 weeks <b>·</b> ${icon('clock', 16)} Self-paced</div>
    <div class="level-list">${levels.map(levelCard).join('')}</div></section>
    <aside class="sidebar"><section class="progress-card"><div class="panel-head"><div class="eyebrow">FIELD JOURNAL</div>${icon('book', 21)}</div><h2>Your progress</h2><div class="progress-total"><b>${pct()}<small>%</small></b><span>of course complete</span></div><div class="track" role="progressbar" aria-label="Course completion" aria-valuenow="${pct()}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct()}%"></i></div>
    <div class="stat-row"><span>${icon('book', 17)} Weeks completed</span><strong>${count()} <em>/ 24</em></strong></div><div class="stat-row"><span>${icon('flag', 17)} Levels completed</span><strong>${completedLevels()} <em>/ 6</em></strong></div><div class="stat-row"><span>${icon('bolt', 17)} Total experience</span><strong>${xp().toLocaleString()} <em>XP</em></strong></div>
    <a class="next-badge" href="#/achievements">${stamp(nextBadge?.icon || 'award', true)}<span><small>${nextBadge ? 'NEXT ACHIEVEMENT' : 'ALL ACHIEVEMENTS EARNED'}</small><b>${h(nextBadge?.title || 'Field guide graduate')}</b></span>${icon('right', 16)}</a></section>
    <a class="library-callout" href="#/library"><span class="callout-icon">${icon('library', 24)}</span><span><b>Resource library</b><small>Lectures, courses, and field notes</small></span>${icon('right', 16)}</a></aside></div>`;
  }
  function levelCard(level, i) {
    const current = levelAvailable(i),
      complete = level.lessons.every((l) => done(l.week));
    const first = level.lessons[0].week,
      last = level.lessons.at(-1).week;
    return `<details class="level-card color-${i} ${current && !complete ? 'available' : ''}"><summary><span class="level-tile">${icon(levelIcons[i], 30)}</span><span class="level-text"><span class="label">LEVEL ${num(i + 1)} <i></i> WEEKS ${num(first)}–${num(last)}</span><strong>${h(levelTitles[i])}</strong><span class="level-desc">${h(levelBlurbs[i])}</span></span><span class="level-end"><span class="status ${current ? 'active' : ''}">${icon(complete ? 'check' : current ? 'open' : 'lock', 13)} ${complete ? 'Complete' : current ? 'Unlocked' : 'Locked'}</span>${icon('chevron', 18)}</span></summary>
      <div class="level-weeks">${!current ? `<p>Complete Level ${num(i)} to unlock these workshops.</p>` : ''}${level.lessons.map((l) => (available(l.week) ? `<a class="week-row" href="#/week/${l.week}"><small>W${num(l.week)}</small><span>${h(l.title)}</span>${icon(done(l.week) ? 'check' : 'right', 16)}</a>` : `<div class="week-row locked"><small>W${num(l.week)}</small><span>${h(l.title)}</span>${icon('lock', 14)}</div>`)).join('')}</div></details>`;
  }

  let filters = { term: '', kind: 'all', level: 'all' };
  const kinds = { video: 'Video', course: 'Course', guide: 'Guide' };
  function resourceCard(r) {
    return `<article class="resource"><div class="resource-meta"><span class="kind">${icon(r.type === 'video' ? 'play' : r.type === 'course' ? 'book' : 'library', 15)} ${kinds[r.type] || 'Resource'}</span><small>${h(r.author)}</small></div><h3>${h(r.title)}</h3><p>${h(r.description)}</p><small class="access">${h(r.access)}</small><div class="resource-actions">${r.youtubeId ? `<button class="button btn-secondary" data-video="${h(r.id)}">${icon('play', 15)} Watch here</button>` : ''}<a href="${h(r.url)}" target="_blank" rel="noopener">${r.youtubeId ? 'YouTube' : r.type === 'course' ? 'Open course' : 'Open resource'} ${icon('external', 14)}</a></div><div class="player"></div></article>`;
  }
  function voiceCard(v) {
    return `<article class="voice resource"><div class="resource-meta"><span class="kind">Field note</span><small>${h(v.handle)}</small></div><h3>${h(v.name)}</h3><p>${h(v.insight)}</p><p class="application"><b>Try it</b> ${h(v.application)}</p><a href="${h(v.url)}" target="_blank" rel="noopener">Read the original post on X ${icon('external', 14)}</a></article>`;
  }
  function libraryPage() {
    return `<div class="page-intro"><div class="eyebrow"><i></i> FIELD RESOURCES</div><h1>Resource library</h1><p>Watch lectures here, open the original courses, and try ideas from people working in AI.</p></div>
    <div class="filters"><label class="search">${icon('search', 20)}<input type="search" id="search" placeholder="Search the library" aria-label="Search the library" value="${h(filters.term)}"></label><label class="select-label">Level <select id="level-filter"><option value="all">All levels</option>${levels.map((l, i) => `<option value="${i + 1}" ${filters.level == i + 1 ? 'selected' : ''}>${num(i + 1)} · ${h(levelTitles[i])}</option>`).join('')}</select></label></div><div class="filter-tabs" aria-label="Filter by resource type">${[
      ['all', 'All resources'],
      ['video', 'Videos'],
      ['course', 'Courses'],
      ['guide', 'Guides & tools'],
      ['voice', 'From X'],
    ]
      .map(
        ([id, label]) =>
          `<button data-kind="${id}" aria-pressed="${filters.kind === id}">${label}</button>`,
      )
      .join('')}</div><div id="resource-results"></div>`;
  }
  function renderResults() {
    const term = filters.term.trim().toLowerCase(),
      filterLevel = (v) =>
        filters.level === 'all' || v.levels.includes(Number(filters.level));
    const res = library.resources.filter(
      (r) =>
        (filters.kind === 'all' || filters.kind === r.type) &&
        filterLevel(r) &&
        [r.title, r.author, r.description, r.type]
          .join(' ')
          .toLowerCase()
          .includes(term),
    );
    const voices = library.voices.filter(
      (v) =>
        (filters.kind === 'all' || filters.kind === 'voice') &&
        filterLevel(v) &&
        [v.name, v.handle, v.insight, v.application]
          .join(' ')
          .toLowerCase()
          .includes(term),
    );
    document.getElementById('resource-results').innerHTML =
      `<p class="result-count" role="status">${res.length + voices.length} ${res.length + voices.length === 1 ? 'resource' : 'resources'}</p><div class="resource-grid">${res.map(resourceCard).join('')}${voices.map(voiceCard).join('')}</div>${!res.length && !voices.length ? '<div class="empty-state"><h3>No matching resources</h3><p>Try another search or clear the filters.</p><button class="button btn-secondary" data-clear>Clear filters</button></div>' : ''}`;
  }
  function achievements() {
    const badges = allBadges();
    return `<div class="page-intro"><div class="eyebrow"><i></i> FIELD JOURNAL</div><h1>Your achievements</h1><p>Collect a badge for your first completed week and one for every level you finish.</p></div>
    <div class="achievement-stats"><div><b>${xp()}</b><span>Experience points</span></div><div><b>${badges.filter((x) => x.earned).length} / ${badges.length}</b><span>Badges earned</span></div><div><b>${count()} / 24</b><span>Weeks completed</span></div></div>
    <div class="badge-grid">${badges.map((b, i) => `<article class="badge-card ${b.earned ? 'earned' : ''} color-${Math.max(0, i - 1)}">${stamp(b.icon)}<div><div class="label">${b.earned ? 'EARNED' : i ? 'LEVEL ' + num(i) : 'MILESTONE'}</div><h3>${h(b.title)}</h3><p>${h(b.goal)}</p></div>${icon(b.earned ? 'check' : 'lock', 17)}</article>`).join('')}</div>
    <div class="journal-tools"><h2>Your field journal</h2><p>Progress, project notes, and practice code are saved in this browser. Download a backup to move them to another device.</p><div class="button-row"><button class="button btn-secondary" id="export-progress">${icon('download', 16)} Download backup</button><label class="button btn-secondary file-button">Restore backup<input type="file" id="import-progress" accept="application/json,.json"></label>${count() === 24 ? `<button class="button" id="export-portfolio">${icon('book', 16)} Download portfolio</button>` : ''}</div><p class="inline-status" id="backup-status" role="status"></p></div>`;
  }
  const entryChecks = [
    {
      prompt:
        'A labor estimate reads the hours from a text field. Which step belongs before the multiplication?',
      correct: 1,
      options: [
        {
          text: 'Append the currency symbol to the hours.',
          feedback:
            'A formatted string cannot represent the numeric hours in the calculation.',
        },
        {
          text: 'Convert the text to a number and check that it is valid.',
          feedback:
            'A numeric conversion and a range check keep invalid entries out of the estimate.',
        },
        {
          text: 'Convert only the final printed total to a number.',
          feedback:
            'The inputs must be valid numbers before arithmetic begins.',
        },
      ],
    },
    {
      prompt:
        'You need the same estimate in a form and a report. Where should the calculation live?',
      correct: 2,
      options: [
        {
          text: 'In two copies that each return formatted strings.',
          feedback:
            'Duplicated calculations can drift as the pricing rule changes.',
        },
        {
          text: 'Inside the code that prints a report heading.',
          feedback: 'A form would then depend on the report layout.',
        },
        {
          text: 'In one function that accepts inputs and returns a numeric result.',
          feedback:
            'Both interfaces can use the same calculation and format its result for their readers.',
        },
      ],
    },
    {
      prompt: 'Which test isolates a markup error in a quote?',
      correct: 0,
      options: [
        {
          text: 'Use $100 of direct cost and 10% markup. Expect $110.',
          feedback:
            'The direct cost and expected result are known, so the test exposes a bad markup calculation.',
        },
        {
          text: 'Run the quote twice and check that both results match.',
          feedback: 'A function can repeat the same incorrect answer.',
        },
        {
          text: 'Check that the result has a dollar sign.',
          feedback: 'A formatting check can pass with an incorrect amount.',
        },
      ],
    },
  ];
  function exam(week) {
    const now = lessons[week - 1].questions;
    if (week === 1) return [...now, ...entryChecks];
    const previous = lessons[week - 2].questions;
    const old = lessons.slice(0, Math.max(week - 2, 0));
    const earlierLevels = old.filter((l) => levelOf(l.week) < levelOf(week));
    const pool = earlierLevels.length ? earlierLevels : old;
    const review = pool.length
      ? pool[(week * 3) % pool.length].questions[(week + 1) % 2]
      : entryChecks[1];
    const extra = old.length
      ? old[(week + 1) % old.length].questions[week % 2]
      : entryChecks[2];
    return [...now, previous[week % 2], review, extra];
  }
  const tabs = [
    ['learn', 'book', 'Lesson'],
    ['lab', 'terminal', 'Skill lab'],
    ['quiz', 'target', 'Knowledge check'],
    ['project', 'pen', 'Project'],
  ];
  function lessonPage(week, tab) {
    if (!available(week))
      return `<div class="empty-state locked-page">${stamp('lock')}<h1>Week ${week} is locked</h1><p>Complete Week ${nextWeek()} to advance along the learning path.</p><a class="button" href="#/week/${nextWeek()}">Open current week</a></div>`;
    const lesson = lessons[week - 1],
      li = levelOf(week),
      work = workFor(week);
    return `<div class="breadcrumbs"><a href="#/">Learning path</a> ${icon('right', 14)} <span>Level ${num(li + 1)}</span></div><div class="lesson-header"><div class="eyebrow"><i></i> WEEK ${num(week)} OF 24</div><h1>${h(lesson.title)}</h1><p>${h(lesson.summary)}</p><div class="path-meta">${icon(levelIcons[li], 16)} ${h(levelTitles[li])}<b>·</b>${icon('clock', 16)} 8–10 hours including project</div></div>
    <div class="lesson-tabs">${tabs.map(([id, im, t]) => `<a href="#/week/${week}/${id}" aria-current="${id === tab ? 'page' : 'false'}">${icon(im, 17)} ${t}</a>`).join('')}</div>
    <div class="lesson-grid"><article class="lesson-panel" id="activity">${tab === 'lab' ? labPage(week) : tab === 'quiz' ? quizPage(week) : tab === 'project' ? projectPage(week) : learnPage(week)}</article>
    <aside class="work-sidebar"><div class="panel-head"><div class="eyebrow">WEEK ${num(week)}</div>${icon('flag', 19)}</div><h2>Field checklist</h2><ul class="checklist">${[
      ['lab', 'Pass the skill lab', work.labPassed],
      ['quiz', 'Score 80% on the quiz', Number(work.best) >= 80],
      ['project', 'Review your weekly project', work.reviewed],
    ]
      .map(
        ([route, label, done]) =>
          `<li><a href="#/week/${week}/${route}"><i class="check-circle ${done ? 'checked' : ''}">${done ? icon('check', 12) : ''}</i> ${label}</a></li>`,
      )
      .join(
        '',
      )}</ul><div class="week-award">${icon('bolt', 17)} ${done(week) ? '100 XP earned' : '100 XP on completion'}</div><a class="text-link" href="#/">Return to learning path</a></aside></div>`;
  }
  function learnPage(week) {
    const lesson = lessons[week - 1],
      li = levelOf(week);
    const specific = library.resources.filter((r) => r.weeks?.includes(week));
    const candidates = library.resources.filter((r) =>
      r.levels.includes(li + 1),
    );
    const picks = (specific.length ? specific : candidates).slice(0, 4);
    const dl = (window.WEEKLY_DOWNLOADS || {})[week] || [];
    return `<div class="eyebrow">WORKSHOP</div><h2>What you’ll learn</h2>${lesson.teaching.map((t) => `<p>${h(t)}</p>`).join('')}<div class="worked"><div class="eyebrow">WORKED EXAMPLE</div><h3>${h(lesson.example.title)}</h3><p>${h(lesson.example.text)}</p></div>
    ${dl.length ? `<h3>Project files</h3><div class="downloads">${dl.map((d) => `<a href="${h(d.filename || d.file || d.url || d.href)}" download>${icon('download', 16)} ${h(d.label || d.title)}</a>`).join('')}</div>` : ''}
    <h3 class="subheading">Study materials</h3>${picks.map(resourceCard).join('')}<a class="text-link" href="#/library/${li + 1}">Browse all Level ${num(li + 1)} resources</a><div class="activity-next"><a class="button" href="#/week/${week}/lab">Open skill lab</a></div>`;
  }
  function labPage(week) {
    const lab = labs[week - 1],
      w = workFor(week),
      order =
        Array.isArray(w.order) && w.order.length === lab.options?.length
          ? w.order
          : lab.options?.map((_, i) => i);
    let controls = '';
    if (lab.kind === 'short')
      controls = `<label class="field-label" for="lab-answer">Your answer</label><input class="answer-input" id="lab-answer" autocomplete="off" value="${h(w.short || '')}">`;
    if (lab.kind === 'select')
      controls = lab.options
        .map(
          (o, i) =>
            `<label class="choice"><input type="checkbox" name="lab-select" value="${i}" ${w.selected?.includes(i) ? 'checked' : ''}><span>${h(o)}</span></label>`,
        )
        .join('');
    if (lab.kind === 'order')
      controls = `<ol class="order-list">${order.map((index, pos) => `<li><span>${h(lab.options[index])}</span><div><button type="button" data-move="-1" data-pos="${pos}" aria-label="Move step ${pos + 1} up" ${!pos ? 'disabled' : ''}>↑</button><button type="button" data-move="1" data-pos="${pos}" aria-label="Move step ${pos + 1} down" ${pos === order.length - 1 ? 'disabled' : ''}>↓</button></div></li>`).join('')}</ol>`;
    return `<div class="eyebrow">SKILL LAB</div><h2>${h(lab.title)}</h2><p>${h(lab.brief)}</p>${lab.stimulus ? `<pre class="stimulus"><code>${h(lab.stimulus)}</code></pre>` : ''}<form id="lab-form">${controls}<div class="button-row"><button class="button">Check my work</button></div></form>
    <details class="hint"><summary>Show a hint</summary><p>${h(lab.hint)}</p></details><div role="status" id="lab-feedback">${w.labPassed ? `<div class="feedback good">${icon('check', 17)}<span>Skill lab passed. ${h(lab.explanation)}</span></div>` : ''}</div>
    ${window.PRACTICE_WEEKS?.includes(week) ? '<div id="code-practice"></div>' : ''}<div class="activity-next"><a class="text-link" href="#/week/${week}/quiz">Open knowledge check</a></div>`;
  }
  function quizPage(week) {
    const w = workFor(week),
      qs = exam(week);
    return `<div class="eyebrow">KNOWLEDGE CHECK</div><h2>Test your understanding</h2><p>Answer five questions. Four correct answers pass the week’s check. ${week > 1 ? 'Earlier topics return as you progress.' : ''}</p><form id="quiz-form">${qs.map((q, i) => `<fieldset><legend><span>${num(i + 1)}</span> ${h(q.prompt)}</legend>${q.options.map((opt, j) => `<label class="choice"><input required type="radio" name="q${i}" value="${j}" ${w.quizChoices?.[i] === j ? 'checked' : ''}><span>${h(opt.text)}</span></label>`).join('')}<div class="q-feedback" id="q-feedback-${i}"></div></fieldset>`).join('')}<div class="button-row"><button class="button">Grade my answers</button>${w.best != null ? `<small>Best score: ${Number(w.best)}%</small>` : ''}</div></form><div role="status" id="quiz-feedback"></div><div class="activity-next"><a class="text-link" href="#/week/${week}/project">Open weekly project</a></div>`;
  }
  const reviewLabels = [
    'I built the deliverable using fictional or authorized data.',
    'I tried a normal case and recorded what happened in another case.',
    'I can explain a design choice and make a change independently.',
  ];
  function projectPage(week) {
    const project = lessons[week - 1].project,
      w = workFor(week),
      marked = Array.isArray(w.review) ? w.review : [];
    return `<div class="eyebrow">WEEKLY PROJECT</div><h2>Build it yourself</h2><p>${h(project.prompt)}</p>${project.deliverable ? `<div class="worked"><div class="eyebrow">DELIVERABLE</div><p>${h(project.deliverable)}</p></div>` : ''}<label class="field-label" for="project-draft">Project evidence</label><p class="muted">Record what you built, a test result, and one change you made. You can include a link to your work.</p><textarea id="project-draft" rows="7" maxlength="24000" placeholder="${h(project.placeholder)}">${h(w.draft || '')}</textarea><p class="save-note" id="draft-status" role="status">${w.draft ? 'Draft saved in this browser.' : 'Your notes stay in this browser.'}</p><h3>Review your work</h3><p class="muted">Assess the project yourself. The quiz and skill lab are graded automatically.</p>${reviewLabels.map((s, i) => `<label class="choice"><input type="checkbox" name="review" value="${i}" ${marked.includes(i) ? 'checked' : ''}><span>${s}</span></label>`).join('')}<div class="button-row"><button class="button" data-finish>${done(week) ? 'Save review' : 'Complete week'}</button></div><div role="status" id="project-feedback">${done(week) ? finishMessage(week) : ''}</div>`;
  }
  function finishMessage(week) {
    return `<div class="feedback good"><span><b>Week ${week} completed.</b> 100 XP earned. ${week < 24 ? `<a href="#/week/${week + 1}">Open Week ${week + 1}</a>` : '<a href="#/achievements">See your achievements and download your portfolio</a>'}</span></div>`;
  }

  let active = { page: 'course', week: 0, tab: 'learn' },
    practiceCleanup;
  function render(moveFocus = false) {
    if (typeof practiceCleanup === 'function') practiceCleanup();
    practiceCleanup = null;
    const route = (location.hash.slice(1) || '/').split('/').filter(Boolean);
    let content = '',
      title = 'The AI Builder’s Field Guide';
    if (
      route[0] === 'week' &&
      /^\d+$/.test(route[1]) &&
      Number(route[1]) >= 1 &&
      Number(route[1]) <= 24
    ) {
      const week = Number(route[1]),
        tab = tabs.some((t) => t[0] === route[2]) ? route[2] : 'learn';
      active = { page: 'course', week, tab };
      content = lessonPage(week, tab);
      title = lessons[week - 1].title;
    } else if (route[0] === 'library') {
      active = { page: 'library' };
      if (route[1] && /^[1-6]$/.test(route[1]))
        filters = { term: '', kind: 'all', level: route[1] };
      content = libraryPage();
      title = 'Resource library';
    } else if (route[0] === 'achievements') {
      active = { page: 'achievements' };
      content = achievements();
      title = 'Your achievements';
    } else {
      active = { page: 'course' };
      content = dashboard();
    }
    main.innerHTML = content;
    nav(active.page);
    document.title = title + ' · Fieldwork Academy';
    if (active.page === 'library') renderResults();
    if (
      active.tab === 'lab' &&
      document.getElementById('code-practice') &&
      window.mountPractice
    )
      practiceCleanup = window.mountPractice(
        document.getElementById('code-practice'),
        active.week,
      );
    if (moveFocus) {
      window.scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
  }
  function refreshChecklist() {
    const links = main.querySelectorAll('.checklist a');
    if (!links.length) return;
    const w = workFor(active.week);
    [!!w.labPassed, Number(w.best) >= 80, !!w.reviewed].forEach((ok, i) => {
      const el = links[i].querySelector('i');
      el.classList.toggle('checked', ok);
      el.innerHTML = ok ? icon('check', 12) : '';
    });
  }
  function normal(v) {
    return String(v)
      .normalize('NFKC')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');
  }
  function gradeLab() {
    const week = active.week,
      lab = labs[week - 1],
      w = workFor(week);
    let pass = false;
    if (lab.kind === 'short') {
      w.short = document.getElementById('lab-answer').value;
      pass = lab.answer.map(normal).includes(normal(w.short));
    }
    if (lab.kind === 'select') {
      w.selected = [
        ...main.querySelectorAll('input[name="lab-select"]:checked'),
      ].map((i) => Number(i.value));
      pass =
        w.selected.length === lab.answer.length &&
        lab.answer.every((j) => w.selected.includes(j));
    }
    if (lab.kind === 'order') {
      const order = w.order || lab.options.map((_, i) => i);
      pass = order.every((j, i) => j === lab.answer[i]);
    }
    if (pass) w.labPassed = true;
    save();
    refreshChecklist();
    document.getElementById('lab-feedback').innerHTML =
      `<div class="feedback ${pass ? 'good' : 'retry'}"><span><b>${pass ? 'Skill lab passed.' : 'Try again.'}</b> ${h(pass ? lab.explanation : lab.hint)}</span></div>`;
  }
  function gradeQuiz() {
    const week = active.week,
      w = workFor(week),
      qs = exam(week),
      ans = qs.map((_, i) =>
        Number(main.querySelector(`input[name="q${i}"]:checked`).value),
      );
    const score = qs.filter((q, i) => q.correct === ans[i]).length * 20;
    w.quizChoices = ans;
    w.best = Math.max(Number(w.best) || 0, score);
    save();
    refreshChecklist();
    qs.forEach((q, i) => {
      const ok = q.correct === ans[i];
      document.getElementById('q-feedback-' + i).innerHTML =
        `<p class="answer-review ${ok ? 'good' : 'retry'}"><b>${ok ? 'Correct.' : 'Review this one.'}</b> ${h(q.options[ans[i]].feedback)}</p>`;
    });
    const out = document.getElementById('quiz-feedback');
    out.innerHTML = `<div class="feedback ${score >= 80 ? 'good' : 'retry'}"><span><b>${score}% · ${score / 20} of 5 correct.</b> ${score >= 80 ? 'Knowledge check passed.' : 'Read the feedback and try again to reach 80%.'}</span></div>`;
    out.scrollIntoView({ block: 'nearest' });
  }
  function finish() {
    const week = active.week,
      w = workFor(week),
      target = document.getElementById('project-feedback');
    const draft = document.getElementById('project-draft').value.trim();
    w.draft = draft;
    w.review = [...main.querySelectorAll('input[name="review"]:checked')].map(
      (el) => Number(el.value),
    );
    w.reviewed = draft.length >= 20 && w.review.length === reviewLabels.length;
    save();
    refreshChecklist();
    const missing = [];
    if (!w.labPassed) missing.push('pass the skill lab');
    if (!(Number(w.best) >= 80))
      missing.push('earn at least 80% on the knowledge check');
    if (draft.length < 20)
      missing.push('add at least 20 characters of project evidence');
    if (w.review.length < 3) missing.push('check each project review item');
    if (missing.length) {
      target.innerHTML = `<div class="feedback retry"><span>To complete this week, ${h(missing.join(', '))}.</span></div>`;
      return;
    }
    const newAward = !done(week);
    progress.completed[week] = true;
    save();
    nav('course');
    target.innerHTML = finishMessage(week);
    document.querySelector('.week-award').innerHTML =
      icon('bolt', 17) + ' 100 XP earned';
    if (newAward) {
      const level = levels[levelOf(week)];
      toast(
        level.lessons.at(-1).week === week
          ? 'Level complete · ' + level.badge
          : 'Week complete · 100 XP earned',
      );
    }
  }
  function download(name, data, type) {
    const src = URL.createObjectURL(new Blob([data], { type })),
      a = document.createElement('a');
    a.href = src;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(src), 1000);
  }
  function sanitizedBackup(raw) {
    if (
      raw?.course !== 'fieldwork-academy' ||
      raw.version !== 1 ||
      !validState(raw.progress)
    )
      throw Error(
        'Choose a Fieldwork Academy backup downloaded from this course.',
      );
    const clean = emptyState();
    let continuous = true;
    for (const l of lessons) {
      const src = raw.progress.work[l.week],
        lab = labs[l.week - 1];
      if (src && typeof src === 'object') {
        const w = {};
        for (const [k, max] of [
          ['draft', 24000],
          ['short', 800],
        ])
          if (typeof src[k] === 'string') w[k] = src[k].slice(0, max);
        for (const [k, max] of [
          ['order', lab.options?.length || 0],
          ['selected', lab.options?.length || 0],
          ['review', 3],
        ]) {
          if (Array.isArray(src[k])) {
            const a = [
              ...new Set(
                src[k].filter((n) => Number.isInteger(n) && n >= 0 && n < max),
              ),
            ];
            if (k !== 'order' || a.length === max) w[k] = a;
          }
        }
        if (Array.isArray(src.quizChoices) && src.quizChoices.length === 5)
          w.quizChoices = src.quizChoices.map((n) =>
            Number.isInteger(n) && n >= 0 && n < 3 ? n : null,
          );
        if (Number.isInteger(src.best) && src.best >= 0 && src.best <= 100)
          w.best = src.best;
        w.labPassed = src.labPassed === true;
        w.reviewed =
          src.reviewed === true &&
          w.review?.length === 3 &&
          (w.draft || '').trim().length >= 20;
        clean.work[l.week] = w;
      }
      if (continuous && raw.progress.completed[l.week] === true)
        clean.completed[l.week] = true;
      else continuous = false;
    }
    return clean;
  }
  main.addEventListener('submit', (e) => {
    if (e.target.id === 'lab-form') {
      e.preventDefault();
      gradeLab();
    }
    if (e.target.id === 'quiz-form') {
      e.preventDefault();
      gradeQuiz();
    }
  });
  main.addEventListener('input', (e) => {
    const el = e.target;
    if (el.id === 'search') {
      filters.term = el.value;
      renderResults();
    }
    if (el.id === 'project-draft') {
      const w = workFor(active.week);
      w.draft = el.value;
      w.reviewed = false;
      save();
      refreshChecklist();
      document.getElementById('draft-status').textContent = writable
        ? 'Draft saved in this browser.'
        : 'Browser storage unavailable. Download a backup before leaving.';
    }
    if (el.id === 'lab-answer') {
      workFor(active.week).short = el.value;
      save();
    }
  });
  main.addEventListener('change', async (e) => {
    const el = e.target;
    if (el.id === 'level-filter') {
      filters.level = el.value;
      renderResults();
    }
    if (el.name === 'review') {
      const w = workFor(active.week);
      w.review = [...main.querySelectorAll('[name="review"]:checked')].map(
        (i) => Number(i.value),
      );
      w.reviewed = false;
      save();
      refreshChecklist();
    }
    if (el.name === 'lab-select') {
      workFor(active.week).selected = [
        ...main.querySelectorAll('input[name="lab-select"]:checked'),
      ].map((i) => Number(i.value));
      save();
    }
    if (active.week && /^q[0-4]$/.test(el.name)) {
      const w = workFor(active.week);
      w.quizChoices = Array.from({ length: 5 }, (_, i) => {
        const n = main.querySelector(`[name="q${i}"]:checked`);
        return n ? Number(n.value) : null;
      });
      save();
    }
    if (el.id === 'import-progress' && el.files?.[0]) {
      try {
        if (el.files[0].size > 5000000)
          throw Error('This backup is too large.');
        const imported = JSON.parse(await el.files[0].text());
        const clean = sanitizedBackup(imported);
        if (
          Object.keys(progress.work).length &&
          !window.confirm(
            'Replace this browser’s field journal with the selected backup?',
          )
        ) {
          el.value = '';
          return;
        }
        const code = imported.practice || {};
        for (const week of window.PRACTICE_WEEKS || []) {
          const storageKey = 'fieldwork.practice.v1.' + week;
          if (typeof code[week] === 'string')
            localStorage.setItem(storageKey, code[week].slice(0, 20000));
          else localStorage.removeItem(storageKey);
        }
        progress = clean;
        save();
        render();
        toast('Field journal restored.');
      } catch (err) {
        document.getElementById('backup-status').textContent =
          err instanceof SyntaxError
            ? 'This file is not a valid course backup.'
            : err.message;
        el.value = '';
      }
    }
  });
  main.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    if (button.dataset.kind) {
      filters.kind = button.dataset.kind;
      main
        .querySelectorAll('[data-kind]')
        .forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      renderResults();
    }
    if (button.hasAttribute('data-clear')) {
      filters = { kind: 'all', term: '', level: 'all' };
      main.innerHTML = libraryPage();
      renderResults();
    }
    if (button.dataset.video) {
      const r = library.resources.find((r) => r.id === button.dataset.video),
        node = button.closest('.resource').querySelector('.player');
      if (!r || !r.youtubeId) return;
      const isOpen = !!node.firstElementChild;
      node.innerHTML = isOpen
        ? ''
        : `<iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(r.youtubeId)}" title="${h(r.title)}" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      button.innerHTML =
        icon('play', 15) + (isOpen ? ' Watch here' : ' Close player');
      button.setAttribute('aria-expanded', String(!isOpen));
    }
    if (button.hasAttribute('data-move')) {
      const w = workFor(active.week),
        lab = labs[active.week - 1],
        pos = Number(button.dataset.pos),
        to = pos + Number(button.dataset.move);
      const seq = w.order || lab.options.map((_, i) => i);
      if (to < 0 || to >= seq.length) return;
      [seq[pos], seq[to]] = [seq[to], seq[pos]];
      w.order = seq;
      save();
      const list = main.querySelector('.order-list');
      const holder = document.createElement('div');
      holder.innerHTML = labPage(active.week);
      list.replaceWith(holder.querySelector('.order-list'));
      main.querySelector(`[data-pos="${to}"]:not(:disabled)`)?.focus();
    }
    if (button.hasAttribute('data-finish')) finish();
    if (button.id === 'export-progress') {
      const practice = {};
      for (const week of window.PRACTICE_WEEKS || []) {
        try {
          const code = localStorage.getItem('fieldwork.practice.v1.' + week);
          if (code !== null) practice[week] = code;
        } catch {
          /* Other journal data can still be exported. */
        }
      }
      download(
        'fieldwork-journal.json',
        JSON.stringify(
          { course: 'fieldwork-academy', version: 1, progress, practice },
          null,
          2,
        ),
        'application/json',
      );
    }
    if (button.id === 'export-portfolio')
      download(
        'fieldwork-portfolio.md',
        [
          '# My Fieldwork AI portfolio',
          ...lessons.map(
            (l) =>
              `## Week ${l.week} · ${l.title}\n\n${workFor(l.week).draft || ''}`,
          ),
        ].join('\n\n'),
        'text/markdown',
      );
  });
  document.querySelector('.skip').addEventListener('click', (event) => {
    event.preventDefault();
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: 'start' });
  });
  window.addEventListener('hashchange', () => render(true));
  window.addEventListener('storage', (e) => {
    if (e.key === key && e.newValue) {
      try {
        const next = JSON.parse(e.newValue);
        if (validState(next)) {
          progress = next;
          if (!main.querySelector('input:focus,textarea:focus')) render();
        }
      } catch {
        /* Keep this tab's current journal. */
      }
    }
  });
  render();
})();
