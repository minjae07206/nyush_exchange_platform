# Stage 1: Build frontend
FROM node:20-slim AS frontend

WORKDIR /app

COPY nyush_exchange_platform_frontend/package*.json ./nyush_exchange_platform_frontend/
RUN npm install --prefix ./nyush_exchange_platform_frontend

COPY nyush_exchange_platform_frontend ./nyush_exchange_platform_frontend/
RUN npm run build --prefix ./nyush_exchange_platform_frontend

# Stage 2: Setup backend
FROM node:20-slim AS backend

WORKDIR /app

RUN apt-get update && apt-get install -y curl --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY nyush_exchange_platform_server/package*.json ./
RUN npm ci

COPY nyush_exchange_platform_server ./nyush_exchange_platform_server/
COPY --from=frontend /app/nyush_exchange_platform_frontend/build ./nyush_exchange_platform_frontend/build

RUN npm run build --prefix ./nyush_exchange_platform_server

EXPOSE 3889
ENV NODE_ENV=production
CMD ["node", "nyush_exchange_platform_server/dist/app.js"]
