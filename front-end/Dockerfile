FROM node:hydrogen-slim as BUILD_IMAGE
WORKDIR /app/react-app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:hydrogen-slim as PRODUCTION_IMAGE
WORKDIR /app/react-app

COPY --from=BUILD_IMAGE /app/react-app/dist/ /app/react-app/dist/

COPY package.json .
COPY vite.config.js .

RUN npm install vite

CMD ["npm", "run", "preview"]