# A Dockerized Golang API App built with Iris web framework

## What is jidoka-go-iris?
    * 🐳 Dockerized Golang Webapp
    * Uses Iris Web Framework
    * Premade Iris RESTAPI
    * Uses 'dep' - Go Package manager
    * Uses Node.js for easy deployment scripts ❤️
    * Deployable to Heroku (Supports Free Teir)
    * Uses Multi-Stage Builds to create a 33MB Alpine Linux Image!

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
3. Install Docker 🐳
    * https://www.docker.com/get-docker
4. Manually configure "servername" Environment Variable in 'package.json' file
    * <project_dir>/package.json
    * "config" - "servername":"<custom_server_name>"
5. Login to Heroku
```bash
$ heroku container:login
```
6. Run Locally
* 🔥⚠️ WARNING ⚠️🔥 - This script is set to remove all existing docker containers & images
```bash
$ npm run dev
```
7. Build/Rebuild and Deploy/Redeploy App to Heroku
* 🔥⚠️ WARNING ⚠️🔥 - This script is set to remove all existing docker containers & images
```bash
$ npm run deploy
```

## Details
    * Size: ~33.0MB
    * Dockerfile - File required for building docker image
    * Deployments scripts in 'package.json'
    * Gopkg.toml & Gopkg.lock - created by 'dep' (package manager)
    * Procfile - Used to run go apps in heroku
    * app.go - The App

## Developer Notes
    * Rename a go executable:
    -- $ go build -o apple *.go
    * If you do rename, be sure to update the 'Procfile' and 'Dockerfile'
    * When managing dependancies use 'dep' - https://golang.github.io/dep/docs/introduction.html
    -- $ dep ensure -add github.com/foo/bar
    -- $ dep ensure -update github.com/foo/bar


