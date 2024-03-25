#!/usr/bin/env node

const {
  PUBLIC,
  pathOfPublic,
  pathOfVersion,
  pathOfApps,
  pathOfLogos,
  fs,
  path,
  yaml,
  _,
  caproverTemplate
} = require("./shared")

/**
 * Ensures that a string ends with a given suffix
 * @param {string} str
 * @param {string} suffix
 * @returns {string}
 */
function endsureEndsWith(str, suffix) {
  return str.endsWith(suffix) ? str : str + suffix
}

/**
 * Creates a new caprover app, generating a basic template and placeholder logo.
 * @param {string} name
 * @returns {string}
 */
function createApp(name) {
  const content = caproverTemplate({ name })
  const contentString = yaml.stringify(content)
  const fileName = endsureEndsWith(name, ".yml")
  const logoName = endsureEndsWith(name, ".png")
  const filePath = path.join(pathOfApps, fileName)
  fs.writeFileSync(filePath, contentString)
  fs.createFileSync(path.join(pathOfLogos, logoName))
  return filePath
}

const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")

const argv = yargs(hideBin(process.argv)).argv

Promise.resolve()
  .then(() => {
    if (argv._.length > 1) {
      const paths = argv._.map(createApp)
      paths.forEach(function (path) {
        console.log(path)
      })
    } else {
      return createApp(argv._[0])
    }
  })
  .catch(function (err) {
    console.error(err)
    process.exit(127)
  })
