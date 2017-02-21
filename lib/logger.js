import chalk from 'chalk';

export function boldRed(msg) {
    return chalk.bold.red(msg);
};

export function bold(msg) {
    return chalk.bold(msg);
};

export function log(msg) {
    console.log(msg);
};

export function error(msg) {
    console.error(chalk.bold.red(msg));
}

export function warn(msg) {
    console.warn(chalk.yellow(msg));
}