# Portfolio CMS - Types & Server Actions

Este documento detalha a estrutura de types TypeScript e server actions criados baseados no schema.prisma para o frontend Next.js.

## 📁 Estrutura de Arquivos

```
apps/web/src/
├── types/                          # Types principais do frontend
│   ├── index.ts                     # Export central de todos os types
│   ├── common.ts                    # Types comuns e utilitários
│   ├── user.ts                      # Types relacionados a usuários
│   ├── project.ts                   # Types relacionados a projetos
│   ├── blog.ts                      # Types relacionados ao blog
│   └── review.ts                    # Types relacionados a reviews
│
└── server/
    ├── types/                       # Types específicos do servidor
    │   ├── user.ts                  # Types de usuário para server actions
    │   ├── projects.ts              # Types de projeto para server actions
    │   ├── blog.ts                  # Types de blog para server actions
    │   └── review.ts                # Types de review para server actions
    │
    └── actions/                     # Server Actions com dados mockados
        ├── users.ts                 # Actions para usuários, especialidades e tecnologias
        ├── projects.ts              # Actions para projetos, tipos e reviews
        ├── blog.ts                  # Actions para posts, tags, comentários e likes
        └── reviews.ts               # Actions para reviews e estatísticas
```

## 🏗️ Types Principais

### Common Types (`types/common.ts`)

```typescript
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

interface NamedSlugEntity extends BaseEntity {
  name: string;
  slug: string;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### User Types (`types/user.ts`)

```typescript
interface User extends BaseEntity {
  username: string;
  name: string;
  email: string;
  password: string;
  worksAt: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  bio: string;
  about?: string;
  image?: string;
  slug: string;
  isAdmin: boolean;
  especialities?: Especiality[];
  technologies?: Technology[];
}

interface UserPublic extends Omit<User, "password" | "email"> {
  especialities: Especiality[];
  technologies: Technology[];
}

interface Especiality extends NamedSlugEntity {
  icon?: string;
}

interface Technology extends NamedSlugEntity {}
```

### Project Types (`types/project.ts`)

```typescript
interface Project extends BaseEntity {
  name: string;
  description: string;
  image?: string;
  slug: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  userId: string;
  user: User;
  technologies: Technology[];
  types: ProjectType[];
  reviews: Review[];
}

interface ProjectType extends NamedSlugEntity {}

enum ProjectStatus {
  PLANNING = "planning",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  ON_HOLD = "on_hold",
  CANCELLED = "cancelled",
}
```

### Blog Types (`types/blog.ts`)

```typescript
interface Post extends BaseEntity {
  title: string;
  content: string;
  image?: string;
  slug: string;
  category: string;
  published: boolean;
  publishedAt?: Date;
  username: string;
  user: User;
  tags: Tag[];
  comments: Comment[];
  likes: Like[];
}

interface Tag extends NamedSlugEntity {
  icon?: string;
}

interface Comment extends BaseEntity {
  control: string;
  content: string;
  postId: string;
  userId: string;
  post: Post;
  user: User;
}

interface Like extends BaseEntity {
  control: string;
  postId: string;
  userId: string;
  post: Post;
  user: User;
}
```

### Review Types (`types/review.ts`)

```typescript
interface Review extends BaseEntity {
  projectId?: string;
  userId: string;
  rating: number;
  comment: string;
  user: User;
  project?: Project;
}
```

## 🚀 Server Actions

### User Actions (`server/actions/users.ts`)

#### Dados Mockados

- **3 usuários** com perfis completos
- **5 especialidades** (Frontend, Backend, Mobile, DevOps, UI/UX)
- **10 tecnologias** (React, Next.js, TypeScript, Node.js, etc.)

#### Functions

```typescript
getUsers(): Promise<UserPublic[]>
getUserByUsername(username: string): Promise<UserPublic | null>
getUserProfile(username: string): Promise<UserProfile | null>
getEspecialities(): Promise<Especiality[]>
getTechnologies(): Promise<Technology[]>
```

### Project Actions (`server/actions/projects.ts`)

#### Dados Mockados

- **4 projetos** com diferentes status e tecnologias
- **5 tipos de projeto** (Web App, Mobile App, API, Desktop, DevOps)
- **4 reviews** associadas aos projetos

#### Functions

```typescript
getProjects(filters?: ProjectFilters): Promise<Project[]>
getProjectBySlug(slug: string): Promise<Project | null>
getProjectsWithStats(): Promise<ProjectWithStats[]>
getProjectTypes(): Promise<ProjectType[]>
getFeaturedProjects(): Promise<Project[]>
```

### Blog Actions (`server/actions/blog.ts`)

#### Dados Mockados

- **4 posts** com conteúdo rico em Markdown
- **7 tags** temáticas
- **3 comentários** de usuários
- **4 likes** distribuídos nos posts

#### Functions

```typescript
getPosts(filters?: PostFilters): Promise<Post[]>
getPostBySlug(slug: string): Promise<Post | null>
getPostsWithStats(): Promise<PostWithStats[]>
getPublishedPosts(): Promise<Post[]>
getFeaturedPosts(): Promise<Post[]>
getTags(): Promise<Tag[]>
getPostComments(postId: string): Promise<Comment[]>
createComment(data: CreateCommentDto & { userId: string }): Promise<Comment | null>
toggleLike(postId: string, userId: string): Promise<boolean>
```

### Review Actions (`server/actions/reviews.ts`)

#### Dados Mockados

- **6 reviews** (4 específicas de projetos + 2 gerais do portfólio)
- Ratings de 4 e 5 estrelas
- Comentários detalhados

#### Functions

```typescript
getReviews(filters?: ReviewFilters): Promise<Review[]>
getReviewById(id: string): Promise<Review | null>
getProjectReviews(projectId: string): Promise<Review[]>
getGeneralReviews(): Promise<Review[]>
getReviewsWithDetails(): Promise<ReviewWithDetails[]>
createReview(data: CreateReviewDto & { userId: string }): Promise<Review | null>
getAverageRating(projectId?: string): Promise<number>
getReviewStats(): Promise<ReviewStats>
```

## 📊 Dados Mockados - Visão Geral

### Usuários

1. **Rafael Dantas** (Admin)

   - Especialidades: Frontend, Backend, DevOps
   - Tecnologias: React, Next.js, TypeScript, Node.js, NestJS, Prisma, PostgreSQL, Tailwind
   - Projetos: 3 projetos

2. **Ana Silva**

   - Especialidades: Frontend, UI/UX
   - Tecnologias: React, Next.js, TypeScript, Tailwind
   - Projetos: 1 projeto

3. **Carlos Santos**
   - Especialidades: Mobile
   - Tecnologias: React, TypeScript, Node.js

### Projetos

1. **Portfolio CMS Platform** (Completo) - Aplicação web com Next.js e NestJS
2. **E-Commerce Mobile App** (Em progresso) - App React Native
3. **Task Management API** (Completo) - API REST com NestJS
4. **Design System Components** (Planejamento) - Biblioteca de componentes

### Posts do Blog

1. **Building Modern Web Applications with Next.js 15** - Tutorial completo
2. **Optimizing React Performance: Tips and Tricks** - Dicas de performance
3. **Docker Best Practices for Node.js Applications** - Guia DevOps
4. **Getting Started with TypeScript in 2024** - Rascunho

## 🎯 Como Usar

### 1. Importar Types

```typescript
import { User, Project, Post, Review } from "@/types";
```

### 2. Usar Server Actions

```typescript
import { getUsers, getProjects } from "@/server/actions/users";
import { getPosts } from "@/server/actions/blog";

// Em Server Components
const users = await getUsers();
const projects = await getProjects({ status: "completed" });
const posts = await getPosts({ published: true });
```

### 3. Exemplo de Página

```typescript
export default async function PortfolioPage() {
  const featuredProjects = await getFeaturedProjects();
  const latestPosts = await getFeaturedPosts();

  return (
    <div>
      {/* Renderizar projetos e posts */}
    </div>
  );
}
```

## 🔧 Funcionalidades Implementadas

### ✅ Filtros e Busca

- Filtros por status, categoria, usuário, tags
- Busca textual em posts
- Paginação pronta para implementar

### ✅ Relacionamentos

- Usuários com especialidades e tecnologias
- Projetos com tecnologias, tipos e reviews
- Posts com tags, comentários e likes
- Reviews específicas de projetos ou gerais

### ✅ Estatísticas

- Contadores (projetos, posts, reviews por usuário)
- Médias de rating
- Distribuição de ratings
- Tempo de leitura estimado para posts

### ✅ CRUD Operations

- Create: `createComment`, `createReview`
- Read: Todas as funções get\*
- Update: DTOs preparados para implementar
- Delete: Estrutura pronta para implementar

## 🚀 Próximos Passos

1. **Integração com API Real**: Substituir dados mockados por chamadas reais para a API NestJS
2. **Implementar Upload de Imagens**: Sistema completo de upload e gerenciamento de mídia
3. **Adicionar Validação**: Usar Zod para validação de dados em formulários
4. **Cache Strategy**: Implementar cache com React Query/TanStack Query
5. **Real-time Features**: WebSockets para comentários e likes em tempo real

## 📝 Exemplo de Uso Completo

Veja o arquivo `/app/types-example/page.tsx` para um exemplo completo demonstrando todos os types e server actions em uma página funcional.

---

Esta estrutura fornece uma base sólida e type-safe para todo o frontend da aplicação Portfolio CMS, mantendo consistência com o schema do banco de dados e preparando o caminho para integrações futuras.
