---
mode: "agent"
tools: ["codebase"]
description: "Generate Docker configuration for the Turbo repo project"
---

# Docker Configuration Generator

Generate complete Docker setup for the Turbo repo with Next.js frontend, NestJS backend, and observability stack.

## Project Structure Requirements

```
docker/
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── .env.example
├── web/
│   └── Dockerfile
├── api/
│   └── Dockerfile
└── monitoring/
    ├── grafana/
    │   ├── provisioning/
    │   └── dashboards/
    ├── prometheus/
    │   └── prometheus.yml
    └── loki/
        └── loki.yml
```

## Requirements

- Multi-stage builds for optimization
- Health checks for all services
- Non-root users for security
- Proper networking and volumes
- Development and production variants
- Observability stack (Grafana, Prometheus, Loki)

## Frontend Dockerfile Template (Next.js)

```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS runtime
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
```

## Backend Dockerfile Template (NestJS)

```dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine AS runtime
RUN addgroup -g 1001 -S nestjs
RUN adduser -S nestjs -u 1001

COPY --from=build --chown=nestjs:nestjs /app/dist ./dist
COPY --from=base --chown=nestjs:nestjs /app/node_modules ./node_modules
COPY --from=build --chown=nestjs:nestjs /app/prisma ./prisma

USER nestjs
EXPOSE 5000
ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "dist/main.js"]
```

## Docker Compose Requirements

- Separate networks for app, database, and monitoring
- Volume persistence for database and monitoring data
- Environment variable management
- Service dependencies with health checks
- Development overrides for hot reloading

## Observability Stack

- Grafana for dashboards and alerting
- Prometheus for metrics collection
- Loki for log aggregation
- Proper service discovery configuration
- Dashboard provisioning as code

## Environment Variables

Generate proper .env.example with all required variables:

- Database connection strings
- JWT secrets
- API keys
- Monitoring credentials
- Service ports and hosts
