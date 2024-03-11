FROM node:18 AS builder

WORKDIR /app
COPY package*.json .
RUN npm ci



COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18 AS deploy-static
RUN apt update
#install java
RUN apt install -y default-jre
RUN apt install -y default-jdk
RUN update-alternatives --config java
#set java home
RUN export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
#install zip
RUN apt install -y zip

WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
#copy resources folder
COPY resources resources/
#copy static folder
COPY static static/
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
