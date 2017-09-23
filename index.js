const fs = require("fs")
const cheerio = require("cheerio")

const template = fs.readFileSync("./src/index.html").toString();
const $ = cheerio.load(template)


const blogDir = "./blog/";
fs.readdir(blogDir, (err, files)=> {
  files.forEach(file => {
    const content = fs.readFileSync(blogDir + file).toString();
    $("body").append(`<pre>${content}</pre>`);

  })
  fs.writeFile("./dst/index.html", $.html(), console.log)
})

