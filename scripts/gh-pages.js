const ghpages = require("gh-pages")
const { execSync } = require("child_process")

//execSync("npm run format")
//execSync("npm run build")

ghpages.publish("dist", { branch: "gh-pages" }, function (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log("Deployed!")
    process.exit(0)
  }
})
