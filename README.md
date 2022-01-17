# Deso Smart Services

This project serves as a simple implementation example (framework) of
[Deso](https://deso.org) Protocol's
[Smart Services](https://www.deso.org/blog/smart-services). This framework comes
with out-of-the-box SSL, MongoDB, dev/stage/prod environments, and modularity.

# Structure

The structure of this repo is as follows:

- Config - Stores all project configuration for Docker, Nginx, Git, MongoDB,
  etc.
  - data - Any required project data, such as local Mongo data for development
    or certbot data for production
- Scripts - Includes helpful utils for running the project in dev, stage, and
  prod. See [Development & Deployment](#development-and-deployment) for more
  details.
- SRC
  - Db - Stores database-related interactions
  - Events - Event listeners, including trigger()
  - Global - Global data such as constant values
  - Router - The router which handles incoming REST requests
  - Types - Custom types used throughout the project
  - Utils - Utility functions for repeat code & source modularity

# Development & Deployment

## Prerequisites

- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- (Optional) [Deno Runtime](https://deno.land) - Recommended for IntelliSense &
  formatting

## Getting Started

First, ensure that all the required [prerequisites](prerequisites) have been
correctly installed. Without these, none of the following steps will work as
expected. Once these are setup and good to go, you'll have a little bit of
configuration to do. First, you'll want to set a MongoDB Connection String to
`$MONGO_CONNECTION_STRING`. This can be accomplished using `export`, or by
setting the variable in `config/.env`. If you're running the application in the
Development environment, then using the included containerized DB instance is
recommended. In that case, you add the following contents to `config/.env`:

```
MONGO_CONNECTION_STRING=mongodb://mongodb:27017
```

Once you've added the environment variable, you'll want to build the docker
image. To accomplish this, you use the included [App Script](#app-script) by
running `./app.sh build` in the `config` folder. Once this has completed, you're
all set! To start the application in the Development environment you can again
use the app script by running `./app.sh up dev`. See the
[App Script](#app-script) section below for all available options.

## App Script

To deploy the Smart Service, you can utilize the `app.sh` script. It takes a few
possible arguments:

- Action
  - up - Starts the application
    - dev
    - stage
    - prod
  - build - Builds a new App image (This is needed when files are added, and
    before you first run the project)
  - restart - Restarts the App service inside of Compose

Examples:

```
./app.sh up dev
./app.sh build
./app.sh restart
```

I personally like to run `./app.sh up dev` in a split terminal with
`./app.sh restart` ready. This allows me to constantly view the logs for the app
service in one window, while having the ability to restart the service whenever
I make a change in the other.

### SSL In Production

When building for production, you will also want to utilize the
`init-letsencrypt.sh` script if you plan on using SSL. This will initalize
Certbot and create a dummy SSL cert to then validate the creation of a free
"Let's Encrypt" certificate. This script only has to be run once (The first time
setting up the project), and requires an existing A record pointed at the
server's IP.

# Contributing

When making changes, please first format code using `demo fmt`, and lint using
`deno lint`! Once everything is tested and looks good, open a PR.
