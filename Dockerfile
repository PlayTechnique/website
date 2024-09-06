FROM golang:1.23 AS base

WORKDIR /usr/src/app

ENV CGO_ENABLED=0
RUN go install github.com/playtechnique/andrew/cmd/andrew@v0.1.5

FROM scratch

COPY --from=base /etc/passwd /etc/passwd
USER 1000
COPY --from=base /go/bin/andrew /andrew
COPY --chown=1000:1000 content /website

EXPOSE 8080

ENTRYPOINT ["/andrew"]