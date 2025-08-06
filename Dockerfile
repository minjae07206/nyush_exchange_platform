# ---------- Stage 1: Build frontend ----------
FROM node:20-slim AS frontend

WORKDIR /app/frontend

# Copy only frontend package files first for deterministic install
COPY nyush_exchange_platform_frontend/package.json nyush_exchange_platform_frontend/package-lock.json ./

# Install frontend deps (using npm ci for lockfile fidelity)
RUN npm ci

# Copy source and build
COPY nyush_exchange_platform_frontend/ ./
RUN npm run build

# ---------- Stage 2: Build backend (with dev deps) ----------
FROM node:20-slim AS builder

WORKDIR /app/server

RUN apt-get update && apt-get install -y curl --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copy backend package manifest files only, then install ALL deps (dev+prod) so the TypeScript build succeeds
COPY nyush_exchange_platform_server/package.json nyush_exchange_platform_server/package-lock.json ./
# Use npm ci to install exactly what's in package-lock.json
RUN npm ci

# Copy backend source
COPY nyush_exchange_platform_server/ ./

# Build backend (TypeScript)
RUN npm run build

# ---------- Stage 3: Final runtime image (only production deps + build artifacts) ----------
FROM node:20-slim AS runtime

WORKDIR /app

# Install runtime utilities (if needed)
RUN apt-get update && apt-get install -y curl --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copy production node_modules from the builder stage by installing production deps only
# We copy package files first to allow layer caching (optional)
COPY nyush_exchange_platform_server/package.json nyush_exchange_platform_server/package-lock.json ./server/
WORKDIR /app/server
# Install only production deps to keep the runtime image small
RUN npm ci --only=production

# Copy backend built output (dist), source if needed (for things like migrations), and other runtime files
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/.env ./   
# If you need other runtime artifacts, copy them too (static files, uploads path, etc.)

# Copy built frontend from frontend stage into a folder the server serves
WORKDIR /app
COPY --from=frontend /app/frontend/build ./nyush_exchange_platform_frontend/build

# Expose port and set NODE_ENV
WORKDIR /app/server
ENV NODE_ENV=production
EXPOSE 3889

# Start the server
CMD ["node", "dist/app.js"]
