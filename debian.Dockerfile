FROM node:22-slim

# npm kahdesti, koska bugi ei anna asentaa npm@latest suoraan
RUN apt-get update && apt-get install -y git libcurl4 && \
    npx -y playwright install-deps && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    npm install -g npm@11.11.0 && \
    npm install -g npm@latest && \
    mkdir -p /workspace/node_modules && \
    chown -R node:node /workspace && \
    echo 'export PS1="\w \$ "' >> /home/node/.bashrc
    
WORKDIR /workspace
USER node

# asenna playwrightin selaimet node-käyttäjälle
RUN npx -y playwright install

# nollakomento, joka jättää kontin pyörimään
CMD ["tail", "-f", "/dev/null"]