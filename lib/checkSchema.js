let YAML           = require('yamljs');
let { log, error } = require('./logger');
let validateSchema = require('./validateSchema');

module.exports = function checkSchema(config) {
    let appConfig = YAML.load(config);

    validateSchema(appConfig)
    .then(() => {
        log('This appears to be a valid app schema!');
    })
    .catch((err) => {
        error(`There's something wrong with the schema: ${err.toString()}`);
    });
};