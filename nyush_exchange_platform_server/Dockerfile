# Use a lightweight Node.js base image
FROM node:20-slim

WORKDIR /app

# Copy frontend files from one level up (outside the Dockerfile directory)
COPY ../nyush_exchange_platform_frontend/package.json ./nyush_exchange_platform_frontend/package.json
COPY ../nyush_exchange_platform_frontend/package-lock.json ./nyush_exchange_platform_frontend/package-lock.json

# Install frontend dependencies
RUN npm install --prefix ./frontend

# Copy all frontend files
COPY ../nyush_exchange_platform_frontend ./nyush_exchange_platform_frontend/

# Build the frontend
RUN npm run build --prefix ./nyush_exchange_platform_frontend

# Stage 2: Setup backend with built frontend
FROM node:20-slim


# Set working directory
WORKDIR /app


# Copy package files and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure permissions for all binaries in node_modules/.bin
RUN chmod -R +x node_modules/.bin/

# Install TypeScript globally (this ensures the tsc command is available)
RUN npm install -g typescript

# Copy the rest of the application code
COPY . .

# Build the application (for TypeScript projects)
RUN npm run build

# Expose the application port (e.g., 3000)
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/app.js"]
