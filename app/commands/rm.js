"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const configuration_1 = require("../configuration");
class Rm extends core_1.Command {
    async run() {
        const { args, flags } = await this.parse(Rm);
        const name = args.name;
        const fileName = name + ".yml";
        const logoName = name + ".png";
        const filePath = configuration_1.path.join(configuration_1.pathOfApps, fileName);
        const logoPath = configuration_1.path.join(configuration_1.pathOfLogos, logoName);
        await configuration_1.fs.rm(filePath);
        await configuration_1.fs.rm(logoPath);
        this.log(`${configuration_1.chalk.green("[Success]")} removed ${name}`);
    }
}
exports.default = Rm;
Rm.description = "describe the command here";
Rm.examples = ["<%= config.bin %> <%= command.id %>"];
Rm.flags = {
    // flag with a value (-n, --name=VALUE)
    name: core_1.Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: core_1.Flags.boolean({ char: "f" })
};
Rm.args = [{ name: "file" }];
