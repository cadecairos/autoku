import Promise                from 'bluebird';
import { log, error } from '../logger';

let request;

function buildpacks(app, newBuildpacks) {

    let updates = [];

    newBuildpacks.forEach((buildpack) => updates.push({ buildpack }));

    if (!updates) {
        // nothing to update
        return Promise.resolve();
    }

    // update buildpacks
    return request.put(`/apps/${app.name}/buildpack-installations`, {
        body: { updates }
    })

    .then(() => {
        log(`Updated buildpack installations`);
        return Promise.resolve(app);
    })

    .catch((err) => {
        error(`Error: ${err}`);
        process.exit(1);
    });
}

export default function(req) {

    request = req;
    return buildpacks;
};
