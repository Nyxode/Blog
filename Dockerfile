FROM node:20

WORKDIR /home/app

COPY package.json yarn.lock ./
RUN yarn install

RUN yarn global add firebase-tools

COPY . .

CMD ["yarn", "dev"]
