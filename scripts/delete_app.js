#!/usr/bin/env node
const path = require("path")
const yaml = require("yaml")
const fs = require("fs-extra")
const PUBLIC = `public`
const pathOfPublic = path.join(__dirname, "..", PUBLIC)
const pathOfVersion = path.join(pathOfPublic, "v4")
const pathOfApps = path.join(pathOfVersion, "apps")
const pathOfLogos = path.join(pathOfVersion, "logos")

/**
 *
 * @param {string} name
 * @returns new app path
 */
function deleteApp(name) {
  const fileName = name + ".yml"
  const logoName = name + ".png"
  const filePath = path.join(pathOfApps, fileName)
  const logoPath = path.join(pathOfLogos, logoName)
  fs.rmSync(filePath)
  fs.rmSync(logoPath)
  return fileName
}

const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")

const argv = yargs(hideBin(process.argv)).argv

Promise.resolve()
  .then(() => {
    if (argv._.length > 1) {
      const paths = argv._.map(deleteApp)
      return paths.map(function (path) {
        console.log(path)
        return path
      })
    } else {
      return deleteApp(argv._[0])
    }
  })
  .catch(function (err) {
    console.error(err)
    process.exit(127)
  })
