import YAML    from 'yamljs';
import chalk   from 'chalk';
import request from './request';
import heroku  from './heroku'; 

import { log, error, bold } from './logger';

export default function deploy(cfg) {
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
        appInfo,
        createApp,
        maintenance,
        configVars,
        addons,
        collaborators,
        features
    } = heroku(herokuRequest);

    // Test if the app exists
    appInfo(appConfig.name)
    
    // Skip app creation
    .then(function(app) {

        log(`Updating ${bold(app.name)}`);

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
    .then((app) => addons(app, appConfig.addons))

    // add/remove collaborators
    .then((app) => collaborators(app, appConfig.collaborators))

    .then((app) => features(app, appConfig.features || []));
};