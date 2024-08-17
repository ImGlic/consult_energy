# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e package-lock.json (ou yarn.lock) para o diretório de trabalho
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie todo o código-fonte para o diretório de trabalho
COPY . .

# Construa a aplicação
RUN npm run build

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000

# Defina o comando para iniciar a aplicação
CMD ["npm", "run", "preview"]
