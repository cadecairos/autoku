let Promise              = require('bluebird');
let { log, error, bold } = require('../logger');

let request;

function createApp(name, region, stack) {

    return request.post('/apps', {
        body: { name, region, stack }
    })
    .then((app) => {
        log(`Successfully created ${bold(name)}`);
        return Promise.resolve(app);
    })
    .catch((err) => {
        error(`Error: ${err}`);
        process.exit(1);
    });
}

module.exports = function(req) {

    request = req;
    return createApp;
};
