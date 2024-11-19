FROM node:lts-alpine
WORKDIR /app

RUN apk update
RUN apk upgrade
RUN apk add bash vim nano
RUN npm install -g pnpm

COPY endpoint.sh .

CMD ["bash", "endpoint.sh"]