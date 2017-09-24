const fs = require("fs")
const cheerio = require("cheerio")

const template = fs.readFileSync("./src/index.html").toString();
const $ = cheerio.load(template, { decodeEntities: false  })


const blogsToJson = require("./parse")
const blogDir = "./blog/";
const jsons = blogsToJson(blogDir);
jsons.forEach( json => {
  content = json.lines.join("<br>");
  $("body").append(`<div class="article ${json.file}">${content}</div>`);
} )

try{
  fs.statSync("./dst")
}catch(e) {
  fs.mkdirSync("./dst");
  console.log("dst folder created");
}
fs.writeFileSync("./dst/index.html", $.html())

