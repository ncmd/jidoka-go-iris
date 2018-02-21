# A Dockerized Golang API App built with Iris web framework

## What is jidoka-go-iris?
    * 🐳 Dockerized Golang + Iris + Create-React-App that is deployable to Heroku
    * Uses Iris Web Framework
    * Premade Iris RESTAPI
    * Uses 'dep' - Go Package manager
    * Uses Node.js for easy deployment scripts ❤️
    * Uses go-bindata to convert create-react-app build to readable go source
    * Deployable to Heroku (Supports Free Teir)
    * Uses Multi-Stage Builds to create a ~70MB Alpine Linux Image! (Trying to get it Smaller)

## Getting Started

1. Install Node.js
    * Node.js Installer - https://nodejs.org/en/download/
    * Or using Brew 🍺 for Mac - https://brew.sh
```bash
$ brew update && brew upgrade && brew install node
```
2. Install Dep
```bash
$ brew install dep
```
3. Install go-bindata
Note to add $GOPATH/bin to your 'env' PATH
```bash
$ export PATH=$PATH:/Users/<username>/go/bin
$ go get -u github.com/jteeuwen/go-bindata/...
```
4. Install Docker 🐳 Stable (Edge not tested)
    * https://www.docker.com/get-docker
    * Run Docker, confirm it is running

5. Manually configure "servername" & "config" variables in 'package.json' file
    * <project_dir>/package.json
    * "config" - "servername":"<custom_server_name>"

6. Login to Heroku
```bash
$ heroku container:login
```

7. Run Locally
* 🔥⚠️ WARNING ⚠️🔥 - This script is set to remove all existing docker containers & images
```bash
$ npm run dev
```

8. Build/Rebuild and Deploy/Redeploy App to Heroku
* 🔥⚠️ WARNING ⚠️🔥 - This script is set to remove all existing docker containers & images
```bash
$ npm run deploy
```

## Details
    * Size: ~70.0MB
    * Dockerfile - File required for building docker image
    * package.json - Deployments scripts
    * Gopkg.toml & Gopkg.lock - created by 'dep' (package manager)
    * Procfile - Used to run go apps in heroku
    * app.go - The App
    * client/ - Generated by $ create-react-app client

## Developer Notes
    * Always make sure the $GOPATH/bin is added to PATH on local machine (Otherwise will have problems with generating bindata.go)
    * Always confirm Docker is RUNNING
    * Rename a go build executable (Optional):
    -- $ go build -o apple *.go
    * If you do rename, be sure to update the 'Procfile' and 'Dockerfile'
    * When managing dependencies use 'dep' - https://golang.github.io/dep/docs/introduction.html
    -- $ dep ensure -add github.com/foo/bar
    -- $ dep ensure -update github.com/foo/bar
    * When updating React Client, always regenerate bindata.go file (Already done in package.json script)


