FROM node:16-alpine3.15

WORKDIR /app
COPY . .
RUN yarn install --production

CMD [ "node" ,"app"]