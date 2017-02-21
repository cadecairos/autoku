import 'babel-polyfill'

import program     from 'commander';
import deploy      from './lib/autoku';
import checkSchema from './lib/checkSchema';
import { version } from './package.json';

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
.command('help', 'display this message', { isDefault: true })
.action(() => program.help());

program.parse(process.argv);
