FROM node:22

WORKDIR /node_app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

# CMD ['npm', 'start']
