FROM node:14.16.0

WORKDIR /app

COPY package.json .

RUN npm install -g npm@6.14.11

RUN npm install --force


# ENV NODE_OPTIONS=--max-old-space-size=4500

COPY . .


EXPOSE 3000

CMD ["npm", "start"]





