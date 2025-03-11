FROM node:18

# Cria diretório da aplicação
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o código da aplicação
COPY . .

# Compila a aplicação
RUN npm run build

# Expõe a porta 3000 que é a porta padrão do NestJS e está configurada no seu docker-compose
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "run", "start:prod"]