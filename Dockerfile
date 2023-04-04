# Imagem base para o Node.js
FROM node:19.8.1

# Definir o diretório de trabalho do aplicativo
WORKDIR /app

# Copiar o package.json e o yarn.lock para o diretório de trabalho
COPY package.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código-fonte para o diretório de trabalho
COPY . .

# Expor a porta 4000 do contêiner
EXPOSE 4000