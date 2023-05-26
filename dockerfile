FROM nginx:1.25.0-alpine

#config
COPY ./nginx.conf /etc/nginx/nginx.conf

#content
COPY ./src/site /usr/share/nginx/html/
COPY ./data /usr/share/nginx/html/data/