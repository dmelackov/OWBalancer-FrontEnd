FROM yicktop/nginx-node:latest

EXPOSE 8080


WORKDIR /usr/share/nginx/html



COPY ./src /usr/share/nginx/html/src
COPY ./public /usr/share/nginx/html/public
COPY ./babel.config.js /usr/share/nginx/html
COPY ./vue.config.js /usr/share/nginx/html
COPY ./package.json /usr/share/nginx/html

RUN npm install
RUN npm run build

COPY ./nginx/ /etc/nginx/

VOLUME /usr/share/nginx/html
VOLUME /etc/nginx
