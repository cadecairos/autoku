import appInfo       from './appInfo';
import createApp     from './createApp';
import maintenance   from './maintenance';
import configVars    from './configVars';
import addons        from './addons';
import collaborators from './collaborators';
import features      from './features';
import formation     from './formation';
import domains       from './domains';
import logDrains     from './logDrains';
import sni           from './sni';
import buildpacks    from './buildpacks';

export default function(request) {
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