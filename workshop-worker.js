// A fresh worker and in-memory filesystem are created for each student run.
const pythonRoot = 'https://cdn.jsdelivr.net/pyodide/v0.27.7/full/';

async function pythonRun(data) {
  importScripts(pythonRoot + 'pyodide.js');
  const py = await loadPyodide({ indexURL: pythonRoot });
  for (const [name, contents] of Object.entries(data.files || {})) {
    if (!/^[\w.-]+$/.test(name))
      throw Error('A project file has an unsupported name.');
    py.FS.writeFile(name, contents, { encoding: 'utf8' });
  }
  if (/^\s*(?:import sqlite3|from sqlite3 import)/m.test(data.source))
    await py.loadPackage('sqlite3');
  let output = '';
  const append = (line) => {
    if (output.length < 8000)
      output += (String(line) + '\n').slice(0, 8000 - output.length);
  };
  py.setStdout({ batched: append });
  py.setStderr({ batched: append });
  self.postMessage({ running: true });
  const run = (source) => {
    const value = py.runPython(source);
    value?.destroy?.();
  };
  try {
    run(data.source);
  } catch (error) {
    return {
      output,
      error: String(error).split('File "<exec>"').pop().slice(-1300),
    };
  }
  const checks = [];
  for (const check of data.checks || []) {
    try {
      run(check.code);
      checks.push({ label: check.label, passed: true });
    } catch (error) {
      checks.push({
        label: check.label,
        passed: false,
        message: String(error).trim().split('\n').pop(),
      });
    }
  }
  return { output: output.trimEnd(), checks };
}

async function sqlRun(data) {
  importScripts('./vendor/sql.js/sql-wasm.js');
  const SQL = await initSqlJs({
    locateFile: (name) =>
      new URL('./vendor/sql.js/' + name, self.location.href).href,
  });
  const db = new SQL.Database();
  try {
    if (data.setupSql) db.run(data.setupSql);
    self.postMessage({ running: true });
    const results = db.exec(data.source);
    const output = results
      .map((result) =>
        [
          result.columns.join(' | '),
          ...result.values
            .slice(0, 150)
            .map((row) =>
              row
                .map((value) => (value === null ? 'NULL' : String(value)))
                .join(' | '),
            ),
        ].join('\n'),
      )
      .join('\n\n');
    const checks = (data.checks || []).map((check) => {
      try {
        return {
          label: check.label,
          passed: db.exec(check.code)[0]?.values[0]?.[0] === 1,
        };
      } catch (error) {
        return { label: check.label, passed: false, message: String(error) };
      }
    });
    return {
      output:
        output.slice(0, 8000) || 'Statement completed with no result rows.',
      checks,
    };
  } finally {
    db.close();
  }
}

self.onmessage = async ({ data }) => {
  try {
    self.postMessage(
      data.language === 'python' ? await pythonRun(data) : await sqlRun(data),
    );
  } catch (error) {
    self.postMessage({ error: String(error).slice(-1200) });
  }
};
