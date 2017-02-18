import request from 'request-promise-native';

export default function(authToken) {
	let defaultOpts = {
		headers: {
			Authorization: `Bearer ${authToken}`,
			Accept: 'application/vnd.heroku+json; version=3'
		},
		baseUrl: "https://api.heroku.com",
		json: true
	};

	return request.defaults(defaultOpts);
}