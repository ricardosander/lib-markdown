import chalk from 'chalk';

console.log(chalk.blue.bgWhite.bold("Hello Node"));

console.log(`
 CPU: ${chalk.red('90%')}
 RAM: ${chalk.green('40%')}
 DISK: ${chalk.yellow('70%')}   
`);