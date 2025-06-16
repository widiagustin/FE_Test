FROM node:20-alpine

WORKDIR /app

# Enable corepack for Yarn Berry
RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"] 