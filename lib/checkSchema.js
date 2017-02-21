import YAML           from 'yamljs';
import { log, error } from './logger';
import validateSchema from './validateSchema';

export default function(config) {
    let appConfig = YAML.load(config);

    validateSchema(appConfig)
    .then(() => {
        log('This appears to be a valid app schema!');
    })
    .catch((err) => {
        error(`There's something wrong with the schema: ${err.toString()}`);
    });
}