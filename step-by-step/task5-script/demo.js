#!/usr/bin/env node
let fs = require("fs")

const separator = "/"
const currentDir = "." + separator
const fileSet = 
[{ name: "index.html", relativePath: "", template: "<!DOCTYPE><title>Hello</title><h1>Hi</h1>" },
{ name: "style.css", relativePath: "css", template: "h1{color: red;}" },
{ name: "main.js", relativePath: "js", template: 'var string = "Hello World" \n alert(string)' }]

let dirName = process.argv[2]
//创建主目录
createAppDir(dirName); 
//进入主目录
process.chdir(currentDir + dirName);
//写入文件
wirteFileSet(fileSet)
process.exit(0)

function createAppDir(dirName) {
    assertNotEmptyArg(dirName);
    assertNotExists(currentDir + dirName);
    fs.mkdirSync(currentDir + dirName);
}


function wirteFileSet(fileSet) {
    fileSet.forEach(f => {
        let filePath = "";
        if (f.relativePath) {
            fs.mkdirSync(f.relativePath);
            filePath = f.relativePath;
        }
        filePath = [currentDir, filePath, separator, f.name].join("");
        fs.writeFileSync(filePath, f.template);
        console.log("write file %s success!", filePath);
    });
}

function assertNotExists(dirName) {
    if (fs.existsSync(dirName)) {
        console.error("error: dir %s exists", dirName);
        process.exit(1);
    }
}

function assertNotEmptyArg(dirName) {
    if (!dirName) {
        console.error("dir is required! usage: demo.js <dir>");
        process.exit(1);
    }
}
