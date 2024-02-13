const { promises } = require("fs");
const fs = require('fs');
const { join } = require("path");
const path = require('path');
// No node modules or hidden files
const ignoreRegex = generateIgnoreRegex()

function generateIgnoreRegex() {
    const text = fs.readFileSync('./configs/.path_ignore', 'utf8');
    const lines = text.trim().split("\n").filter(line => line.trim() !== "");
    const ignoreRegex ='(' + lines.join(")|(") + ')';
    return ignoreRegex
}

async function* walk(dir, extType) {
    for await (const d of await promises.opendir(dir)) {
        const entry = join(dir, d.name);
        const isIgnored = (filePath) => filePath.match(ignoreRegex);
        if (isIgnored(entry)) continue;
        if (d.isDirectory()) yield* walk(entry, extType);
        else if (d.isFile() && path.extname(entry) == extType) yield entry;
    }
}

// Then, use it with a simple async for loop
async function main() {
    for await (const p of walk('.', '.js'))
        console.log(p)
}


module.exports = { walk }