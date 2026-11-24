const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { webcrypto } = require('node:crypto');

const course = { window: {}, crypto: webcrypto };
for (const file of ['course.js', 'assessment.js']) {
  vm.runInNewContext(
    fs.readFileSync(path.join(__dirname, '..', file), 'utf8'),
    course,
  );
}
const engine = course.window.FIELD_ASSESSMENT;
const lessons = course.window.COURSE_LEVELS.flatMap((level) => level.lessons);

test('saved papers retain five distinct, gradeable scenarios in all 24 weeks', () => {
  assert.equal(lessons.length, 24);
  for (const lesson of lessons) {
    assert.ok(lesson.questions.length >= 4, 'Missing weekly question bank');
    const previous = new Set();
    for (let sequence = 1; sequence <= 4; sequence++) {
      const attempt = engine.create(10, sequence, 1000);
      const paper = engine.paper(lessons, lesson.week, attempt);
      assert.equal(new Set(paper.map((q) => q.prompt)).size, 5);
      assert.ok(paper.some((q) => q.sourceWeek === lesson.week));
      if (lesson.week > 1)
        assert.ok(paper.some((q) => q.sourceWeek < lesson.week));
      for (const q of paper) {
        assert.equal(q.options.length, 3);
        assert.ok(q.options[q.correct].feedback);
      }
      previous.add(JSON.stringify(paper.map((q) => q.prompt).sort()));
      const restored = engine.restore(JSON.parse(JSON.stringify(attempt)));
      assert.equal(restored.deadline, 601000);
      assert.equal(
        JSON.stringify(engine.paper(lessons, lesson.week, restored)),
        JSON.stringify(paper),
      );
      assert.equal(engine.result(paper, restored).score, 0);
      restored.answers = paper.map((q) => q.correct);
      restored.answers[0] = null;
      assert.equal(engine.result(paper, restored).score, 80);
    }
    assert.ok(previous.size >= 2, 'Retakes should vary the selected questions');
  }
});

test('expired attempts retain the submission time and extended deadlines survive restore', () => {
  const attempt = engine.create(100, 1, 2000);
  attempt.answers[1] = 2;
  attempt.ended = attempt.deadline;
  attempt.expired = true;
  const restored = engine.restore(JSON.parse(JSON.stringify(attempt)));
  assert.equal(restored.ended, 6002000);
  assert.equal(restored.expired, true);
  assert.equal(restored.answers[1], 2);
  assert.equal(
    engine.restore({ ...attempt, deadline: attempt.deadline + 1 }),
    null,
  );
  assert.equal(engine.restore({ ...attempt, seed: -1 }), null);
});

test('old journals retain the original Week 1 item in direct and cumulative papers', () => {
  // Saved answers and seeds from the original bank exercise current, previous
  // and older-week draws without depending on a copy of the original course.
  const archived = [
    { week: 1, seed: 0, slot: 2, answers: [2, 2, 0, 1, 1] },
    { week: 2, seed: 1, slot: 3, answers: [0, 1, 1, 0, 1] },
    { week: 7, seed: 186, slot: 0, answers: [1, 0, 1, 2, 2] },
    { week: 24, seed: 306, slot: 0, answers: [2, 1, 1, 1, 0] },
  ];
  for (const { week, seed, slot, answers } of archived) {
    const saved = {
      seed,
      sequence: 1,
      started: 1000,
      deadline: 601000,
      answers,
    };
    if (week !== 1) saved.ended = 10000;
    const old = engine.restore(saved);
    assert.equal(old.bankVersion, 1);
    assert.equal(old.ended, saved.ended);
    const paper = engine.paper(lessons, week, old);
    const originalQuestion = paper[slot];
    assert.equal(
      originalQuestion.prompt,
      'The terminal reports that it cannot find workload.py. What is the quickest informative check?',
    );
    assert.equal(
      originalQuestion.options[answers[slot]].text,
      'List the current folder and look for the exact filename.',
    );
    assert.equal(engine.result(paper, old).score, 100);
    assert.equal(
      JSON.stringify(engine.paper(lessons, week, saved)),
      JSON.stringify(paper),
    );

    const fresh = { ...engine.create(10, 1, 1000), seed };
    assert.equal(fresh.bankVersion, 2);
    assert.equal(engine.restore(fresh).bankVersion, 2);
    const updated = engine.paper(lessons, week, fresh);
    assert.equal(updated[slot].prompt, lessons[0].questions[2].prompt);
    assert.notEqual(updated[slot].prompt, originalQuestion.prompt);
    assert.ok(!updated.some((q) => q.prompt === originalQuestion.prompt));
  }
  assert.equal(
    engine.restore({ ...engine.create(10, 1), bankVersion: 99 }),
    null,
  );
});
