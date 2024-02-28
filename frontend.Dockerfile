FROM node:14-alpine AS builder

WORKDIR /front-end

COPY package*.json ./

RUN npm installl

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /front-end/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]