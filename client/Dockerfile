FROM node:10.14-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install && nuxt-ts build
CMD ["nuxt-ts", "start"]
