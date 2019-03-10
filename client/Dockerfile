FROM node:10.14-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install && yarn run build

COPY . .

CMD ["yarn", "run", "start"]
