import Promise                from 'bluebird';
import { log, error, bold } from '../logger';

let request;

function createApp(name, region, stack) {

    return request.post('/apps', {
        body: { name, region, stack }
    })
    .then((app) => {
        log(`    Successfully created ${bold(name)}`);
        return Promise.resolve(app);
    })
    .catch((err) => {
        error(`Error: ${err}`);
        process.exit(1);
    });
}

export default function(req) {

    request = req;
    return createApp;
};
