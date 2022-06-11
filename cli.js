import chalk from "chalk";
import getFile from "./index.js";
import validateLinks from "./http-validator.js";

const args = process.argv;

if (args.length < 3) {
    console.log(chalk.red('File or directory is required.'));
} else {

    const validate = process.argv.findIndex(s => s === 'validate') !== -1;

    const path = args[2];
    const links = await processText(path);
    if (validate) {
        validateLinks(links);
    } else {
        console.log(chalk.yellow('Links:'), links)
    }
}

function processText(path) {
    return getFile(path);
}