FROM node:lts-alpine
WORKDIR /react-app

RUN apk update
RUN apk upgrade
RUN apk add bash vim nano

COPY endpoint.sh .

CMD ["sh", "endpoint.sh"]