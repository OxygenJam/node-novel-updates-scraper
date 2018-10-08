/**
 * This is a helper script for logging in the 
 * console window.
 * 
 * -Zird Triztan Driz
 */
const chalk = require('chalk')

var exports = module.exports = {};

/**
 * This logs the string in the console window with newline.
 * 
 * @param {String} word The string text you wish to print
 */
exports.logPrint = function(word){
    d = new Date();
    d = d.toISOString();
    console.log(chalk.green(d + " >>> ") + word);
}

/**
 * This logs the string in the console window without newline.
 * 
 * @param {String} word The string text you wish to print
 */
exports.logWrite = function(word){
    d = new Date();
    d = d.toISOString();
    process.stdout.write(chalk.green(d + " >>> ") + word + " ");
}

/**
 * This logs the string as an error in the console window with newline.
 * 
 * @param {String} word The string text you wish to print
 */
exports.errPrint = function(word){
    d = new Date();
    d = d.toISOString();
    console.log(chalk.red(d + " ERR: ") + word);
}

/**
 * This logs the string as an error in the console window without newline.
 * 
 * @param {String} word The string text you wish to print
 */
exports.errWrite = function(word){
    d = new Date();
    d = d.toISOString();
    process.stdout.write(chalk.red(d + " ERR: ") + word + " ");
}

/**
 * Prints in the console window with the specified color 
 * code("r", "g", or "b"), writes normally if invalid color code.
 * 
 * @param {String} word The string text you wish to print
 * @param {String} code ("r", "g", "b"), no color if invalid
 */
exports.cPrint = function(word,code){
    switch(code){
        case "r":
            console.log(chalk.red(word));
            break;
        case "g":
            console.log(chalk.green(word));
            break;
        case "b":
            console.log(chalk.blue(word));
            break;
        default:
            console.log(word);
            break;
    }
}

/**
 * Writes in the console window without a newline with the
 * specified color code("r", "g", or "b"), writes normally
 * if invalid color code.
 * 
 * @param {String} word The string text you wish to write
 * @param {String} code ("r", "g", "b"), no color if invalid
 */
exports.cWrite = function(word,code){
    switch(code){
        case "r":
            process.stdout.write(chalk.red(word) + " ");
            break;
        case "g":
            process.stdout.write(chalk.green(word) + " ");
            break;
        case "b":
            process.stdout.write(chalk.blue(word) + " ");
            break;
        default:
            process.stdout.write(word);
            break;
    }
}

/**
 * Prints a line break in the console window.
 */
exports.lineBreak = function(){
    console.log(chalk.green("\n==================================\n"));
}
