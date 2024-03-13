const { promises } = require("fs");
const fs = require('fs');
const { join } = require("path");
const path = require('path');

// Ignore files and directories listed in .path_ignore
// For example: hidden files and node_modules
const ignoreRegex = generateIgnoreRegex()

/**
 * Generate a regex from the .path_ignore file
 * @returns {string} A regex that matches all the lines in .path_ignore
 */
function generateIgnoreRegex() {
    const text = fs.readFileSync('./configs/.path_ignore', 'utf8');
    const lines = text.trim().split("\n").filter(line => line.trim() !== "");
    const ignoreRegex ='(' + lines.join(")|(") + ')';
    return ignoreRegex
}

/**
 * Asynchronously walk through a directory and its subdirectories to fetch file matching the right extension type
 * @param {string} dir: The root directory to walk through
 * @param {string} extType: The file extension to look for
 * @returns {string} The file path of the matching files
 */
async function* walk(dir, extType) {
    for await (const d of await promises.opendir(dir)) {
        // join the directory with the file name
        const entry = join(dir, d.name);

        // Check if the file is ignored
        // If it is, then skip it
        const isIgnored = (filePath) => filePath.match(ignoreRegex);
        if (isIgnored(entry)) continue;
        
        // If the entry is a directory, then walk through the directory
        if (d.isDirectory()) yield* walk(entry, extType);

        // If the entry is a file and the file extension matches the extType, then yield the file path
        else if (d.isFile() && path.extname(entry) == extType) yield entry;
    }
}

module.exports = { walk }