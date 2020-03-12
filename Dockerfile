FROM node:12

WORKDIR /usr/fake-api-app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 62000
CMD [ "node", "server.js" ]
