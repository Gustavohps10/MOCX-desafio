FROM node:18-alpine3.16

WORKDIR /usr/src/back

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY prisma ./prisma/
RUN yarn prisma generate

COPY . .
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]