import Promise from 'bluebird';

import { log, error, bold } from '../logger';

let request;

function maintenance(app, desiredStatus) {

    return request.patch(`/apps/${app.name}`, {
        body: {
            maintenance: desiredStatus
        }
    })
    .then((app) => {
        log(`    Updated maintenance to ${bold(desiredStatus)}`);
        return Promise.resolve(app);
    })
    .catch((err) => {
        error(`Error: ${err}`);
        process.exit(1);
    });
}

export default function(req) {

    request = req;
    return maintenance;
};