let appInfo       = require('./appInfo');
let createApp     = require('./createApp');
let maintenance   = require('./maintenance');
let configVars    = require('./configVars');
let addons        = require('./addons');
let collaborators = require('./collaborators');
let features      = require('./features');
let formation     = require('./formation');
let domains       = require('./domains');
let logDrains     = require('./logDrains');
let sni           = require('./sni');
let buildpacks    = require('./buildpacks');

module.exports = function(request) {
    return {
        collaborators: collaborators(request),
        maintenance:   maintenance(request),
        buildpacks:    buildpacks(request),
        configVars:    configVars(request),
        createApp:     createApp(request),
        formation:     formation(request),
        logDrains:     logDrains(request),
        features:      features(request),
        appInfo:       appInfo(request),
        domains:       domains(request),
        addons:        addons(request),
        sni:           sni(request)
    };
};