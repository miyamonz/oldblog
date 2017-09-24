const fs = require("fs")

function blogsToJson(dirPath) {
  const files = fs.readdirSync(dirPath);
  return files.reverse().map(file => {
    const content = fs.readFileSync(dirPath + file).toString();
    const stat = fs.statSync(dirPath + file);
    const json = {
      file,
      created_at: stat.birthtime,
      lines: content.split("\n")
    }
    return json
  })
}

module.exports = blogsToJson
