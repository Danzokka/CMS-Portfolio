#!/bin/bash

# Development Docker Compose Helper Script

set -e

case "$1" in
  "up")
    echo "🚀 Starting development environment..."
    docker-compose -f docker-compose.dev.yml up -d
    echo "✅ Development environment started!"
    echo "📱 Frontend: http://localhost:3000"
    echo "🔗 API: http://localhost:5000"
    echo "🗄️ Database: localhost:5432"
    ;;
  "down")
    echo "🛑 Stopping development environment..."
    docker-compose -f docker-compose.dev.yml down
    echo "✅ Development environment stopped!"
    ;;
  "logs")
    if [ -z "$2" ]; then
      docker-compose -f docker-compose.dev.yml logs -f
    else
      docker-compose -f docker-compose.dev.yml logs -f "$2"
    fi
    ;;
  "restart")
    echo "🔄 Restarting development environment..."
    docker-compose -f docker-compose.dev.yml restart
    echo "✅ Development environment restarted!"
    ;;
  "build")
    echo "🔨 Building development images..."
    docker-compose -f docker-compose.dev.yml build --no-cache
    echo "✅ Development images built!"
    ;;
  "prisma")
    case "$2" in
      "generate")
        docker-compose -f docker-compose.dev.yml exec api npx prisma generate
        ;;
      "migrate")
        docker-compose -f docker-compose.dev.yml exec api npx prisma migrate dev
        ;;
      "seed")
        docker-compose -f docker-compose.dev.yml exec api npx prisma db seed
        ;;
      "studio")
        docker-compose -f docker-compose.dev.yml exec api npx prisma studio
        ;;
      *)
        echo "Usage: $0 prisma [generate|migrate|seed|studio]"
        exit 1
        ;;
    esac
    ;;
  "shell")
    if [ -z "$2" ]; then
      echo "Usage: $0 shell [api|web|postgres]"
      exit 1
    fi
    docker-compose -f docker-compose.dev.yml exec "$2" sh
    ;;
  "clean")
    echo "🧹 Cleaning up development environment..."
    docker-compose -f docker-compose.dev.yml down -v
    docker system prune -f
    echo "✅ Development environment cleaned!"
    ;;
  *)
    echo "Portfolio CMS Development Helper"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  up        Start development environment"
    echo "  down      Stop development environment"
    echo "  logs      View logs (optional: specify service)"
    echo "  restart   Restart all services"
    echo "  build     Rebuild all images"
    echo "  prisma    Prisma commands [generate|migrate|seed|studio]"
    echo "  shell     Access service shell [api|web|postgres]"
    echo "  clean     Stop and remove all containers, volumes"
    echo ""
    echo "Examples:"
    echo "  $0 up"
    echo "  $0 logs api"
    echo "  $0 prisma migrate"
    echo "  $0 shell api"
    exit 1
    ;;
esac
