import chalk from 'chalk';

let err = chalk.bold.red;
let request;

function appInfo(name) {
	return request.get(`/apps/${name}`)
	.then((json) => {
		return json;
	})
	.catch((reason) => {
		if (reason.error.id === 'not_found') {
			return Promise.reject();
		}
		console.error(err(`Error: ${error}`));
		process.exit(1);
	});
}

export default function(req) {
	request = req;
	return appInfo;
}
