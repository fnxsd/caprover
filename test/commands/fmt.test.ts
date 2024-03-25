import { expect, test } from "@oclif/test"

describe("fmt", () => {
  test
    .stdout()
    .command(["fmt"])
    .it("runs hello", (ctx) => {
      expect(ctx.stdout).to.contain("hello world")
    })

  test
    .stdout()
    .command(["fmt", "--name", "jeff"])
    .it("runs hello --name jeff", (ctx) => {
      expect(ctx.stdout).to.contain("hello jeff")
    })
})
