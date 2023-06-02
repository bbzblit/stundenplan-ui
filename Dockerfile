FROM nginxinc/nginx-unprivileged:1.17

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/stundenplan-ui/ /usr/share/nginx/html
