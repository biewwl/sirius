FROM node:lts-alpine3.17

WORKDIR /backend

ADD ./package*.json .

RUN npm install

COPY . .

EXPOSE 3010

ENTRYPOINT ["npm", "start"]
