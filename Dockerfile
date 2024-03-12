FROM golang:1.22 AS base

WORKDIR /usr/src/app

ENV CGO_ENABLED=0
RUN go install github.com/playtechnique/andrew/cmd/andrew@v0.0.4

FROM scratch

COPY --from=base /etc/passwd /etc/passwd
USER 1000
COPY --from=base /go/bin/andrew /andrew
COPY --chown=1000:1000 website /website

EXPOSE 8080
#By default, andrew will serve the pwd.
ENTRYPOINT ["/andrew", "/website"]