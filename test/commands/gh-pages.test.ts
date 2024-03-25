import { expect, test } from "@oclif/test"

describe("gh-pages", () => {
  test
    .stdout()
    .command(["gh-pages"])
    .it("runs hello", (ctx) => {
      expect(ctx.stdout).to.contain("hello world")
    })

  test
    .stdout()
    .command(["gh-pages", "--name", "jeff"])
    .it("runs hello --name jeff", (ctx) => {
      expect(ctx.stdout).to.contain("hello jeff")
    })
})
