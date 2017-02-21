let Promise              = require('bluebird');
let { log, error, warn } = require('../logger');

let request;

function formation(app, desiredFormation) {

    let body = { updates: [] };

    Object.keys(desiredFormation).forEach((type) => {

        let { size, quantity } = desiredFormation[type];
        body.updates.push({ type, size, quantity });
    });

    // update formation
    return request.patch(`/apps/${app.name}/formation`, { body })

    .then(() => {
        log(`    Updated app formation`);
        return Promise.resolve(app);
    })

    .catch((err) => {

        if (err.statusCode === 404 && err.error.id === 'not_found') {
            warn('Skipping formation update - push code to the app to enable formation management');
            return Promise.resolve(app);
        }

        error(`Error: ${err}`);
        process.exit(1);
    });
}

module.exports = function(req) {

    request = req;
    return formation;
};
