import chalk from "chalk";
import getFile from "./index.js";

const args = process.argv;

if (args.length < 3) {
    console.log(chalk.red('File or directory is required.'));
} else {
    const path = args[2];
    processText(path);
}

async function processText(path) {
    const result = await getFile(path);
    console.log(chalk.yellow('Links:'), result)
}