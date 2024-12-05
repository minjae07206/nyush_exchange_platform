# Stage 1: Build frontend
FROM node:20-slim AS frontend

WORKDIR /app

# Copy frontend files and install dependencies
COPY nyush_exchange_platform_frontend/package.json ./nyush_exchange_platform_frontend/package.json
COPY nyush_exchange_platform_frontend/package-lock.json ./nyush_exchange_platform_frontend/package-lock.json
RUN npm install --prefix ./nyush_exchange_platform_frontend
ENV REACT_APP_HOST_NAME=http://10.214.14.9:3389/
# Copy the rest of the frontend files and build it
COPY nyush_exchange_platform_frontend ./nyush_exchange_platform_frontend/

RUN npm run build --prefix ./nyush_exchange_platform_frontend

# Stage 2: Setup backend with built frontend
FROM node:20-slim AS backend

WORKDIR /app

RUN apt-get update && apt-get install -y curl  # For Debian/Ubuntu-based images

# Copy backend package files and install dependencies
COPY nyush_exchange_platform_server/package*.json ./
RUN npm install

# Ensure permissions for all binaries in node_modules/.bin
RUN chmod -R +x node_modules/.bin/

# Install TypeScript globally
RUN npm install -g typescript

# Copy the rest of the backend application code
COPY nyush_exchange_platform_server ./nyush_exchange_platform_server/

# Copy the built frontend from the frontend stage
COPY --from=frontend /app/nyush_exchange_platform_frontend/build ./nyush_exchange_platform_frontend/build

# Build the backend application (for TypeScript projects)
RUN npm run build --prefix ./nyush_exchange_platform_server

# Expose the application port
EXPOSE 3889

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD ["node", "nyush_exchange_platform_server/dist/app.js"]
