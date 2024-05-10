FROM node:latest

WORKDIR /opt/app
RUN git clone https://github.com/Eliud1013/ProFeCo /opt/app


RUN npm install
ENV DB_HOST=127.0.0.1
ENV DB_USER=root
ENV DB_PASSWORD=12345
ENV DB=Profeco
ENV SECRET=958db6d9d22a47e980ba2c6228552edb

EXPOSE 3000

CMD ["node","index_nossl.js"]
