# This defines our starting point
FROM node:14.15.5-alpine3.11 as base

RUN apk --no-cache update && apk --no-cache upgrade
RUN apk add --no-cache  bash

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g @angular/cli
COPY ["package.json", "package-lock.json",  "./"]

# #
# # ---- Dependencies ----
FROM base AS dependencies

WORKDIR /usr/src/app
RUN npm install
COPY . .

EXPOSE ${PORT}