# Usar una imagen de Node.js como base
FROM node:alpine

# Establecer el directorio de trabajo en la carpeta de la aplicación
WORKDIR /usr/src/app

# Copiar los archivos de la aplicación y las dependencias
COPY package*.json ./
RUN npm install

# Copiar el código de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Exponer el puerto en el que se ejecuta la aplicación Next.js
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]