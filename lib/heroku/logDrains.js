import Promise                from 'bluebird';
import { log, error } from '../logger';

let request;

function logDrains(app, desiredDrains) {

    let currentDrains;
    let drainIdsByURL = {};

    // get current log drains
    return request.get(`/apps/${app.name}/log-drains`)

    // filter for drains that should be removed
    .then((result) => {

        // the request lib doesn't like urls within urls?
        result.forEach((drain) => drainIdsByURL[drain.url] = drain.id);

        currentDrains = result
        .filter((drain) => !drain.addon)
        .map((drain) => drain.url)

        return currentDrains
        .filter((drain) => !desiredDrains.includes(drain));
    })

    // remove drains
    .then((toRemove) => {

        return Promise.all(toRemove.map((drain) => {

            let url = `/apps/${app.name}/log-drains/${drainIdsByURL[drain]}`;
            return request.delete(url);
        }));
    })

    // filter for new drains
    .then(() => {

        return desiredDrains
        .filter((drain) => !currentDrains.includes(drain));
    })

    .then((toAdd) => {

        let path = `/apps/${app.name}/log-drains`;

        return Promise.all(toAdd.map((url) => {
            return request.post(path, {
                body: { url }
            });
        }));
    })

    .then(() => {
        log(`Updated app log drains`);
        return Promise.resolve(app);
    })
    .catch((err) => {
        error(`Error: ${err}`);
        process.exit(1);
    });
}

export default function(req) {

    request = req;
    return logDrains;
};
