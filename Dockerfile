#  ----- FIRST STAGE -----
FROM node:16 AS builder

ENV NODE_ENV=production
WORKDIR /app

# COPY package*.json /app/
# COPY src /app/src
COPY . /app
RUN npm ci --production
RUN npm ci --production --prefix client
RUN npm run build --prefix client
RUN rm -rf client/node_modules


#  ----- SECOND STAGE -----
FROM node:16-alpine

ENV NODE_ENV=production
WORKDIR /app

EXPOSE 5100
#RUN npm i -g nodemon
COPY --from=builder /app /app/
USER node

CMD ["npm", "start"]
