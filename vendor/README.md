# Browser practice runtimes

The Python and SQL exercises run on the learner’s device. The application loads only the runtime needed for the current exercise and uses local paths for all runtime assets.

| Runtime | Distribution | Included files |
| --- | --- | --- |
| [Skulpt 1.2.0](https://github.com/skulpt/skulpt) | [npm package](https://www.npmjs.com/package/skulpt/v/1.2.0) | `skulpt/skulpt.min.js`, `skulpt/LICENSE` |
| [sql.js 1.17.0](https://github.com/sql-js/sql.js) | [npm package](https://www.npmjs.com/package/sql.js/v/1.17.0) | `sql.js/sql-wasm.js`, `sql.js/sql-wasm.wasm`, `sql.js/LICENSE` |

Files were copied from the published archives after checking their SHA-512 integrity against the npm registry metadata. The Python exercises use built-in operations and do not load Skulpt’s optional standard-library bundle.
