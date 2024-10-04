FROM node:20.16.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

RUN rm -rf .env.production

CMD [ "npm","run","start"]