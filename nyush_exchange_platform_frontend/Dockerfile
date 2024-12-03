# Stage 1: Build the React app using Node.js
FROM node:20-slim AS build

# Set the working directory
WORKDIR /app


# Copy package.json and package-lock.json (or yarn.lock) first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the React app files
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Use Nginx to serve the built files
FROM nginx:alpine

# Copy the built React app from the previous build stage into the Nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 80

# Start Nginx in the foreground (to keep the container running)
CMD ["nginx", "-g", "daemon off;"]
