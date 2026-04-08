FROM node:20 as build

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto 
COPY . .

## Compilar Angular en modo producción
RUN npm run build

FROM nginx:alpine

# Copiar configuración personalizada de Nginx
COPY nginx/nginx.docker.conf /etc/nginx/conf.d/default.conf

## Copiar el build generado de Angular
COPY --from=build /app/dist/portal-pji-project/browser /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]