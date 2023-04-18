FROM mhart/alpine-node:16

# Create app directory
WORKDIR /srv/app

# Install app dependencies
COPY package.json package-lock.json prisma ./
COPY .env.production ./.env

RUN npm install

# Clean unnecessary package cache
RUN npm cache clean --force

# @NOTE: Everyhing above here should change rarely to benefit from docker caching.
COPY . .

# Build app
ENV NODE_OPTIONS=--max-old-space-size=8192

RUN npm run build

# Start app
CMD npm run deploy
