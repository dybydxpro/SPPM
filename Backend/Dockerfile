FROM node:latest
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm i
RUN npm install -g prisma
COPY . /usr/src/app/
RUN npx prisma generate
CMD ["npm", "start"]