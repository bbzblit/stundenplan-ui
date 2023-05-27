FROM node:18 as build-stage

WORKDIR /app
RUN git clone https://github.com/bbzblit/stundenplan-ui.git .
RUN npm install
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.17

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/stundenplan/ /usr/share/nginx/html