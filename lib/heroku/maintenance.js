let Promise        = require('bluebird');
let { log, error } = require('../logger');

let request;

function maintenance(app, desiredStatus) {

    return request.patch(`/apps/${app.name}`, {
        body: {
            maintenance: desiredStatus
        }
    })
    .then((app) => {
        log('Updated maintenance status');
        return Promise.resolve(app);
    })
    .catch((err) => {
        error(`Error: ${err}`);
        process.exit(1);
    });
}

module.exports = function(req) {

    request = req;
    return maintenance;
};