FROM node:18-alpine3.16 as build

WORKDIR /usr/src/front

COPY package.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:1.16.0-alpine

COPY --from=build /usr/src/front/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 5000

CMD ["nginx","-g","daemon off;"]