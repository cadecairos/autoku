let Joi     = require('joi');
let Promise = require('bluebird');

const procTypeSchema = Joi.object({
    quantity: Joi.number().min(0).required(),
    size: Joi.string().allow([
        'performance-m',
        'performance-l',
        'standard-1x',
        'standard-2x',
        'free',
        'hobby'
    ])
});

const formationSchema = Joi.object({
    urgentWorker: procTypeSchema,
    worker:       procTypeSchema,
    clock:        procTypeSchema,
    web:          procTypeSchema
})
.or('web', 'worker', 'urgentWorker', 'clock').required();

const regionSchema = Joi.string().allow([
    'frankfurt',
    'virginia',
    'oregon',
    'sydney',
    'tokyo',
    'us',
    'eu'
])
.required();

const optionalStringArraySchema = Joi.array().items(Joi.string()).optional();

const addonsSchema = Joi.object().keys().required();

const sniSchema = Joi.array().items(Joi.object({
    'certificate-chain': Joi.string().required(),
    'private-key':       Joi.string().required()
}))
.optional();

const configSchema = Joi.object().optional();

const nameSchema = Joi.string().regex(/^[a-z][a-z0-9-]{2,29}$/);

const stackSchema = Joi.string().allow('cedar-14').optional();

const maintenanceSchema = Joi.boolean().default(false, 'default maintenance mode off');

const appSchema = Joi.object().keys({
    collaborators: optionalStringArraySchema,
    maintenance:   maintenanceSchema,
    configVars:    configSchema,
    buildpacks:    optionalStringArraySchema,
    logDrains:     optionalStringArraySchema,
    formation:     formationSchema,
    features:      optionalStringArraySchema,
    domains:       optionalStringArraySchema,
    region:        regionSchema,
    addons:        addonsSchema,
    stack:         stackSchema,
    name:          nameSchema,
    sni:           sniSchema
});

module.exports = function validateSchema(schema) {
    return new Promise(function(resolve, reject) {
        appSchema.validate(schema, (err) => {
            if (err) {
                return reject(err);
            }

            resolve();
        });
    });
};
