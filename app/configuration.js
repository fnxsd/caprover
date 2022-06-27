#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppTemplate = exports.pathOfLogos = exports.pathOfApps = exports.pathOfVersion = exports.pathOfPublic = exports.PUBLIC = exports.chalk = exports.fs = exports.path = void 0;
const tslib_1 = require("tslib");
const chalk_1 = tslib_1.__importDefault(require("chalk"));
Object.defineProperty(exports, "chalk", { enumerable: true, get: function () { return chalk_1.default; } });
const path = tslib_1.__importStar(require("path"));
exports.path = path;
//import path from "path"
const fs = tslib_1.__importStar(require("fs-extra"));
exports.fs = fs;
exports.PUBLIC = `public`;
exports.pathOfPublic = path.join(__dirname, "..", exports.PUBLIC);
exports.pathOfVersion = path.join(exports.pathOfPublic, "v4");
exports.pathOfApps = path.join(exports.pathOfVersion, "apps");
exports.pathOfLogos = path.join(exports.pathOfVersion, "logos");
exports.AppTemplate = (name) => ({
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
});
