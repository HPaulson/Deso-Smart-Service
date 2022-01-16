#!/bin/bash

# Start from poject root dir
cd ../

if [ $1 == "build" ]; then
    # Build new app image
    docker build . -t app -f config/Dockerfile >> config/build.log

elif [ $1 == "up" ]; then
    # Start the compose insance
    docker-compose --profile $2 -f config/docker-compose.yml up -d
    if [ $2 == "dev" ]; then
        # If we're running in dev, we'll want to follow log output while building
        cd config
        while :
        do
            clear
            docker-compose logs -f -t
            if [ $? == 1 ]; then
                # If we recive a non-0 exit code, this means the user exited the service (Ctrl-C)
                # Any other exit code (including restart or error) will result in 0, and thus respawn logs
                exit
            fi
        done
    fi

elif [ $1 == "restart" ]; then
    # This will restart only the app service, which will then cause the running logs instance to clear & respawn as notes above
    cd config
    docker-compose restart app
else 
    echo "You must specify the action (build, up, restart) and enviornment (dev, stage, prod)"
fi