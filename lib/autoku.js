let YAML    = require('yamljs');
let chalk   = require('chalk');
let request = require('./request');
let heroku  = require('./heroku'); 

let { log, error, bold } = require('./logger');

module.exports = function deploy(cfg) {
    let config = cfg;
    
    if (!config) {
        error('You must specify a yaml file');
        process.exit(1);
    }

    if (!this.token) {
        error('You must provide an auth token for heroku');
        process.exit(1);
    }

    let appConfig = YAML.load(config);

    let herokuRequest = request(this.token);

    let {
        collaborators,
        maintenance,
        buildpacks,
        configVars,
        createApp,
        formation,
        logDrains,
        features,
        appInfo,
        domains,
        addons,
        sni
    } = heroku(herokuRequest);

    // Test if the app exists
    appInfo(appConfig.name)
    
    // Skip app creation
    .then(function(app) {

        log(bold(`Updating ${app.name}`));

        return Promise.resolve(app);
    })

    // Create the app
    .catch(() => {

        log(`Creating new app: ${bold(appConfig.name)}`);
        
        let { name, region, stack } = appConfig;
        return createApp(name, region, stack);
    })

    // set maintenance status
    .then((app) => maintenance(app, appConfig.maintenance))

    // set/update/remove environment variables
    .then((app) => configVars(app, appConfig.configVars))

    // create/update/remove addons
    .then((app) => addons(app, appConfig.addons || []))

    // add/remove collaborators
    .then((app) => collaborators(app, appConfig.collaborators || []))

    // add/remove app features
    .then((app) => features(app, appConfig.features || []))

    // update app formation
    .then((app) => formation(app, appConfig.formation))

    // add/remove domains
    .then((app) => domains(app, appConfig.domains || []))

    // add/remove log drains
    .then((app) => logDrains(app, appConfig.logDrains || []))

    // add/remove sni endpoints
    .then((app) => sni(app, appConfig.sni || []))

    // update buildpack installations
    .then((app) => buildpacks(app, appConfig.buildpacks))

    .then((app) => {
        log(chalk.green(`All done!\nWeb URL: ${app.web_url}`));
    });
};