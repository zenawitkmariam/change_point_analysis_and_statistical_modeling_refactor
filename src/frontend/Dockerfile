# Build stage
FROM node:18-alpine AS build
WORKDIR /app

# Install deps (build context should be project root when building)
COPY src/frontend/package.json ./package.json
COPY src/frontend/package-lock.json* ./package-lock.json*
RUN npm ci --silent

# Copy frontend source and build
COPY src/frontend/ ./
RUN npm run build

# Production stage - serve with nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
