import { Command, Flags } from "@oclif/core"
import {
  AppTemplate,
  pathOfApps,
  fs,
  path,
  pathOfLogos,
  chalk
} from "../configuration"
import * as yaml from "yaml"

export default class Rm extends Command {
  static description = "describe the command here"

  static examples = ["<%= config.bin %> <%= command.id %>"]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: "f" })
  }

  static args = [{ name: "file" }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Rm)

    const name = args.name

    const fileName = name + ".yml"
    const logoName = name + ".png"
    const filePath = path.join(pathOfApps, fileName)
    const logoPath = path.join(pathOfLogos, logoName)
    await fs.rm(filePath)
    await fs.rm(logoPath)
    this.log(`${chalk.green("[Success]")} removed ${name}`)
  }
}
