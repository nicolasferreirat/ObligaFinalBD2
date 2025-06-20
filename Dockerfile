# Usamos la imagen oficial de Node.js como base
FROM node:18-alpine

# Crea el directorio de la app dentro del contenedor
WORKDIR /app

# Copia package.json y package-lock.json 
COPY package*.json ./

# Instalar dependencias 
RUN npm install

# Copia el resto de archivos de la app
COPY . .

# Exponer el puerto 4000 
EXPOSE 4000

# Comando por defecto para correr la app
CMD ["node", "server.js"]
