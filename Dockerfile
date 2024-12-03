# Stage 1: Build frontend
FROM node:20-slim as nyush_exchange_platform_frontend

WORKDIR /app

# Copy frontend files from the build context (now accessible)
COPY nyush_exchange_platform_frontend/package.json ./nyush_exchange_platform_frontend/package.json
COPY nyush_exchange_platform_frontend/package-lock.json ./nyush_exchange_platform_frontend/package-lock.json

# Install frontend dependencies
RUN npm install --prefix ./nyush_exchange_platform_frontend

# Copy all frontend files and build it
COPY nyush_exchange_platform_frontend ./nyush_exchange_platform_frontend/
RUN npm run build --prefix ./nyush_exchange_platform_frontend

# Stage 2: Setup backend with built frontend
FROM node:20-slim

WORKDIR /app

# Copy backend package files and install dependencies
COPY nyush_exchange_platform_server/package*.json ./

# Install backend dependencies
RUN npm install

# Ensure permissions for all binaries in node_modules/.bin
RUN chmod -R +x node_modules/.bin/

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the backend application code
COPY nyush_exchange_platform_server ./nyush_exchange_platform_server/

# Copy the built frontend from the frontend stage
COPY --from=nyush_exchange_platform_frontend /app/nyush_exchange_platform_frontend/build ./nyush_exchange_platform_frontend/build

# Build the backend application (for TypeScript projects)
RUN npm run build

# Expose the application port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/app.js"]
