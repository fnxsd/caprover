"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@oclif/core");
const configuration_1 = require("../configuration");
const yaml = tslib_1.__importStar(require("yaml"));
class Add extends core_1.Command {
    async run() {
        const { args } = await this.parse(Add);
        const name = args.name;
        const content = configuration_1.AppTemplate(name);
        const contentString = yaml.stringify(content);
        const fileName = name + ".yml";
        const logoName = name + ".png";
        const filePath = configuration_1.path.join(configuration_1.pathOfApps, fileName);
        await configuration_1.fs.writeFile(filePath, contentString);
        await configuration_1.fs.createFile(configuration_1.path.join(configuration_1.pathOfLogos, logoName));
        this.log(`${configuration_1.chalk.green("[Success]")} created ${name} at ${filePath}`);
    }
}
exports.default = Add;
Add.description = "Add a new App";
Add.examples = ["<%= config.bin %> <%= command.id %>"];
Add.flags = {};
Add.args = [{ name: "file" }];
