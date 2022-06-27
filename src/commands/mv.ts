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

export default class Mv extends Command {
  static description = "describe the command here"

  static examples = ["<%= config.bin %> <%= command.id %>"]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    name: Flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: Flags.boolean({ char: "f" })
  }

  static args = [{ name: "string", newName: "string" }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Mv)

    const name = args.name ?? "world"
    const newName = args.newName
    const fileName = name + ".yml"
    const logoName = name + ".png"
    const filePath = path.join(pathOfApps, fileName)
    const newFilePath = path.join(pathOfApps, newName + ".yml")
    const logoPath = path.join(pathOfLogos, logoName)
    const newLogoPath = path.join(pathOfLogos, newName + ".png")
    await fs.rename(filePath, newFilePath)
    await fs.rename(logoPath, newLogoPath)
    this.log(`${chalk.green("[Success]")} moved ${name} to ${newName}`)
  }
}
