#!/usr/bin/env node

const { PUBLIC, pathOfPublic, pathOfVersion, pathOfApps, pathOfLogos, fs, path, yaml, _ } = require("./shared")

/**
 *
 * @param {string} name
 * @param {string} newName
 * @returns new app path
 */
function renameApp(name, newName) {
  const fileName = name + ".yml"
  const logoName = name + ".png"
  const filePath = path.join(pathOfApps, fileName)
  const newFilePath = path.join(pathOfApps, newName + ".yml")
  const logoPath = path.join(pathOfLogos, logoName)
  const newLogoPath = path.join(pathOfLogos, newName + ".png")
  fs.renameSync(filePath, newFilePath)
  fs.renameSync(logoPath, newLogoPath)
  return newFilePath
}

const yargs = require("yargs/yargs")
const { hideBin } = require("yargs/helpers")

const argv = yargs(hideBin(process.argv)).argv

Promise.resolve()
  .then(() => {
    return renameApp(argv._[0], argv._[1])
  })
  .catch(function (err) {
    console.error(err)
    process.exit(127)
  })
