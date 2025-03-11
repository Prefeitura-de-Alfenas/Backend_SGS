# Etapa 1: Construção
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências, incluindo as de desenvolvimento
RUN npm install

# Copia o código da aplicação
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Compila a aplicação
RUN npm run build

# Etapa 2: Produção
FROM node:18 AS production

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas as dependências de produção
COPY package*.json ./
RUN npm install --only=production

# Copia o código compilado e o cliente Prisma da etapa de construção
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/prisma /app/prisma

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD ["node", "dist/src/main.js"]
