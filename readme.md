# Fullstack: Dockerized Golang + Iris + API + Create-React-App + Heroku

## What is jidoka-go-iris?
    * 🐳 Dockerized Golang + Iris + Create-React-App that is deployable to Heroku
    * Uses Iris Web Framework - https://github.com/kataras/iris
    * Premade Iris RESTAPI
    * Uses 'dep' - Go Package manager
    * Uses Node.js for easy deployment scripts ❤️
    * Uses go-bindata to convert create-react-app build to readable go source
    * Deployable to Heroku (Supports Free Teir) - heroku.com
    * Uses Multi-Stage Builds to create a ~70MB Alpine Linux Image! (Trying to get it Smaller)

## Getting Started

1. Install Node.js
    * Node.js Installer - https://nodejs.org/en/download/
    * Or using Brew 🍺 for Mac - https://brew.sh
```bash
$ brew update && brew upgrade && brew install node
```

2. Manually configure "servername","config", & "root-package" variables in 'package.json' & Gopkg.toml files
    * <project_dir>/package.json
    * "config" - "servername":"<custom_server_name>" ; ie. jidoka-go-iris
    * root-package = "github.com/<github_username>/<this_github_project>" ; ie. github.com/ncmd/jidoka-go-iris

3. Setup your github account if you want to deploy it to Github
    * Via Github App; + > Add > Local Path = /Users/<username>/go/src/<project_name>
    -- Commit to Master > Sync
    * Via CLI
    -- https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/

4. Run Dev Workspace Setup Script (Only for Brew OSX)
    * Brew Update & Upgrade
    * Installs go
    * Installs dep
    * Installs git
    * Updates npm
    * Setups up env PATH
```bash
$ npm run dev-latest
```

5. Initialize Github Project (Only if you're signed-in to Github via Github App/Git)
```bash
$ npm run dev-github
```

6. Install go-bindata. Note to add $GOPATH/bin to your 'env' PATH
```bash
$ export PATH=$PATH:/Users/<username>/go/bin
$ go get -u github.com/jteeuwen/go-bindata/...
```
7. Install Docker 🐳 Stable (Edge not tested)
    * https://www.docker.com/get-docker
    * Run Docker, confirm it is running

6. Login to Heroku
```bash
$ heroku container:login
```

7. Run Locally (Without Heroku) Listens on port 8000
```bash
$ npm run dev
```
8 Build/Rebuild and Deploy/Redeploy App to Heroku (Requires Steps 1 - 7)
```bash
$ npm run deploy
```

## Details
    * Size: ~70.0MB
    * Fully loads client and server in ~1.5 Seconds | ~400ms
    * Dockerfile - File required for building docker image
    * package.json - Node.js deployments scripts
    * Gopkg.toml & Gopkg.lock - created by 'dep' (package manager)
    * Procfile - Used to run go apps in heroku
    * app.go - The App
    * client/ - Generated by $ create-react-app client
    * API Dev Demo: localhost:8000/api/
    * API Heroku Demo: <servername>.herokuapp.com/api/

## Developer Notes & Tips
    * Use the 'docker-clean' Node.js Script to stop and delete all old docker images
    * Again, the whole 'client' directory was genereated by (included when installing create-react-app from npm):
    -- $ npm install -g create-react-app
    -- $ create-react-app client
    * Always make sure the $GOPATH/bin is added to PATH on local machine (Otherwise will have problems with generating bindata.go)
    -- $ export GOPATH=$HOME/go
    -- $ export PATH=$PATH:/Users/<username>/go/bin
    * Always confirm Docker is RUNNING
    * In the .dockerignore file ALWAYS have node_modules folder included (All regenerated when client is built)
    * There should ALWAYS be a bindata.go file before building docker image
    * Rename a go build executable (Optional):
    -- $ go build -o apple *.go
    * If you do rename the app name, be sure to update the 'Procfile' and 'Dockerfile'
    * When managing dependencies use 'dep' - https://golang.github.io/dep/docs/introduction.html
    -- $ dep ensure -add github.com/foo/bar
    -- $ dep ensure -update github.com/foo/bar
    * When making changes to React App Client, always regenerate bindata.go file (Already done in package.json script)
    -- $ go-bindata ./client/build/...

## Scripts
    * dev - Runs both client and server without compiling/building supports hot changes
    * commit - Commit code, does not Push to Prod/Github
    * deploy - Deploys to Heroku and Push to Github
    * docker-test - Test Docker Build and Run
    * docker-run - Runs docker image
    * heroku-deploy - Build + Destroys existing Heroku Server + Recreate Server
    * heroku-replace - Destrys existing Heroku Server + Recreate Server
    * docker-build - Builds Docker image
    * docker-clean - Stops all Docker Containers + Deletes all Docker Containers + Existing Deletes Docker Images
    * build-client - Runs build script in client directory
    * dev-latests - Updates brew, dep, and npm to latest versions
    * dev-env - Configures $GOPATH and $GOPATH/bin path in environment variables + creates github project
    * dev-github - Creates New Github Project (Must manually set the "githubprojectname" variable)

