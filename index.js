#!/bin/env node

let program        = require('commander');
let deploy         = require('./lib/autoku');
let checkSchema    = require('./lib/checkSchema');
let { version }    = require('./package.json');

program
.version(version);

// Deploy command
program
.command('deploy <config>')
.alias('d')
.option('-t, --token <token>', 'Heroku Auth Token')
.description('Deploy or update an app using the provided YAML file.')
.action(deploy);

// Check command
program
.command('check <config>')
.alias('c')
.description('Validate the provided YAML file.')
.action(checkSchema);

// default action is show help
program
.command('help', { isDefault: true })
.description('Print this help message')
.action(() => program.help());

program.parse(process.argv);
