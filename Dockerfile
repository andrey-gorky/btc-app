FROM node:16

EXPOSE 8080

WORKDIR /app

RUN npm install i npm@latest -g

COPY package*.json ./

RUN npm i

COPY . .
