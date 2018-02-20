# A Dockerized Golang API App built with Iris web framework

## Getting Started

1. Install Node.js
    * Using [Brew](https://brew.sh/)
2. Install Docker
    * https://www.docker.com/get-docker
3. Manually configure custom Environment Variables
    * <project_dir>/package.json
    * "config" - "servername":"<custom_server_name>"
4. Build and Deploy App to Heroku
* 🔥⚠️ WARNING ⚠️🔥 - This script is set to remove all existing docker containers & images
```bash
$ npm run deploy
```
5. Run Locally
* 🔥⚠️ WARNING ⚠️🔥 - This script is set to remove all existing docker containers & images
```bash
$ npm run dev
```

## Details
All Deployments Scripts are in 'package.json'

Gopkg.toml & Gopkg.lock - created by 'dep' (package manager)

Procfile - Used to run go apps in heroku

app.go - The App


