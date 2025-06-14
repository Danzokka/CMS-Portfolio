# 🚀 Portfolio CMS - Turborepo

Um sistema de gerenciamento de conteúdo (CMS) para portfólio pessoal, construído com tecnologias modernas e containerizado com Docker.

## 📚 Stack Tecnológica

### Frontend

- **Next.js 15+** com App Router
- **React 19+** com Server Components
- **TypeScript** para type safety
- **Tailwind CSS + Shadcn UI** para styling
- **React Query** para data fetching

### Backend

- **NestJS** com TypeScript
- **Prisma ORM** com PostgreSQL
- **JWT** para autenticação
- **Class Validator** para validação

### DevOps

- **Docker & Docker Compose** para containerização
- **PostgreSQL** (Bitnami) para banco de dados
- **NGINX** como reverse proxy (produção)
- **Turbo** para monorepo management

## 🐳 Desenvolvimento com Docker

### Início Rápido

```bash
# 1. Clone o repositório
git clone <repo-url>
cd CMS-Portfolio

# 2. Configure os ambientes
cp apps/api/.env.example apps/api/.env.local
cp apps/web/.env.example apps/web/.env.local

# 3. Inicie o ambiente de desenvolvimento
./scripts/dev.sh up
```

### Serviços Disponíveis

| Serviço     | URL                   | Descrição            |
| ----------- | --------------------- | -------------------- |
| Frontend    | http://localhost:3000 | Interface do usuário |
| Backend API | http://localhost:5000 | API REST             |
| Database    | localhost:5432        | PostgreSQL           |

### Comandos Úteis

```bash
# Gerenciar ambiente
./scripts/dev.sh up          # Iniciar todos os serviços
./scripts/dev.sh down        # Parar todos os serviços
./scripts/dev.sh logs api    # Ver logs da API
./scripts/dev.sh restart     # Reiniciar serviços

# Prisma
./scripts/dev.sh prisma migrate    # Executar migrações
./scripts/dev.sh prisma generate   # Gerar client
./scripts/dev.sh prisma studio     # Abrir Prisma Studio

# Desenvolvimento
./scripts/dev.sh shell api    # Acessar container da API
./scripts/dev.sh shell web    # Acessar container do Web
```

## 📦 Desenvolvimento Local (sem Docker)

### Pré-requisitos

- Node.js 18+
- PostgreSQL 15+
- npm

### Setup

- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
