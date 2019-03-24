FROM node:10.14-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn install
COPY . .

ENV NODE_ENV="production"
RUN yarn run build

CMD ["yarn", "run", "start"]
