import Promise                from 'bluebird';
import { log, error } from '../logger';

let request;

function domains(app, desiredDomains) {

    let currentDomains;

    // get current app domains
    return request.get(`/apps/${app.name}/domains`)

    // filter for domains that should be removed, ignoring default domain
    .then((result) => {

        let defaultDomain = `${app.name}.herokuapp.com`;

        currentDomains = result.map((domain) => domain.hostname);

        return currentDomains
        .filter((domain) => !desiredDomains.includes(domain))
        .filter((domain) => domain !== defaultDomain);
    })

    .then((toRemove) => {

        return Promise.all(toRemove.map((domain) => {
            let url = `/apps/${app.name}/domains/${domain}`;
            return request.delete(url);
        }));
    })

    .then(() => {

        return desiredDomains
        .filter((domain) => !currentDomains.includes(domain));
    })

    .then((toAdd) => {

        let url = `/apps/${app.name}/domains`;

        return Promise.all(toAdd.map((domain) => {
            return request.post(url, {
                body: {
                    hostname: domain
                }
            });
        }));
    })

    .then(() => {
        log(`Updated app domains`);
        return Promise.resolve(app);
    })
    .catch((err) => {
        error(`Error: ${err}`);
        process.exit(1);
    });
}

export default function(req) {

    request = req;
    return domains;
};
