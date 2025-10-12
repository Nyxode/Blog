FROM node:20

WORKDIR /home/app

COPY package.json yarn.lock ./
RUN yarn install
RUN yarn global add firebase-tools

COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]
