/**
 * This is the configuration file for npm-check-updates.
 * @type {import('npm-check-updates').RunOptions}
 */
const ncuConfig = {
  color: true,
  reject: [
    // "If you use TypeScript, you will want to stay on Chalk 4 until TypeScript 4.6 is out."
    // https://github.com/microsoft/TypeScript/issues/46452

    /^eslint$/,
    "@types/node",
    /^react(?:-dom|-script|-router(?:-dom)?)?$/,
    /^@types\/react(?:-dom|-script|-router(?:-dom)?)?$/,
    /^pnpm$/,
    /^yarn$/,
    // eslint-plugin-promise does not support eslint v8 yet
    // https://github.com/xjamundx/eslint-plugin-promise/pull/219
    //        "eslint",
    // "Must use import to load ES Module"
    // These can be removed once the tests are converted to Typescript
    "find-up",
    "get-stdin",
    "globby",
    "p-map",
    "remote-git-tags",
    "strip-ansi",
    /^webpack/,
  ]
}
module.exports = ncuConfig
