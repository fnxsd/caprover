import { Command } from "@oclif/core";
export default class Add extends Command {
    static description: string;
    static examples: string[];
    static flags: {};
    static args: {
        name: string;
    }[];
    run(): Promise<void>;
}
