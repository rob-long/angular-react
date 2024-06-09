FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm run test-token

RUN npm install

COPY . .

CMD ["npm", "start"]
