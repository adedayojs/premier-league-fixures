FROM node:10

WORKDIR /usr/src/dnt

COPY package.json /usr/src/dnt

RUN yarn

COPY . /usr/src/dnt

ENV NODE_ENV=DOCKER

# RUN yarn tsc

EXPOSE 3000


CMD ["yarn", "start"]
