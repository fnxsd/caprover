import { expect, test } from "@oclif/test"

describe("mv", () => {
  test
    .stdout()
    .command(["mv"])
    .it("runs hello", (ctx) => {
      expect(ctx.stdout).to.contain("hello world")
    })

  test
    .stdout()
    .command(["mv", "--name", "jeff"])
    .it("runs hello --name jeff", (ctx) => {
      expect(ctx.stdout).to.contain("hello jeff")
    })
})
