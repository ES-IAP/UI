# Stage 1: Build the React app
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Set the working directory for nginx configuration
WORKDIR /etc/nginx

# Copy the build output from the previous stage
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Copy custom nginx config file to enable HTTPS
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for HTTPS
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]