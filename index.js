const fs = require("fs")
const cheerio = require("cheerio")
const moment = require("moment")

const template = fs.readFileSync("./src/index.html").toString();
const $ = cheerio.load(template, { decodeEntities: false  })

const blogsToJson = require("./parse")
const blogDir = "./blog/";
const jsons = blogsToJson(blogDir);
jsons.forEach( json => {
  const content = createContent(json)
  const text = `<div id="${json.file}" class="article ${json.file}">${content}</div>`;
  $(".articles").append(text);

  $("nav").append(`<li><a href="#${json.file}">${json.lines[0]}</a></li>`);
} )


function createContent(json) {
  const lines = Object.assign([], json.lines);
  lines[0] = `<h1>${lines[0]}</h1>`

  const fmtdate = moment(json.created_at).format("YYYY/MM/DD")
  lines.splice(1,0,"posted_at "+fmtdate);
  
  return lines.join("<br>");
}

try{
  fs.statSync("./dst")
}catch(e) {
  fs.mkdirSync("./dst");
  console.log("dst folder created");
}
fs.writeFileSync("./dst/index.html", $.html())

