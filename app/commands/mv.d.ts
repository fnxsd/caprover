import { Command } from "@oclif/core";
export default class Mv extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        name: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static args: {
        name: string;
        newName: string;
    }[];
    run(): Promise<void>;
}
