# Deso Smart Services
This project serves as a simple implementation example (framework) of [Deso](https://deso.org) Protocol's [Smart Services](https://www.deso.org/blog/smart-services). This framework comes with out-of-the-box SSL, MongoDB, dev/stage/prod enviornments, and modularity.

# Structure
The structure of this repo is as follows:

- Config - Stores all project configuration for Docker, Nginx, Git, MongoDB, and etc
    - data - Any requiered project data, such as local Mongo data for development or certbot data for production
- Scripts - Includes helpful utils for running the project in dev, stage, and prod. See [Development & Deployment](#development-and-deployment) for more details.
- Src
    - Db - Stores database-related interactions
    - Events - Event listeners, including trigger()
    - Global - Global data such as constant values
    - Router - The router which handles incoming REST requests
    - Types - Custom types used throughout the project
    - Utils - Utility functions for repeate code & source modularity

# Development & Deployment

## Pre-Requisites
- [Docker Engine](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started
First, ensure that all the required [pre-requisites](pre-requisites) have been correctly installed. Without these, none of the following steps will work as expected. Once these are setup and good to go, you'll have a little bit of configuration to do. First, you'll want to set a MongoDB Connection String to `$MONGO_CONNECTION_STRING`. This can be accomplished using `export`, or by setting the variable in `config/.env`. If you're running the application in the Development enviornment, then using the included containerized DB instance is reccomended. In that case, you add the following contents to `config/.env`:
```
MONGO_CONNECTION_STRING=mongodb://127.0.0.1:27017
``` 

Once you've added the enviornment variable, you'll want to build the docker image. To accomplish this, you use the included [App Script](#app-script) by running `./app.sh build` in the `config` folder. Once this has compleated, you're all set! To start the application in the Development enviornment you can again use the app script by running `./app.sh up dev`. See the [App Script](#app-script) section below for all available options.

## App Script
To deploy the Smart Service, you can utilize the `app.sh` script. It takes a few possible arguments:

- Action
    - up - Starts the application
    - build - Builds a new App image (This is needed when files are added, and before you first run the project)
    - restart - Restarts the App service inside of Compose
- Enviornment
    - dev
    - stage
    - prod

Examples:
```
./app.sh up dev
./app.sh build
./app.sh restart
```

I personally like to run `./app.sh up dev` in a split terminal with `./app.sh restart` ready. This allows me to constantly view the logs for the app service in one window, while having the ability to restart the service whenever I make a change in the other.

### SSL In Production
When building for production, you will also want to utilize the `init-letsencrypt.sh` script if you plan on using SSL. This will initalize Certbot and create a dummy SSL cert to then validate the creation of a free Let's Encrypt Certificate. This script only has to be ran once (The first time setting up the project), and requiers an existing A record pointed at the server's IP.
