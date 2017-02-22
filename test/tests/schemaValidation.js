const YAML    = require('yamljs');
const Promise = require('bluebird');
const chai    = require('chai');

const validateSchema = require('../../lib/validateSchema');
const { clone }      = require('../utils');

const { expect, assert } = chai;

const validSchema = YAML.load('test/tests/fixtures/validSchema.yaml'); 

describe("validateSchema", function() {
    it('exists and is a function', function(done) {
        expect(validateSchema).to.exist;
        expect(validateSchema).to.be.a('function');
        done();
    });

    it('Successfully validates a schema', function() {

        return validateSchema(validSchema)
        .then(() => {
            assert(true, 'The schema validated');
        })
        .catch((err) => {
            assert(false, `The schema should validate: ${err.toString()}`);
        });
    });
    
    it('catches invalid name values', function() {
        let invalidNames = [
            'invalid_name',
            'invalid name',
            'invalidname!',
            'this-name-is-just-too-damn-long',
            '',
            null
        ]
        .map((title) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.name = name;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidNames)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid titles were rejected');
        });
    });

    it('catches invalid region values', function() {
        let invalidRegions = [
            'fakeregion',
            '',
            null
        ]
        .map((region) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.region = region;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidRegions)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid regions were rejected');
        });
    });

    it('catches invalid maintenance values', function() {
        let invalidMaintenance = [
            'invalid',
            () => {}
        ]
        .map((maintenance) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.maintenance = maintenance;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidMaintenance)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid maintenance values were rejected');
        });
    });

    it('catches invalid config values', function() {
        let invalidConfigVars = [
            'invalid',
            () => {},
            true
        ]
        .map((configVars) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.configVars = configVars;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidConfigVars)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid configVars were rejected');
        });
    });

    it('catches invalid addon values', function() {
        let invalidAddons = [
            'invalid',
            () => {},
            true
        ]
        .map((addons) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.addons = addons;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidAddons)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid addons were rejected');
        });
    });

    it('catches invalid collaborator values', function() {
        let invalidCollaborators = [
            123,
            () => {},
            true
        ]
        .map((collaborators) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.collaborators = collaborators;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidCollaborators)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid collaborators were rejected');
        });
    });

    it('catches invalid features values', function() {
        let invalidFeatures = [
            'invalid',
            () => {},
            true
        ]
        .map((features) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.features = features;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidFeatures)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid features were rejected');
        });
    });

    it('catches invalid formation values', function() {
        let invalidFormation = [
            'invalid',
            () => {},
            true,
            [1, 2, 3],
            {
                notAllowed: {
                    quantity: 1,
                    size: 'hobby'
                }
            },
            {
                web: {
                    notAllowed: 1,
                    size: 'hobby'
                }
            },
            {
                web: {
                    quantity: 'notAllowed',
                    size: 'hobby'
                }
            },
            {
                web: {
                    quantity: 1,
                    size: 'notAllowed'
                }
            },
            {
                web: [],
                worker: {
                    quantity: 1,
                    size: 'hobby'
                }
            }
        ]
        .map((formation) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.formation = formation;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidFormation)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid formation were rejected');
        });
    });

    it('catches invalid logDrain values', function() {
        let invalidDrains = [
            'invalid',
            () => {},
            true
        ]
        .map((logDrains) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.logDrains = logDrains;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidDrains)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid logDrains were rejected');
        });
    });

    it('catches invalid domains values', function() {
        let invalidDomains = [
            'invalid',
            () => {},
            123,
            true,
            [ 1, 2, 3]
        ]
        .map((domains) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.domains = domains;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidDomains)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid domains were rejected');
        });
    });

    it('catches invalid sni values', function() {
        let invalidSni = [
            111,
            () => {},
            true,
            {},
            {
                'certificate-chain': '-----BEGIN CERTIFICATE----- ...'
            },
            {
                'private-key': '-----BEGIN CERTIFICATE----- ...'
            },
            {
                'certificate-chain': 123,
                'private-key': '-----BEGIN CERTIFICATE----- ...'
            },
            {
                'certificate-chain': '-----BEGIN CERTIFICATE----- ...',
                'private-key': 123
            },
            {
                invalidKey: '-----BEGIN CERTIFICATE----- ...',
                'certificate-chain': '-----BEGIN CERTIFICATE----- ...',
                'private-key': '-----BEGIN CERTIFICATE----- ...'
            }
        ]
        .map((sni) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.sni = sni;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidSni)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid sni were rejected');
        });
    });

    it('catches invalid buildpack values', function() {
        let invalidBuildpacks = [
            'invalid',
            () => {},
            123,
            true,
            [ 1, 2, 3]
        ]
        .map((buildpacks) => function(resolve, reject) {
            let invalidSchema = clone(validSchema);
            invalidSchema.buildpacks = buildpacks;
            return validateSchema(invalidSchema);
        });

        return Promise.all(invalidBuildpacks)
        .then(() => {
            assert(false, 'None of the schemas should validate');
        })
        .catch((err) => {
            assert(true, 'All the invalid domains were rejected');
        });
    });
});
