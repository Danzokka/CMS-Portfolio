#!/bin/bash

# Production Docker Compose Helper Script

set -e

case "$1" in
  "up")
    echo "🚀 Starting production environment..."
    docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
    echo "✅ Production environment started!"
    ;;
  "down")
    echo "🛑 Stopping production environment..."
    docker-compose -f docker-compose.prod.yml down
    echo "✅ Production environment stopped!"
    ;;
  "logs")
    if [ -z "$2" ]; then
      docker-compose -f docker-compose.prod.yml logs -f
    else
      docker-compose -f docker-compose.prod.yml logs -f "$2"
    fi
    ;;
  "restart")
    echo "🔄 Restarting production environment..."
    docker-compose -f docker-compose.prod.yml restart
    echo "✅ Production environment restarted!"
    ;;
  "build")
    echo "🔨 Building production images..."
    docker-compose -f docker-compose.prod.yml build --no-cache
    echo "✅ Production images built!"
    ;;
  "deploy")
    echo "🚀 Deploying to production..."
    docker-compose -f docker-compose.prod.yml build
    docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
    echo "✅ Production deployment complete!"
    ;;
  "backup")
    echo "💾 Creating database backup..."
    docker-compose -f docker-compose.prod.yml exec postgres pg_dump -U $POSTGRES_USER $POSTGRES_DB > backup_$(date +%Y%m%d_%H%M%S).sql
    echo "✅ Database backup created!"
    ;;
  "restore")
    if [ -z "$2" ]; then
      echo "Usage: $0 restore [backup_file.sql]"
      exit 1
    fi
    echo "🔄 Restoring database from $2..."
    docker-compose -f docker-compose.prod.yml exec -T postgres psql -U $POSTGRES_USER $POSTGRES_DB < "$2"
    echo "✅ Database restored!"
    ;;
  "health")
    echo "🩺 Checking service health..."
    docker-compose -f docker-compose.prod.yml ps
    ;;
  "clean")
    echo "🧹 Cleaning up production environment..."
    docker-compose -f docker-compose.prod.yml down
    docker system prune -f
    echo "✅ Production environment cleaned!"
    ;;
  *)
    echo "Portfolio CMS Production Helper"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  up        Start production environment"
    echo "  down      Stop production environment"
    echo "  logs      View logs (optional: specify service)"
    echo "  restart   Restart all services"
    echo "  build     Rebuild all images"
    echo "  deploy    Build and deploy to production"
    echo "  backup    Create database backup"
    echo "  restore   Restore database from backup"
    echo "  health    Check service health status"
    echo "  clean     Stop and clean up"
    echo ""
    echo "Examples:"
    echo "  $0 deploy"
    echo "  $0 logs nginx"
    echo "  $0 backup"
    echo "  $0 restore backup_20230614_120000.sql"
    exit 1
    ;;
esac
