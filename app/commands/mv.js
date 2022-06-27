"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const configuration_1 = require("../configuration");
class Mv extends core_1.Command {
    async run() {
        var _a;
        const { args, flags } = await this.parse(Mv);
        const name = (_a = args.name) !== null && _a !== void 0 ? _a : "world";
        const newName = args.newName;
        const fileName = name + ".yml";
        const logoName = name + ".png";
        const filePath = configuration_1.path.join(configuration_1.pathOfApps, fileName);
        const newFilePath = configuration_1.path.join(configuration_1.pathOfApps, newName + ".yml");
        const logoPath = configuration_1.path.join(configuration_1.pathOfLogos, logoName);
        const newLogoPath = configuration_1.path.join(configuration_1.pathOfLogos, newName + ".png");
        await configuration_1.fs.rename(filePath, newFilePath);
        await configuration_1.fs.rename(logoPath, newLogoPath);
        this.log(`${configuration_1.chalk.green("[Success]")} moved ${name} to ${newName}`);
    }
}
exports.default = Mv;
Mv.description = "describe the command here";
Mv.examples = ["<%= config.bin %> <%= command.id %>"];
Mv.flags = {
    // flag with a value (-n, --name=VALUE)
    name: core_1.Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: core_1.Flags.boolean({ char: "f" })
};
Mv.args = [{ name: "string", newName: "string" }];
