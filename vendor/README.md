# Browser practice runtimes

The Python and SQL exercises run on the learner’s device. The application loads only the runtime needed for the current exercise and uses local paths for all runtime assets.

| Runtime | Distribution | Included files |
| --- | --- | --- |
| [Skulpt 1.2.0](https://github.com/skulpt/skulpt) | [npm package](https://www.npmjs.com/package/skulpt/v/1.2.0) | `skulpt/skulpt.min.js`, `skulpt/skulpt-sys.js`, `skulpt/LICENSE` |
| [sql.js 1.17.0](https://github.com/sql-js/sql.js) | [npm package](https://www.npmjs.com/package/sql.js/v/1.17.0) | `sql.js/sql-wasm.js`, `sql.js/sql-wasm.wasm`, `sql.js/LICENSE` |

Files were copied from the published archives after checking their SHA-512 integrity against the npm registry metadata. The Python editors load the core runtime and the small `src/builtin/sys.js` module extracted from the published `dist/skulpt-stdlib.js` bundle. It provides the standard output stream for `print()`.
