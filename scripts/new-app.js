#!/usr/bin/env node
const path = require("path")
const yaml = require("yaml")
const fs = require("fs-extra")
const PUBLIC = `public`
const pathOfPublic = path.join(__dirname, "..", PUBLIC)
const pathOfVersion = path.join(pathOfPublic, "v4")
const pathOfApps = path.join(pathOfVersion, "apps")
const pathOfLogos = path.join(pathOfVersion, "logos")

function createApp(name) {
  const content = {
    captainVersion: "4",
    caproverOneClickApp: {
      description: "",
      instructions: {
        start: `Install ${name} and start using it.`,
        end: "Have fun!"
      },
      variables: [
        {
          id: "$$cap_app_version",
          description: `Version of ${name}`,
          defaultValue: "latest",
          label: "App Version"
        }
      ],
      displayName: name,
      isOfficial: false,
      documentation: ""
    },
    services: {
      $$cap_appname: {
        image: `${name}:$$cap_app_version`,
        volumes: ["$$cap_appname-data:" + `/data/${name}`],
        environment: [],
        caproverExtra: {
          containerHttpPort: "3000"
        }
      }
    }
  }
  const contentString = yaml.stringify(content)
  const fileName = name + ".yml"
  const logoName = name + ".png"
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
