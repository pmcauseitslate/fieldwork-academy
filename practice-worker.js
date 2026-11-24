/* Learner code runs in a disposable worker. Only this run's sample data is available. */
let week;
let sqlite;

const pythonCases = {
  1: {
    name: 'labor_cost',
    cases: [
      { args: [3, 6, 24], expected: 432 },
      { args: [2, 4.5, 32], expected: 288 },
      { args: [1, 0, 25], expected: 0 },
      { args: [4, 2, 18.75], expected: 150 },
    ],
  },
  2: {
    name: 'budget_status',
    cases: [
      { args: [[600, 240, 160], 1000], expected: 'within' },
      { args: [[600, 240, 165], 1000], expected: 'over' },
      { args: [[100, 200], 1000], expected: 'within' },
      { args: [[], 0], expected: 'within' },
    ],
  },
};

async function runPython(source) {
  let stdout = '';
  Sk.configure({
    __future__: Sk.python3,
    execLimit: 2000,
    output: (message) => {
      if (stdout.length < 1000)
        stdout += String(message).slice(0, 1000 - stdout.length);
    },
    read: (name) => {
      throw new Error(
        `This exercise uses built-in Python only. Cannot load ${name}.`,
      );
    },
  });
  const program = await Sk.misceval.asyncToPromise(() =>
    Sk.importMainWithBody('<practice>', false, source, true),
  );
  const exercise = pythonCases[week];
  const learnerFunction = program.$d[exercise.name];
  if (!learnerFunction)
    throw new Error(
      `Define a function named ${exercise.name} with the arguments shown in the starter.`,
    );
  const cases = [];
  for (const test of exercise.cases) {
    const args = test.args.map((value) => Sk.ffi.remapToPy(value));
    const result = await Sk.misceval.asyncToPromise(() =>
      Sk.misceval.callsimOrSuspend(learnerFunction, ...args),
    );
    const actual = Sk.ffi.remapToJs(result);
    const passed =
      typeof actual === typeof test.expected && actual === test.expected;
    const call = `${exercise.name}(${test.args.map((x) => JSON.stringify(x)).join(', ')})`;
    const shown =
      actual == null
        ? 'None'
        : String(JSON.stringify(actual) ?? actual).slice(0, 140);
    cases.push({
      passed,
      message: `${call} expected ${JSON.stringify(test.expected)}, returned ${shown}.`,
    });
  }
  return { cases, stdout };
}

const queryCases = [
  {
    name: 'Two projects, one closed RFI',
    rfis: [
      [101, 20, 'open'],
      [102, 10, 'closed'],
      [103, 10, 'open'],
    ],
    expected: [
      [101, 'East Wing'],
      [103, 'North Yard'],
    ],
  },
  {
    name: 'All closed',
    rfis: [
      [205, 20, 'closed'],
      [202, 10, 'closed'],
    ],
    expected: [],
  },
  {
    name: 'Mixed order and repeated project',
    rfis: [
      [307, 10, 'open'],
      [301, 20, 'closed'],
      [305, 20, 'open'],
      [304, 10, 'open'],
    ],
    expected: [
      [304, 'North Yard'],
      [305, 'East Wing'],
      [307, 'North Yard'],
    ],
  },
];

function runSql(source) {
  const cases = [];
  for (const test of queryCases) {
    const db = new sqlite.Database();
    try {
      db.run(
        'CREATE TABLE projects (id INTEGER, name TEXT); CREATE TABLE rfis (id INTEGER, project_id INTEGER, status TEXT);',
      );
      db.run(
        "INSERT INTO projects VALUES (10, 'North Yard'), (20, 'East Wing')",
      );
      for (const row of test.rfis)
        db.run('INSERT INTO rfis VALUES (?, ?, ?)', row);
      db.run('PRAGMA query_only=ON');
      const statements = db.iterateStatements(source);
      const rows = [];
      let count = 0;
      let columns = 0;
      for (const statement of statements) {
        if (++count > 1)
          throw new Error('Submit one SELECT query for this exercise.');
        columns = statement.getColumnNames().length;
        if (!columns)
          throw new Error(
            'Your query needs to return the RFI number and project name.',
          );
        while (statement.step()) {
          rows.push(statement.get());
          if (rows.length > 30)
            throw new Error(
              'The query returned more than 30 rows. Check its join and filter.',
            );
        }
      }
      if (!count)
        throw new Error('Enter a SELECT query before running the tests.');
      const passed =
        columns === 2 && JSON.stringify(rows) === JSON.stringify(test.expected);
      cases.push({
        passed,
        message: `${test.name}. Expected ${JSON.stringify(test.expected)}. Your rows ${JSON.stringify(rows).slice(0, 240)}.${columns === 2 ? '' : ` Expected 2 columns, got ${columns}.`}`,
      });
    } finally {
      db.close();
    }
  }
  return { cases };
}

self.onmessage = async ({ data }) => {
  try {
    if (data.week !== undefined) {
      week = data.week;
      if (week === 7) {
        importScripts('./vendor/sql.js/sql-wasm.js');
        sqlite = await initSqlJs({
          locateFile: (name) =>
            new URL(`./vendor/sql.js/${name}`, self.location.href).href,
        });
      } else if (pythonCases[week]) {
        importScripts('./vendor/skulpt/skulpt.min.js');
      } else {
        throw new Error('This week has no code exercise.');
      }
      self.postMessage({ ready: true });
    } else {
      self.postMessage(
        week === 7 ? runSql(data.source) : await runPython(data.source),
      );
    }
  } catch (error) {
    self.postMessage({ error: String(error).slice(0, 600) });
  }
};
