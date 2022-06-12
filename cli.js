const chalk = require('chalk');
const getFile = require('./index.js');
const validateLinks = require('./http-validator.js');

const args = process.argv;

if (args.length < 3) {
    console.log(chalk.red('File or directory is required.'));
} else {
    const validate = process.argv.findIndex(s => s === 'validate') !== -1;
    const path = args[2];

    exec(path, validate);
}

async function exec(path, validate) {
    const links = await processText(path);
    if (validate) {
        validateLinks(links);
    } else {
        console.log(chalk.yellow('Links:'), links)
    }
}

async function processText(path) {
    return getFile(path);
}