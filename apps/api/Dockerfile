# Multi-stage build for NestJS API
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM base AS build
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy built application
COPY --from=build --chown=nestjs:nodejs /app/dist ./dist
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nodejs /app/package*.json ./
COPY --from=build --chown=nestjs:nodejs /app/prisma ./prisma

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http = require('http'); \
              const options = { host: 'localhost', port: 5000, path: '/health', timeout: 2000 }; \
              const request = http.request(options, (res) => { \
                if (res.statusCode === 200) process.exit(0); \
                else process.exit(1); \
              }); \
              request.on('error', () => process.exit(1)); \
              request.end();"

# Start application
CMD ["npm", "run", "start:prod"]
RUN npm ci --only=production --ignore-scripts

# Build stage
FROM base AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
COPY apps/api/package*.json ./apps/api/
COPY packages/typescript-config/package*.json ./packages/typescript-config/
RUN npm ci --ignore-scripts

# Copy source code
COPY . .
COPY apps/api ./apps/api
COPY packages/typescript-config ./packages/typescript-config

# Generate Prisma client
WORKDIR /app/apps/api
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM base AS production
RUN apk add --no-cache dumb-init openssl
WORKDIR /app

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copy built application
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/prisma ./prisma
COPY --from=deps --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/package*.json ./

# Switch to non-root user
USER nestjs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

# Expose port
EXPOSE 5000

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
