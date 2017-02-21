import appInfo       from './appInfo';
import createApp     from './createApp';
import maintenance   from './maintenance';
import configVars    from './configVars';
import addons        from './addons';
import collaborators from './collaborators';
import features      from './features';

export default function(request) {
    return {
        appInfo: appInfo(request),
        createApp: createApp(request),
        maintenance: maintenance(request),
        configVars: configVars(request),
        addons: addons(request),
        collaborators: collaborators(request),
        features: features(request)
    };
};