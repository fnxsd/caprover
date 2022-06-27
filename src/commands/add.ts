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

export default class Add extends Command {
  static description = "Add a new App"

  static examples = ["<%= config.bin %> <%= command.id %>"]

  static flags = {}

  static args = [{ name: "file" }]

  public async run(): Promise<void> {
    const { args } = await this.parse(Add)

    const name = args.name

    const content = AppTemplate(name)

    const contentString = yaml.stringify(content)
    const fileName = name + ".yml"
    const logoName = name + ".png"
    const filePath = path.join(pathOfApps, fileName)
    await fs.writeFile(filePath, contentString)
    await fs.createFile(path.join(pathOfLogos, logoName))

    this.log(`${chalk.green("[Success]")} created ${name} at ${filePath}`)
  }
}
