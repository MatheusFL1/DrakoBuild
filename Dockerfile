# Usando a imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala dependências necessárias e o Chromium
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    && npm install

# Instala bibliotecas adicionais necessárias para o Chromium no Alpine
RUN apk add --no-cache \
    libx11 \
    libxcomposite \
    libxdamage \
    libxext \
    libxi \
    libxtst \
    alsa-lib \
    cups-libs \
    dbus-libs \
    expat \
    fontconfig \
    gtk+3.0 \
    nspr \
    pango \
    mesa-gl \
    libxrandr

# Copia o código da aplicação para dentro do container
COPY . .

# Exponha a porta que o servidor vai rodar
EXPOSE 5000

# Define variáveis de ambiente para o Puppeteer usar o Chromium instalado
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Comando para iniciar o servidor
CMD ["npm", "start"]
