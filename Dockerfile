FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY *.svg /usr/share/nginx/html/
EXPOSE 80
