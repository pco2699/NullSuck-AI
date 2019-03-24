FROM node:10.14-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install
COPY . .

RUN yarn run build:prod

CMD ["yarn", "run", "start:prod"]
