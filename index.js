const chalk = require('chalk');
const fs = require('fs');

console.log(chalk.blue.bgWhite.bold("Hello Node"));

console.log(`
 CPU: ${chalk.red('90%')}
 RAM: ${chalk.green('40%')}
 DISK: ${chalk.yellow('70%')}   
`);

async function extractLinkFromFiles(path) {
    const enconding = 'utf-8';
    try {

        const files = await fs.promises.readdir(path, enconding)
        console.log(chalk.green(files));

        const result = await Promise.all(files.map(async (fileName) => {
            console.log(`Extracting content from file ${fileName}`);
            const fileContent = await getFileContext(path, fileName, enconding);
            console.log(`Content extracted from file ${fileName}`);
            const links = extractLinks(fileContent);
            return links.map(link => {
                return {
                    "file": fileName,
                    ...link
                }
            });
        }));
        return result.flat();

    } catch (error) {
        console.log(chalk.red(error));
        throw new Error(chalk.red(error.code, 'File not found'));
    } finally {
        console.log(chalk.yellow('Operation finished'));
    }
}

function getFileContext(path, fileName, enconding) {
    const filePath = `${path}/${fileName}`
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

    return extractedLinks.length === 0 ? 'No links found.' : extractedLinks;
}

async function getFile(path) {
    return extractLinkFromFiles(path);
}

module.exports = getFile;