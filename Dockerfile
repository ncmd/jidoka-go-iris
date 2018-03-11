# Dockerfile

# Get latest 'golang' image from hub.docker.com ; name it as 'builder' to be referenced
FROM golang:latest as builder
# Location is taken using $GOPATH; Full Path '/Users/<user_name>/go/src/<project_name>
WORKDIR /go/src/jidoka-go-iris
# Copy everything from local directory to container directory
# Syntax: COPY ./source ./destination
COPY ./client/build/ ./client/build/
COPY ./client/package.json ./client/package.json
COPY ./client/package-lock.json ./client/package-lock.json
COPY ./vendor ./vendor
COPY ./app.go ./app.go
COPY ./bindata.go ./bindata.go
COPY ./Gopkg.lock ./Gopkg.lock
COPY ./Gopkg.toml ./Gopkg.toml
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./Procfile ./Procfile
COPY ./firestore.json ./firestore.json

# Install all dependancies from .go files
RUN go get -d -v ./...
# Multi-Stage Build - Reference: https://flaviocopes.com/golang-docker/
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .
# EXPOSE does not work in Heroku, but can be used locally
EXPOSE $PORT
# Use latest Alpine Linux build for complete minimal build
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
# Copy compiled version of app from builder
COPY --from=builder /go/src/jidoka-go-iris .
# Start the app
CMD ["./app"]