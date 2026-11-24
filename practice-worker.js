/* Learner code runs in a disposable worker. Only this run's sample data is available. */
let week;
let sqlite;

const pythonCases = {
  1: {
    name: 'workload_hours',
    cases: [
      { args: [10, 12], expected: 2 },
      { args: [24, 7.5], expected: 3 },
      { args: [0, 25], expected: 0 },
      { args: [5, 9], expected: 0.75 },
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

async function runPython(source, queue) {
  let stdout = '';
  Sk.configure({
    __future__: Sk.python3,
    execLimit: 2000,
    output: (message) => {
      if (stdout.length < 1000)
        stdout += String(message).slice(0, 1000 - stdout.length);
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
  async function callWith(values) {
    const args = values.map((value) => Sk.ffi.remapToPy(value));
    const result = await Sk.misceval.asyncToPromise(() =>
      Sk.misceval.callsimOrSuspend(learnerFunction, ...args),
    );
    return Sk.ffi.remapToJs(result);
  }
  if (queue !== undefined) {
    if (
      week !== 1 ||
      !queue ||
      !Number.isInteger(queue.tickets) ||
      queue.tickets < 0 ||
      queue.tickets > 1000000 ||
      !Number.isFinite(queue.minutes) ||
      queue.minutes < 0 ||
      queue.minutes > 100000
    ) {
      throw new Error(
        'Use a whole ticket count and a nonnegative handling time within the displayed limits.',
      );
    }
    const actual = await callWith([queue.tickets, queue.minutes]);
    if (typeof actual !== 'number' || !Number.isFinite(actual)) {
      throw new Error(
        actual == null
          ? 'The function returned None. Keep the calculation on a return line inside the function. A print line only displays a value.'
          : 'The function must return a number of hours. Leave words and quotation marks out of its return value.',
      );
    }
    return { actual, stdout };
  }
  const cases = [];
  for (const test of exercise.cases) {
    const actual = await callWith(test.args);
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
    name: 'Two accounts, one closed ticket',
    tickets: [
      [101, 20, 'open'],
      [102, 10, 'closed'],
      [103, 10, 'open'],
    ],
    expected: [
      [101, 'Nova'],
      [103, 'Orbit'],
    ],
  },
  {
    name: 'All closed',
    tickets: [
      [205, 20, 'closed'],
      [202, 10, 'closed'],
    ],
    expected: [],
  },
  {
    name: 'Mixed order and repeated account',
    tickets: [
      [307, 10, 'open'],
      [301, 20, 'closed'],
      [305, 20, 'open'],
      [304, 10, 'open'],
    ],
    expected: [
      [304, 'Orbit'],
      [305, 'Nova'],
      [307, 'Orbit'],
    ],
  },
];

function runSql(source) {
  const cases = [];
  for (const test of queryCases) {
    const db = new sqlite.Database();
    try {
      db.run(
        'CREATE TABLE accounts (id INTEGER, name TEXT); CREATE TABLE tickets (id INTEGER, account_id INTEGER, status TEXT);',
      );
      db.run("INSERT INTO accounts VALUES (10, 'Orbit'), (20, 'Nova')");
      for (const row of test.tickets)
        db.run('INSERT INTO tickets VALUES (?, ?, ?)', row);
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
            'Your query needs to return the ticket ID and account name.',
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
        importScripts(
          './vendor/skulpt/skulpt.min.js',
          './vendor/skulpt/skulpt-sys.js',
        );
      } else {
        throw new Error('This week has no code exercise.');
      }
      self.postMessage({ ready: true });
    } else {
      self.postMessage(
        week === 7
          ? runSql(data.source)
          : await runPython(data.source, data.queue),
      );
    }
  } catch (error) {
    self.postMessage({ error: String(error).slice(0, 600) });
  }
};
