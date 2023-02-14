#!/usr/bin/env node
const path = require("path")
const yaml = require("yaml")
const fs = require("fs-extra")
const _ = require("lodash")

const PUBLIC = `public`
const pathOfPublic = path.join(__dirname, "..", PUBLIC)
const pathOfVersion = path.join(pathOfPublic, "v4")
const pathOfApps = path.join(pathOfVersion, "apps")
const pathOfLogos = path.join(pathOfVersion, "logos")
const tz = _.defaultTo(Intl.DateTimeFormat().resolvedOptions().timeZone, "UTC")

const caproverTemplate = ({ name }) => ({
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
        description: `Version tag of ${name}. See https://hub.docker.com/r/${name}/${name}/tags for a list of available versions.`,
        defaultValue: "latest",
        label: "App Version"
      },
      {
        id: "$$cap_app_port",
        description: "Port to be used by the app.",
        defaultValue: "80",
        label: "App Port"
      },
      {
        id: "$$cap_tz",
        description: "Timezone to use for the app.",
        defaultValue: _.defaultTo(Intl.DateTimeFormat().resolvedOptions().timeZone, "UTC"),
        label: "Timezone"
      }
    ],
    displayName: name,
    isOfficial: false,
    documentation: ""
  },
  services: {
    $$cap_appname: {
      image: `${name}/${name}:$$cap_app_version`,
      volumes: ["$$cap_appname-data:" + `/data`],
      environment: {
        TZ: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      caproverExtra: {
        containerHttpPort: "3000"
      }
    }
  }
})

module.exports = {
  PUBLIC,
  pathOfPublic,
  pathOfVersion,
  pathOfApps,
  pathOfLogos,
  tz,
  caproverTemplate,
  fs,
  path,
  _,
  yaml
}
