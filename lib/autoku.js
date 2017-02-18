
import 'babel-polyfill'

import autoku from 'commander';
import YAML from 'yamljs';
import chalk from 'chalk';
import heroku from './heroku'; 
import request from './request';

let err = chalk.bold.red;
let info = chalk.green;
let bold = chalk.bold.green;

let config;

autoku
.arguments('<config>')
.option('-t, --token <token>', 'Heroku Auth Token')
.action((configArg) => {
	config = configArg
});

autoku.parse(process.argv);

if (!config) {
	console.error(err('You must specify a yaml file'));
	process.exit(1);
}

if (!autoku.token) {
	console.error(err('You must provide an auth token for heroku'));
	process.exit(1);
}

let appConfig = YAML.load(config);

let herokuRequest = request(autoku.token);

let { appInfo } = heroku(herokuRequest);

appInfo(appConfig.name)
.then(function(app) {
	console.info(`${info('Updating')} ${bold(app.name)}`);
})
.catch(() => {
	console.info(`${info('Creating new app:')} ${bold(appConfig.name)}`);
});
