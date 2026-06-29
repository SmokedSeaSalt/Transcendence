FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends docker.io docker-compose \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g npm@11.6.2