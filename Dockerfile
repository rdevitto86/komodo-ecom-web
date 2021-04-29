# ALL OF THESE COMMANDS ARE SUBJECT TO CHANGE
# CHANGE/EDIT COMMANDS TO FIT WEBPACK/REACT/CLOUD
FROM node:10-alpine AS builder

ENV LOG_LEVEL=ERROR

WORKDIR /app
COPY ./package.json ./.npmrc ./
RUN npm install
COPY . .
RUN npm run prebuild
RUN npm run builder
RUN rm ./.npmrc

FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN ls -ls
CMD ["npm", "run", "start:prod"]