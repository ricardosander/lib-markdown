const chalk = require('chalk');
const fs = require('fs');

async function extractLinkFromFiles(path) {
    const enconding = 'utf-8';
    try {

        if (isDirectory(path)) {
            const result = await extractLinksFromFilesDirectory(path, enconding);
            return result.flat();
        } 

        const result = await extractFileLinks(path, enconding);
        return result.flat();
        
    } catch (error) {
        console.log(chalk.red(error));
        throw new Error(chalk.red(error.code, 'File not found'));
    } finally {
        console.log(chalk.yellow('Operation finished'));
    }
}

function isDirectory(path) {
    return fs.lstatSync(path).isDirectory();
}

async function extractLinksFromFilesDirectory(path, enconding) {

    const files = await fs.promises.readdir(path, enconding)
    console.log(chalk.green(files));

    return await Promise.all(files.map(async (fileName) => {
        const filePath = `${path}/${fileName}`
        console.log(`Extracting content from file ${filePath}`);
        return await extractFileLinks(filePath, enconding);
    }));
}

async function extractFileLinks(filePath, enconding) {
    const fileContent = await getFileContext(filePath, enconding);
    console.log(`Content extracted from file ${filePath}`);
    const links = extractLinks(fileContent);
    return links.map(link => {
        return {
            "file": filePath,
            ...link
        }
    });
}

function getFileContext(filePath, enconding) {
    return fs.promises.readFile(filePath, enconding);
}

function extractLinks(text) {

    const regex = /\[([^\]]*)\]\(([^\)]*)\)/gm

    const extractedLinks = [];

    let curentExtractedLink;
    while ((curentExtractedLink = regex.exec(text)) !== null) {
        extractedLinks.push(
            {
                'name': curentExtractedLink[1],
                'link': curentExtractedLink[2],
            }
        );
    }

    return extractedLinks;
}

async function getFile(path) {
    return extractLinkFromFiles(path);
}

module.exports = getFile;