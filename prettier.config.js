/**
 * This is the configuration file for Prettier.
 * @type {import('prettier').Options}
 */
const prettierrc = {
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  endOfLine: "lf",
  jsxSingleQuote: false,
  printWidth: 120,
  proseWrap: "always",
  quoteProps: "consistent",
  semi: false,
  singleAttributePerLine: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false,
  vueIndentScriptAndStyle: false,
}

module.exports = prettierrc
