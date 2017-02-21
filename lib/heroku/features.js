let Promise        = require('bluebird');
let { log, error } = require('../logger');

let request;

function features(app, newFeatures) {

    let currentFeatures;

    // fetch current feature list
    return request.get(`/apps/${app.name}/features`)

    // filter out features that need to be updated
    .then((response) => {

        currentFeatures = response;

        // update status for all available features
        let toUpdate = currentFeatures
        .map((feature) => ({
            name: feature.name,
            enabled: newFeatures.includes(feature.name)
        }));

        return Promise.resolve(toUpdate);
    })

    // update features
    .then((toUpdate) => {

        return Promise.all(
            toUpdate.map((feature) => {
                let url = `/apps/${app.name}/features/${feature.name}`;
                request.patch(url, {
                    body: {
                        enabled: feature.enabled
                    }
                })
                .catch((err) => error(`Error: ${err.toString()}`));
            })
        );
    })

    .then(() => {

        log(`Updated app features`);
        return Promise.resolve(app);
    })

    .catch((err) => {

        error(`Error: ${err}`);
        process.exit(1);
    });
}

module.exports = function(req) {

    request = req;
    return features;
};
