# Usando a imagem oficial do Node.js
FROM node:16

# Define o diretório de trabalho
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código da aplicação para dentro do container
COPY . .

# Exponha a porta que o servidor vai rodar
EXPOSE 5000

# Comando para iniciar o servidor
CMD ["npm", "start"]
