import Promise                from 'bluebird';
import { log, error } from '../logger';

let request;

// Delete/unset variables manually or by setting it to "null" in your config
// This behaviour is required because addons can set variables that won't be tracked
// in your app schema

function configVars(app, newConfig) {

    // update variables
    return request.patch(`/apps/${app.name}/config-vars`, {
        body: newConfig
    })

    .then(() => {
        log(`Updated configuration variables`);
        return Promise.resolve(app);
    })

    .catch((err) => {
        error(`Error: ${err}`);
        process.exit(1);
    });
}

export default function(req) {

    request = req;
    return configVars;
};
