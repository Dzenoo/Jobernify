FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn run build 

CMD ["yarn", "run", "start:prod"]