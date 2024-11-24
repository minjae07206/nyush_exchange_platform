# Use a lightweight Node.js base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production  # In production mode, only install dependencies

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
