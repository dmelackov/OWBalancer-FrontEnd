FROM yicktop/nginx-node:latest

WORKDIR /usr/share/node/html


COPY . .



RUN npm install && \
    npm run build && \
    cp -R /usr/share/node/html/dist /usr/share/nginx/html && \
    apt-get -qy autoremove && \
    rm -R /usr/share/node/html && \
    cp -R ./nginx /etc/nginx

VOLUME /usr/share/nginx/html
VOLUME /etc/nginx