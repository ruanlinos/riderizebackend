FROM node:alpine

WORKDIR /usr/src

COPY package.json /usr/src/
COPY .env /usr/src/
COPY . /usr/src/

RUN yarn
RUN yarn global add nodemon
RUN yarn gen-schema-types
RUN yarn tsc

EXPOSE 8000
