import { Command } from "@oclif/core";
export default class Fmt extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        name: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined>;
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    static args: {
        name: string;
    }[];
    run(): Promise<void>;
}
