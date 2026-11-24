const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const context = { window: {}, URL };
for (const filename of [
  'workshops-02-08.js',
  'workshops-09-16.js',
  'workshops-17-24.js',
  'workshop-pages.js',
]) {
  vm.runInNewContext(
    fs.readFileSync(path.join(root, filename), 'utf8'),
    context,
  );
}
const specs = context.window.ACADEMY_WORKSHOPS;
const views = context.window.createWorkshopViews((text) => String(text));

test('every workshop has a guided change, a different independent case and a reviewable project', () => {
  assert.deepEqual(
    Object.keys(specs).map(Number),
    Array.from({ length: 23 }, (_, i) => i + 2),
  );
  for (const [week, s] of Object.entries(specs)) {
    assert.ok(
      s.bridge &&
        s.goal &&
        s.terms.length &&
        s.steps.length &&
        s.pitfalls.length,
      'Incomplete lesson in ' + week,
    );
    assert.ok(
      s.example.artifact &&
        s.example.result &&
        s.example.change &&
        s.example.changedResult,
    );
    assert.notEqual(s.example.artifact, s.task.source);
    assert.ok(s.task.fields.length >= 2 && s.task.evidence);
    assert.equal(s.task.review.length, 3);
    for (const field of s.task.fields) {
      assert.ok(
        field.label && field.hint && field.feedback && field.answers.length,
      );
      for (const alternative of field.answers)
        assert.ok(views.matches(field, alternative));
      assert.equal(views.matches(field, '   '), false);
    }
    if (s.task.starter) {
      assert.ok(['html', 'sql', 'python'].includes(s.task.language));
      assert.ok(s.task.checks?.every((check) => check.label && check.code));
    }
    for (const spec of [s.task, s.example]) {
      for (const file of Object.values(spec.assetFiles || {})) {
        assert.ok(
          file.startsWith('assets/academy/') &&
            fs.existsSync(path.join(root, file)),
          week + ' missing ' + file,
        );
      }
    }
  }
});

test('typed answers preserve meaningful differences in units, signs and decisions', () => {
  const field = { answers: ['1200', '1,200 tokens'] };
  assert.ok(views.matches(field, ' 1,200.00 '));
  assert.ok(views.matches(field, '1,200 TOKENS'));
  assert.equal(views.matches(field, '-1200'), false);
  assert.equal(views.matches(field, '1200%'), false);
  assert.equal(views.matches({ answers: ['no'] }, 'not'), false);
});

test('request paths and code identifiers keep their meaning', () => {
  const route = { match: 'url', answers: ['/activity?team=fern&cursor=R8'] };
  assert.ok(views.matches(route, '/activity?cursor=R8&team=fern'));
  assert.equal(views.matches(route, '/activity?team=fern&cursor=r8'), false);
  assert.equal(
    views.matches(route, '//another.example/activity?team=fern&cursor=R8'),
    false,
  );
  assert.equal(
    views.matches(
      { match: 'literal', answers: ['project_code'] },
      'PROJECT_CODE',
    ),
    false,
  );
});
