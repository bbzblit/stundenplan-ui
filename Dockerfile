FROM node:18 as build-stage

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.17

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/stundenplan/ /usr/share/nginx/html