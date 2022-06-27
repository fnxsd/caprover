import { Command, Flags } from "@oclif/core"
import {
  AppTemplate,
  pathOfApps,
  fs,
  path,
  pathOfLogos,
  chalk,
  PUBLIC,
  pathOfVersion
} from "../configuration"
import * as yaml from "yaml"

export default class Validate extends Command {
  static description = "describe the command here"

  static examples = ["<%= config.bin %> <%= command.id %>"]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    v4: Flags.boolean({ description: "validate v4" }),
    v2: Flags.boolean({ description: "validate v2" })
  }

  private async validateV4(version = "4") {
    const items = await fs.readdir(pathOfApps)
    const apps = items.filter((v) => v.includes(".yml"))

    if (items.length !== apps.length) {
      throw new Error("All files in v4 must end with .yml")
    }

    for (var i = 0; i < apps.length; i++) {
      const contentString = fs.readFileSync(
        path.join(pathOfApps, apps[i]),
        "utf-8"
      )
      const content = yaml.parse(contentString)
      const captainVersion = content.captainVersion + ""
      const versionString = version + ""
      if (versionString !== captainVersion)
        throw new Error(
          `unmatched versions   ${versionString}  ${captainVersion} for ${apps[i]}`
        )

      apps[i] = apps[i].replace(".yml", "")

      if (!content.caproverOneClickApp) {
        throw new Error(`Cannot find caproverOneClickApp for ${apps[i]}`)
      }

      if (!content.caproverOneClickApp.description) {
        throw new Error(`Cannot find description for ${apps[i]}`)
      }

      if (content.caproverOneClickApp.description.length > 200) {
        throw new Error(
          `Description too long for ${apps[i]}  - keep it below 200 chars`
        )
      }

      if (
        !content.caproverOneClickApp.instructions ||
        !content.caproverOneClickApp.instructions.start ||
        !content.caproverOneClickApp.instructions.end
      ) {
        throw new Error(
          `Cannot find instructions.start or instructions.end for ${apps[i]}`
        )
      }

      if (!content.services) {
        throw new Error(`Cannot find services for ${apps[i]}`)
      }

      Object.keys(content.services).forEach((serviceName) => {
        // jshint ignore:line
        const s = content.services[serviceName]
        if (s.image && s.image.endsWith(":latest")) {
          // throw new Error(`"latest" tag is not allowed as it can change and break the setup, see ${apps[i]}`);
        }
      })

      const logoFileName = apps[i] + ".png"

      const logoFullPath = path.join(pathOfVersion, "logos", logoFileName)

      if (!fs.existsSync(logoFullPath) || !fs.statSync(logoFullPath).isFile()) {
        let printablePath = logoFullPath
        printablePath = printablePath.substr(
          printablePath.indexOf(`/${PUBLIC}`)
        )
        throw new Error(`Cannot find logo for ${apps[i]} ${printablePath}`)
      }

      this.log(`Validated ${apps[i]}`)
    }
  }

  private async validateV2(version = "2") {
    const items = await fs.readdir(pathOfApps)
    const apps = items.filter((v) => v.includes(".json"))

    if (items.length !== apps.length) {
      throw new Error("All files in v2 must end with .json")
    }

    for (var i = 0; i < apps.length; i++) {
      const contentString = await fs.readFile(path.join(pathOfApps, apps[i]))
      const content = JSON.parse(contentString.toString())
      const captainVersion = content.captainVersion + ""
      const versionString = version + ""
      if (versionString !== captainVersion)
        throw new Error(
          `unmatched versions   ${versionString}  ${captainVersion} for ${apps[i]}`
        )

      apps[i] = apps[i].replace(".json", "")

      if (!content.description) {
        throw new Error(`Cannot find description for ${apps[i]}`)
      }
      if (content.description.length > 200) {
        throw new Error(
          `Description too long for ${apps[i]}  - keep it below 200 chars`
        )
      }

      const logoFileName = apps[i] + ".png"

      const logoFullPath = path.join(pathOfVersion, "logos", logoFileName)

      if (!fs.existsSync(logoFullPath) || !fs.statSync(logoFullPath).isFile()) {
        let printablePath = logoFullPath
        printablePath = printablePath.substr(
          printablePath.indexOf(`/${PUBLIC}`)
        )
        throw new Error(`Cannot find logo for ${apps[i]} ${printablePath}`)
      }

      this.log(`Validated ${apps[i]}`)
    }
  }

  static args = []

  public async run(): Promise<void> {
    const { flags } = await this.parse(Validate)

    if (flags.v4) {
      await this.validateV4()
    }

    if (flags.v2) {
      await this.validateV2()
    }
  }
}
