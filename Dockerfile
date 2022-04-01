FROM node:14.15-slim
WORKDIR /home/node/client
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 4000
RUN npm run build:ssr
CMD npm run serve:ssr
