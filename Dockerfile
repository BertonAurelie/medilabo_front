# ---- Stage 1: build ----
FROM node:20-alpine AS builder

WORKDIR /app

# Installer les deps d'abord pour profiter du cache Docker
COPY package*.json ./
RUN npm ci


# Copier le reste du code
COPY . .

# Build Angular (adapte la config si besoin)
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/medilabo/browser/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
