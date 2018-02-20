# Multi-stage Build
# Reference: https://flaviocopes.com/golang-docker/

FROM golang:latest as builder
WORKDIR /go/src/jidoka-go-iris
COPY . .
RUN go get -d -v ./...
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

# EXPOSE does not work in Heroku
EXPOSE 8000
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /go/src/jidoka-go-iris .
CMD ["./app"]