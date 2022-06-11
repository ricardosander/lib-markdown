import chalk from 'chalk';
import fs from 'fs';

console.log(chalk.blue.bgWhite.bold("Hello Node"));

console.log(`
 CPU: ${chalk.red('90%')}
 RAM: ${chalk.green('40%')}
 DISK: ${chalk.yellow('70%')}   
`);

async function getFile(filePath) {
    const enconding = 'utf-8';
    try {

        const text = await fs.promises.readFile(filePath, enconding)
        console.log(chalk.green(text));

        const regex = /\[([^\]]*)\]\(([^\)]*)\)/gm

        const extractedLinks = [];

        let curentExtractedLink;
        while ((curentExtractedLink = regex.exec(text)) !== null) {
            extractedLinks.push(
                {
                    [curentExtractedLink[1]] : curentExtractedLink[2]
                }
            );
        }

        console.log(extractedLinks);

    } catch (error) {
        throw new Error(chalk.red(error.code, 'File not found'));
    } finally {
        console.log(chalk.yellow('Operation finished'));
    }
}

getFile('./files/file01.md');