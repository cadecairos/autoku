let Promise        = require('bluebird');
let { log, error } = require('../logger');

let request;

function addons(app, desiredAddons) {

    let existingAddons;

    // fetch existing app addons
    return request.get(`/apps/${app.name}/addons`)
    
    // filter existing addons for those which aren't in the new schema
    .then((response) => {

        existingAddons = response;

        let toRemove = existingAddons
        .filter((addon) => !desiredAddons[addon.name])
        .map((addon) => addon.name);

        return Promise.resolve(toRemove);
    })
    
    // remove addons not present in the new app schema
    .then((toRemove) => {

        if (!toRemove.length) {
            return Promise.resolve();
        }

        return Promise.all(toRemove.map((addon) => {
            return request.delete(`/apps/${app.name}/addons/${addon}`)
        }));
    })

    // check if existing addons need a plan change
    .then(() => {

        let toUpdate = existingAddons
        .filter((addon) => {
            if (!desiredAddons[addon.name]) {
                return false;
            }

            return addon.plan.name !== desiredAddons[addon.name];
        })
        .map((addon) => addon.name);

        return Promise.resolve(toUpdate);
    })

    // Update addon plans
    .then((toUpdate) => {

        if (!toUpdate.length) {
            return Promise.resolve();
        }

        return Promise.all(toUpdate.map((addon) => {
            return request.patch(`/apps/${app.name}/addons/${addon}`, {
                plan: desiredAddons[name].plan
            });
        }));
    })

    // filter out the new addons to create
    .then(() => {

        let toCreate = Object.keys(desiredAddons)
        .filter((name) => !existingAddons[name])
        .map((name) => `${name}:${desiredAddons[name]}`);

        return Promise.resolve(toCreate);
    })

    // Create new addons
    .then((toCreate) => {

        if (!toCreate.length) {
            return Promise.resolve();
        }

        return Promise.all(toCreate.map((addon) => {
            return request.post(`/apps/${app.name}/addons`, {
                body: {
                    plan: addon
                }
            });
        }));
    })
    .then(() => {

        log(`Updated addons and plans`);
        return Promise.resolve(app);
    })
    .catch((err) => {

        error(`Error: ${err}`);
        process.exit(1);
    });
}

module.exports = function(req) {

    request = req;
    return addons;
};
