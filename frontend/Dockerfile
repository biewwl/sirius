FROM node:lts-alpine3.17

WORKDIR /frontend

ADD ./package*.json .

RUN npm install

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
