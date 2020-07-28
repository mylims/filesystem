FROM node:12.16.2 AS builder

WORKDIR /usr/build
RUN npm i npm@latest -g

COPY . /usr/build
RUN npm ci
RUN node ace build --production

FROM node:12.16.2-alpine3.11 AS app

WORKDIR /usr/src/app

COPY --from=builder /usr/build/build .
COPY --from=builder /usr/build/node_modules ./node_modules

USER node
CMD [ "node", "server.js" ]
