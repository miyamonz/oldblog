const fs = require("fs")
const cheerio = require("cheerio")

const template = fs.readFileSync("./src/index.html").toString();
const $ = cheerio.load(template, { decodeEntities: false  })


const blogDir = "./blog/";
fs.readdir(blogDir, (err, files)=> {
  files.reverse().forEach(file => {
    const content = fs.readFileSync(blogDir + file).toString();
    $("body").append(`<pre>${content}</pre>`);

  })
  try{
    fs.statSync("./dst")
  }catch(e) {
    fs.mkdir("./dst", console.log);
  }
  fs.writeFile("./dst/index.html", $.html(), console.log)
})

