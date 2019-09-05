FROM node:10

WORKDIR /usr/src/dnt

COPY package.json /usr/src/dnt

RUN yarn

COPY . /usr/src/dnt

RUN yarn tsc

EXPOSE 3000

CMD ["yarn", "start"]
