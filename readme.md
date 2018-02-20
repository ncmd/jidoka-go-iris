# A Dockerized Golang API App built with Iris web framework

## Getting Started

1. Install Node.js
    * Using Brew for Mac - https://brew.sh
```bash
$ brew update && brew upgrade && brew install node
```
    * Brew Installer - https://nodejs.org/en/download/
2. Install Docker
    * https://www.docker.com/get-docker
3. Manually configure "servername" Environment Variable in 'package.json' file
    * <project_dir>/package.json
    * "config" - "servername":"<custom_server_name>"
4. Login to Heroku
```bash
$ heroku container:login
```
5. Build and Deploy App to Heroku
* 🔥⚠️ WARNING ⚠️🔥 - This script is set to remove all existing docker containers & images
```bash
$ npm run deploy
```
6. Run Locally
* 🔥⚠️ WARNING ⚠️🔥 - This script is set to remove all existing docker containers & images
```bash
$ npm run dev
```

## Details
Size: ~33.0MB

Dockerfile - File required for building docker image

All Deployments Scripts are in 'package.json'

Gopkg.toml & Gopkg.lock - created by 'dep' (package manager)

Procfile - Used to run go apps in heroku

app.go - The App


