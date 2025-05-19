# Usamos la imagen oficial de Node.js como base
FROM node:18

# Crear el directorio de la app dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (aún no los tienes, pero lo dejamos preparado)
COPY package*.json ./

# Instalar dependencias (aún no tienes, se saltará si no hay)
RUN npm install

# Copiar el resto de archivos de la app
COPY . .

# Exponer el puerto 4000 (o el que uses)
EXPOSE 4000

# Comando por defecto para correr la app
CMD ["node", "server.js"]
