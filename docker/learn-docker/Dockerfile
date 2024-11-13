# [BUILD IMAGE] `docker build -t express-server .`
# [RUN CONTAINER] `docker run -p 8964:8964 express-server`

FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY src ./src
COPY tsconfig.json ./

RUN npm install

FROM node:20-slim AS runtime

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 8964

CMD ["npm", "start"]

# ARG NVM_VERSION=v0.40.1

# USER redis

# VOLUME /data

# SHELL ["/bin/sh", "-c"]

# HEALTHCHECK --interval=5s --timeout=3s 

# ONBUILD COPY ./package.json /app

# ADD --keep-git-dir=true https://github.com/moby/buildkit.git#v0.10.1 
# ADD ubuntu-xenial-core-cloudimg-amd64-root.tar.gz

# ENTRYPOINT ["docker-entrypoint.sh"]

# RUN /bin/sh -c echo "alias ll='ls -alF --color=auto'" >> ~/.bashrc