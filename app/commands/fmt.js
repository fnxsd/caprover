"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
class Fmt extends core_1.Command {
    async run() {
        var _a;
        const { args, flags } = await this.parse(Fmt);
        const name = (_a = flags.name) !== null && _a !== void 0 ? _a : "world";
        this.log(`hello ${name} from /home/dev/source/caprover/one-click-apps/caphelper/src/commands/fmt.ts`);
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`);
        }
    }
}
exports.default = Fmt;
Fmt.description = "describe the command here";
Fmt.examples = ["<%= config.bin %> <%= command.id %>"];
Fmt.flags = {
    // flag with a value (-n, --name=VALUE)
    name: core_1.Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: core_1.Flags.boolean({ char: "f" })
};
Fmt.args = [{ name: "file" }];
