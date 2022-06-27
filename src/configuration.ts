#!/usr/bin/env node
import { default as chalk } from "chalk"

import * as path from "path"
//import path from "path"

import * as fs from "fs-extra"
//import  fs from "fs-extra"

export { path, fs, chalk }

export const PUBLIC = `public`
export const pathOfPublic = path.join(__dirname, "..", PUBLIC)
export const pathOfVersion = path.join(pathOfPublic, "v4")
export const pathOfApps = path.join(pathOfVersion, "apps")
export const pathOfLogos = path.join(pathOfVersion, "logos")

export interface Instructions {
  start?: string
  end?: string
}

export interface Variable {
  id?: string
  label?: string
  defaultValue?: string
  description?: string
  validRegex?: string
}

export interface CaproverOneClickApp {
  instructions?: Instructions
  displayName?: string
  isOfficial?: boolean
  description?: string
  variables?: Variable[]
  baseUrl?: string
  documentation?: string
}

export interface CapAppnameCaproverExtra {
  containerHttpPort?: string | number
  notExposeAsWebApp?: boolean | string
}

export interface Environment {
  [key: string]: string | number | boolean
}

export type CaproverItem = any

export interface CapAppnameClientClass {
  tty?: CaproverItem
  stdin_open?: CaproverItem
  image: string
  restart?: CaproverItem
  environment?: Environment
  depends_on?: string[]
  volumes?: string[]
  caproverExtra?: CapAppnameCaproverExtra
  command?: CaproverItem
  ports?: number[]
  entrypoint?: CaproverItem
}

export interface Service {
  $$cap_appname: CapAppnameClientClass
  [key: string]: CapAppnameClientClass
}

export interface CapApp {
  captainVersion?: number | string
  services?: Service[]
  caproverOneClickApp?: CaproverOneClickApp
}
export const AppTemplate = (name: string) => ({
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
})
