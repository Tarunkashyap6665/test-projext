FROM node:20.16.0-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

ENV NEXT_PUBLIC_SERVER_URL=https://artifixer.tech

RUN npm run build

CMD [ "npm","run","start"]