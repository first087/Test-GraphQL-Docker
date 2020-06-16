FROM node:14.4-alpine

EXPOSE 3000

WORKDIR /app

CMD [ "npm", "start" ]

COPY . .

RUN npm install --production

USER node
