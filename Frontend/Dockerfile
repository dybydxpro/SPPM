FROM node:latest
WORKDIR /usr/src/app/client_app
COPY package*.json /usr/src/app/client_app/
RUN npm i
COPY . /usr/src/app/client_app/
CMD ["npm", "start"]