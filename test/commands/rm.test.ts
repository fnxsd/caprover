import { expect, test } from "@oclif/test"

describe("rm", () => {
  test
    .stdout()
    .command(["rm"])
    .it("runs hello", (ctx) => {
      expect(ctx.stdout).to.contain("hello world")
    })

  test
    .stdout()
    .command(["rm", "--name", "jeff"])
    .it("runs hello --name jeff", (ctx) => {
      expect(ctx.stdout).to.contain("hello jeff")
    })
})
