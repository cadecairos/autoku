let chalk = require('chalk');

exports.boldRed = function boldRed(msg) {
    return chalk.bold.red(msg);
};

exports.bold = function bold(msg) {
    return chalk.bold(msg);
};

exports.log = function log(msg) {
    console.log(msg);
};

exports.error = function error(msg) {
    console.error(chalk.bold.red(msg));
}

exports.warn = function warn(msg) {
    console.warn(chalk.yellow(msg));
}