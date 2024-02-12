FROM node:18.16.0-alpine AS build

RUN npm i -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN pnpm install

COPY . .

RUN pnpm run db:generate
RUN pnpm run build

FROM node:18.16.0-alpine as production

RUN npm i -g pnpm

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ENV PORT=5000
EXPOSE 5000

WORKDIR /usr/src/app

RUN apk --no-cache add curl

HEALTHCHECK CMD curl --fail http://localhost:5000/api/health || exit 1

COPY package*.json ./
COPY git-sha.* ./

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY ./prisma ./prisma

ENV EXECUTION_FILE=dist/main

CMD pnpm run db:deploy && node ${EXECUTION_FILE}
