FROM node:22-alpine

# npm kahdesti, koska bugi ei anna asentaa npm@latest suoraan
RUN apk add --no-cache git && \
    npm install -g npm@11.11.0 && \
    npm install -g npm@latest && \
    mkdir -p /workspace/node_modules && \
    chown -R node:node /workspace

WORKDIR /workspace
USER node

# nollakomento, joka jättää kontin pyörimään
CMD ["tail", "-f", "/dev/null"]