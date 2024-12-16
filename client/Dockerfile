FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

CMD ["yarn", "run", "dev"]