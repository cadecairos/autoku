let { error } = require('../logger');

let request;

function appInfo(name) {
    return request.get(`/apps/${name}`)
    .then((json) => {
        return json;
    })
    .catch((reason) => {
        if (reason.error.id === 'not_found') {
            return Promise.reject();
        }
        error(`Error: ${error}`);
        process.exit(1);
    });
}

module.exports = function(req) {

    request = req;
    return appInfo;
};
