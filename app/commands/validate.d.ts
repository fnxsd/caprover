import { Command } from "@oclif/core";
export default class Validate extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        v4: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        v2: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    private validateV4;
    private validateV2;
    static args: never[];
    run(): Promise<void>;
}
