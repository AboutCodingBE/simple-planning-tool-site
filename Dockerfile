# =============================================================================
# Multi-stage Dockerfile for Angular Application
# =============================================================================
# This Dockerfile builds your Angular app and serves it with nginx
# Final image size: ~25-30MB (compared to ~1GB+ if you included Node.js)

# =============================================================================
# Stage 1: Build the Angular application
# =============================================================================
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
# Using --legacy-peer-deps if you have peer dependency issues
RUN npm ci --silent

# Copy source code
COPY . .

# Build Angular app for production
# This creates optimized files in dist/ directory
RUN npm run build --prod

# =============================================================================
# Stage 2: Serve the application with nginx
# =============================================================================
FROM nginx:alpine

# Copy built Angular app from build stage
COPY --from=build /app/dist/my-project-name/browser /usr/share/nginx/html
# Copy custom nginx configuration (optional, see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
