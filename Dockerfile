FROM node:10

WORKDIR /usr/src/dnt

COPY package.json /usr/src/dnt

RUN yarn

COPY . /usr/src/dnt

RUN yarn tsc

ENV NODE_ENV=DOCKER


EXPOSE 3000


CMD ["yarn", "start"]

# CMD ["/bin/bash"]
