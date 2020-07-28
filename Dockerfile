FROM node:12.16.2 AS builder

WORKDIR /usr/build
RUN npm i npm@latest -g

COPY . /usr/build
RUN npm ci
RUN node ace build --production

FROM node:12.16.2-alpine3.11 AS app

WORKDIR /usr/src/app

ENV NODE_ENV production
ENV ENV_SILENT true

COPY --from=builder /usr/build/build .
RUN npm ci

USER node
CMD [ "node", "server.js" ]
