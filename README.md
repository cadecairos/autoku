# Autoku

## Version control your Heroku infrastructure using YAML

### Usage
```bash
# Install globally
npm install -g autoku

# see help
autoku help deploy

Usage: autoku [options] [command]


Commands:

  deploy|d [options] <config>  Deploy or update an app using the provided YAML file.
  check|c <config>             Validate the provided YAML file.
  help                         display this message
  help [cmd]                   display help for [cmd]

Options:

  -h, --help     output usage information
  -V, --version  output the version number


# validate a YAML file
autoku check my-heroku-app.yaml

# deploy an app using a YAML file
autoku deploy-k $HEROKU_API_KEY my-heroku-app.yaml
```

### YAML Configuration

Autoku supports the following configuration options:

```yaml
# The app name. Names can be upper or lower cased, can include numbers, and can only have dash characters. Required.
# Autoku does not currently support changing the app name.
name: my-heroku-app

# App region. Set it to any valid Heroku region. Required.
region: us

# Maintenance status. set to true to turn on maintenance mode. Optional. defaults to false.
maintenance: false

# The stack to use. optional. only accepts cedar-14 at this time.
stack: cedar-14

# Configuration variables for your application. required.
# Some config vars are set by addons, so at this time Autoku can not remove variables from the app if they aren't set in this object.
configVars:
  DATABASE_URL: postgres://user:pass@localhost:5432/data
  REDIS_URL: redis://authstring@localhost:3456

# Heroku add-ons and plans for your app. To remove an addon, delete it from this list. Optional.
addons:
  "heroku-postgresql": "hobby-dev"
  "heroku-redis": "hobby-dev"
  "logentries": "le_tryit"

# Collaborators for your app. remove emails from this list to remove access. Optional.
collaborators:
  - bob@example.com

# Heroku app features. Turn on and off by adding them to this list. Optional.
features:
  - log-runtime-metrics
  - http-session-affinity

# Change Dyno size and quantity for all app processes.
# until code is deployed to an app, this setting will be skipped. Required.
formation:
  web:
    quantity: 1
    size: hobby
  worker:
    quantity: 1
    size: hobby

# Log drains. Add or remove from this list to manage drains. Add-on drains are ignored.
logDrains:
  - https://example.com:7000
  - https://example.com:7111

# Custom domains for the app.
domains:
  - example.com
  - www.example.com

# SNI endpoint settings. add or remove entries from this list to manage SNI endpoints.
# Eventually, this setting will support loading from the environment or file.
# for now, if you do use Autoku for SNI configuration, DON'T COMMIT THIS TO A PUBLIC REPO
sni:
  - certificate-chain: "-----BEGINCERTIFICATE----- ... -----ENDCERTIFICATE-----"
    private-key: "-----BEGINPRIVATEKEY----- ... -----ENDPRIVATEKEY-----"

# configure buildpacks. The array ordinal of each entry determines the order that buildpacks will execute.
buildpacks:
  - heroku/nodejs
```
Feel free to copy [sample.yaml](./sample.yaml)
