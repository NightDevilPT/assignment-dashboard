const fs = require('fs');
const path = require('path');

const srcDirectory = path.join(__dirname, 'src');
const outputFile = path.join(__dirname, 'prompt.txt');

// Function to recursively read all files in a directory
const readFilesRecursively = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);

    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat && stat.isDirectory()) {
            // Skip the 'interface' directory
            if (file === '') {
                return;
            }
            // Recurse into a subdirectory
            results = results.concat(readFilesRecursively(filePath));
        } else {
            // Is a file
            results.push(filePath);
        }
    });

    return results;
};

// Function to generate the prompt.txt content
const generatePromptFile = (files) => {
    const writeStream = fs.createWriteStream(outputFile);

    files.forEach(file => {
        const relativePath = path.relative(srcDirectory, file);
        const code = fs.readFileSync(file, 'utf8');
        writeStream.write(`File: ${path.basename(file)}\n`);
        writeStream.write(`Path: ${relativePath}\n`);
        writeStream.write(`${code}\n\n`);
    });

    writeStream.end();
};

// Main execution
const files = readFilesRecursively(srcDirectory);
generatePromptFile(files);

console.log(`prompt.txt has been created successfully at ${outputFile}`);
