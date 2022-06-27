"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const configuration_1 = require("../configuration");
const yaml = tslib_1.__importStar(require("yaml"));
class Validate extends core_1.Command {
    async validateV4(version = "4") {
        const items = await configuration_1.fs.readdir(configuration_1.pathOfApps);
        const apps = items.filter((v) => v.includes(".yml"));
        if (items.length !== apps.length) {
            throw new Error("All files in v4 must end with .yml");
        }
        for (var i = 0; i < apps.length; i++) {
            const contentString = configuration_1.fs.readFileSync(configuration_1.path.join(configuration_1.pathOfApps, apps[i]), "utf-8");
            const content = yaml.parse(contentString);
            const captainVersion = content.captainVersion + "";
            const versionString = version + "";
            if (versionString !== captainVersion)
                throw new Error(`unmatched versions   ${versionString}  ${captainVersion} for ${apps[i]}`);
            apps[i] = apps[i].replace(".yml", "");
            if (!content.caproverOneClickApp) {
                throw new Error(`Cannot find caproverOneClickApp for ${apps[i]}`);
            }
            if (!content.caproverOneClickApp.description) {
                throw new Error(`Cannot find description for ${apps[i]}`);
            }
            if (content.caproverOneClickApp.description.length > 200) {
                throw new Error(`Description too long for ${apps[i]}  - keep it below 200 chars`);
            }
            if (!content.caproverOneClickApp.instructions ||
                !content.caproverOneClickApp.instructions.start ||
                !content.caproverOneClickApp.instructions.end) {
                throw new Error(`Cannot find instructions.start or instructions.end for ${apps[i]}`);
            }
            if (!content.services) {
                throw new Error(`Cannot find services for ${apps[i]}`);
            }
            Object.keys(content.services).forEach((serviceName) => {
                // jshint ignore:line
                const s = content.services[serviceName];
                if (s.image && s.image.endsWith(":latest")) {
                    // throw new Error(`"latest" tag is not allowed as it can change and break the setup, see ${apps[i]}`);
                }
            });
            const logoFileName = apps[i] + ".png";
            const logoFullPath = configuration_1.path.join(configuration_1.pathOfVersion, "logos", logoFileName);
            if (!configuration_1.fs.existsSync(logoFullPath) || !configuration_1.fs.statSync(logoFullPath).isFile()) {
                let printablePath = logoFullPath;
                printablePath = printablePath.substr(printablePath.indexOf(`/${configuration_1.PUBLIC}`));
                throw new Error(`Cannot find logo for ${apps[i]} ${printablePath}`);
            }
            this.log(`Validated ${apps[i]}`);
        }
    }
    async validateV2(version = "2") {
        const items = await configuration_1.fs.readdir(configuration_1.pathOfApps);
        const apps = items.filter((v) => v.includes(".json"));
        if (items.length !== apps.length) {
            throw new Error("All files in v2 must end with .json");
        }
        for (var i = 0; i < apps.length; i++) {
            const contentString = await configuration_1.fs.readFile(configuration_1.path.join(configuration_1.pathOfApps, apps[i]));
            const content = JSON.parse(contentString.toString());
            const captainVersion = content.captainVersion + "";
            const versionString = version + "";
            if (versionString !== captainVersion)
                throw new Error(`unmatched versions   ${versionString}  ${captainVersion} for ${apps[i]}`);
            apps[i] = apps[i].replace(".json", "");
            if (!content.description) {
                throw new Error(`Cannot find description for ${apps[i]}`);
            }
            if (content.description.length > 200) {
                throw new Error(`Description too long for ${apps[i]}  - keep it below 200 chars`);
            }
            const logoFileName = apps[i] + ".png";
            const logoFullPath = configuration_1.path.join(configuration_1.pathOfVersion, "logos", logoFileName);
            if (!configuration_1.fs.existsSync(logoFullPath) || !configuration_1.fs.statSync(logoFullPath).isFile()) {
                let printablePath = logoFullPath;
                printablePath = printablePath.substr(printablePath.indexOf(`/${configuration_1.PUBLIC}`));
                throw new Error(`Cannot find logo for ${apps[i]} ${printablePath}`);
            }
            this.log(`Validated ${apps[i]}`);
        }
    }
    async run() {
        const { flags } = await this.parse(Validate);
        if (flags.v4) {
            await this.validateV4();
        }
        if (flags.v2) {
            await this.validateV2();
        }
    }
}
exports.default = Validate;
Validate.description = "describe the command here";
Validate.examples = ["<%= config.bin %> <%= command.id %>"];
Validate.flags = {
    // flag with a value (-n, --name=VALUE)
    v4: core_1.Flags.boolean({ description: "validate v4" }),
    v2: core_1.Flags.boolean({ description: "validate v2" })
};
Validate.args = [];
