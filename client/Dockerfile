FROM node:10.14-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

COPY . .

RUN yarn install && yarn run build
CMD ["yarn", "run", "start"]
