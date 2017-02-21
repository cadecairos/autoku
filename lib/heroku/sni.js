let Promise              = require('bluebird');
let { log, error, warn } = require('../logger');

let request;

function sni(app, desiredSni) {

    let currChains;
    let currEndpointsByChain = {};
    let sniByChain = {};
    let sniChains = desiredSni.map((endpoint) => endpoint['certificate-chain']);

    desiredSni.forEach((endpoint) => sniByChain[endpoint['certificate-chain']] = endpoint['private-key']);

    // get current sni endpoints
    return request.get(`/apps/${app.name}/sni-endpoints`)


    // filter for endpoints that should be removed
    .then((result) => {

        result.forEach((endpoint) => currEndpointsByChain[endpoint.certificate_chain] = endpoint.id);

        currChains = result
        .map((endpoint) => endpoint.certificate_chain)

        return currChains
        .filter((endpoint) => !desiredSni.includes(endpoint));
    })

    // remove endpoints
    .then((toRemove) => {

        return Promise.all(toRemove.map((endpoint) => {

            let url = `/apps/${app.name}/sni-endpoints/${currEndpointsByChain[endpoint]}`;
            return request.delete(url);
        }));
    })

    // filter for new endpoints
    .then(() => {

        return sniChains
        .filter((chain) => !currChains.includes(chain));
    })

    // add new endpoints
    .then((toAdd) => {

        let path = `/apps/${app.name}/sni-endpoints`;

        return Promise.all(toAdd.map((chain) => {

            return request.post(path, {
                body: {
                    certificate_chain: chain,
                    private_key: sniByChain[chain]
                }
            });
        }));
    })

    .then(() => {
        log(`Updated app SNI endpoints`);
        return Promise.resolve(app);
    })

    .catch((err) => {

        if (err.statusCode === 422 && err.error.id === 'invalid_params') {
            warn('Skipping SNI - the app must use Hobby or Professional dynos before an SNI endpoint can be added');
            return Promise.resolve(app);
        }

        error(`Error: ${err}`);
        process.exit(1);
    });
}

module.exports = function(req) {

    request = req;
    return sni;
};
