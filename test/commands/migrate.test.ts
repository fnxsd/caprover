import { expect, test } from "@oclif/test"

describe("migrate", () => {
  test
    .stdout()
    .command(["migrate"])
    .it("runs hello", (ctx) => {
      expect(ctx.stdout).to.contain("hello world")
    })

  test
    .stdout()
    .command(["migrate", "--name", "jeff"])
    .it("runs hello --name jeff", (ctx) => {
      expect(ctx.stdout).to.contain("hello jeff")
    })
})
