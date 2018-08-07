# Adapted from https://vocon-it.com/2017/11/02/angular-4-docker-example-for-angular-universal-cli/

### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8-alpine as builder

COPY package*.json ./

RUN npm set progress=false && npm config set depth 0

# Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

# Build the angular app.
RUN npm run build:ssr

### STAGE 2: Setup ###

FROM node:8-alpine

# Copy from builder.
COPY --from=builder /ng-app/dist /dist

EXPOSE 4000

CMD ["npm", "run", "serve:ssr"]
