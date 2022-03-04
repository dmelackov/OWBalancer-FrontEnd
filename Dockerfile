FROM node:16.13.0-slim

RUN \
    apt update && \
    apt install -y software-properties-common && \
    add-apt-repository -y ppa:nginx/stable && \
    apt remove -y software-properties-common && \
    apt install -y nginx && \
    rm -rf /var/lib/apt/lists/* && \
    chown -R www-data:www-data /var/lib/nginx



WORKDIR /usr/share/node/html

COPY . .

RUN npm install && \
    npm run build && \
    cp -R ./dist /usr/share/nginx/html && \
    cp ./nginx/nginx.conf /etc/nginx/nginx.conf && \
    apt-get -qy autoremove && \
    rm -R /usr/share/node/html 

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]