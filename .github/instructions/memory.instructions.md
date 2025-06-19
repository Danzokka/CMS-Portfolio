---
applyTo: "**"
---

# GitHub Copilot Memory Instructions - Portfolio CMS Platform

Your documentation is on [memory_mcp](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)

## System Overview

This is a modern Portfolio CMS platform built with NestJS and Next.js, designed for personal portfolio management with integrated blogging, project showcase, and review system. The system uses a monorepo architecture with Docker containerization.

Follow these steps for each prompt called:

## 1. Memory Initialization

If this is the first interaction, initialize your memory with these core entities:

### Core System Entities

- **Portfolio_CMS_System**: Main portfolio management platform
- **User_Developer**: The developer working on this system
- **Conversation_Context**: Current session context
- **Knowledge_Graph**: Technical knowledge repository

### Portfolio Domain Entities

- **User_Entity**: Portfolio users with rich profiles, specialties, and social links
- **Project_Entity**: Portfolio projects with technologies, types, status, and timelines
- **Post_Entity**: Blog posts with content, tags, comments, and likes
- **Review_Entity**: Reviews for projects or general portfolio feedback

### Technical Architecture Entities

- **Monorepo_Structure**: Turborepo with apps/web (Next.js) and apps/api (NestJS)
- **Docker_Infrastructure**: Containerized development and production environments
- **Database_Layer**: Prisma ORM with PostgreSQL and rich relational models
- **Authentication_System**: JWT + NextAuth integration with role-based access

### Content Management Entities

- **Blog_System**: Full-featured blogging with tags, comments, and likes
- **Media_Management**: File upload system for project images and assets
- **Admin_System**: Administrative controls with role-based permissions

## 2. Memory Retrieval

- Always begin by saying "Remembering..." and retrieve relevant system context
- Reference your technical knowledge as "memory" about the portfolio CMS architecture
- Prioritize recent system changes and ongoing development patterns

## 3. Technical Memory Categories

Monitor and store information about:

### a) System Architecture

- Turborepo monorepo structure with apps/web and apps/api
- Next.js 15+ App Router patterns with Server Components
- NestJS modular architecture with domain-driven design with event emitters and observers
- Prisma ORM for database interactions with PostgreSQL
- NextAuth for authentication with JWT and role-based access control
- Docker containerization for development and production environments

### b) Data Models & Relationships

- Core entities: User, Project, Post, Review, Technology, Tag, Comment, Like
- Rich user profiles with specialties, technologies, and social links
- Project management with technologies, types, status tracking, and timelines
- Blog system with tagging, commenting, and liking functionality

### c) API Patterns

- RESTful endpoints with NestJS controllers and services
- JWT authentication with AuthGuard and AdminGuard
- Request/response patterns with DTOs and validation
- File upload system for project images and media

### d) Development Patterns

- Service-Controller-Module organization in NestJS
- Server actions and API routes in Next.js
- Prisma ORM patterns with relations and transactions
- Component composition with Shadcn UI and Tailwind CSS

### e) Business Logic

- Role-based access control (regular users vs admins)
- Project lifecycle management with status tracking
- Content publishing workflow for posts (draft → published)
- Review system supporting both project-specific and general portfolio reviews

## 4. Memory Update Strategy

When new information is encountered:

### a) Technical Entities

- Create entities for new modules, services, or components
- Document new API endpoints and their purposes
- Record new integration patterns or external services
- Store performance optimization techniques

### b) Business Rules

- Document project categorization and technology tagging
- Record user profile management and authentication flows
- Store content publishing and moderation workflows
- Track review and feedback management patterns

### c) System Relationships

- Connect new components to existing architecture
- Map data flow between frontend and backend services
- Document dependency relationships between modules
- Record configuration dependencies and environment variables

### d) Development Context

- Store recent code changes and their motivations
- Record debugging sessions and solutions found
- Document refactoring decisions and architectural evolution
- Track testing strategies and coverage improvements

## 5. Contextual Observations

Always maintain observations about:

### System State

- Current development focus areas
- Recent bug fixes and their root causes
- Performance optimization opportunities
- UI/UX improvements and user feedback

### Code Quality

- Consistent error handling patterns across modules
- Proper validation strategies for forms and APIs
- Authentication and authorization implementation
- Testing coverage and quality patterns

### Business Requirements

- Portfolio presentation and showcase needs
- Content management and publishing workflows
- User engagement features (comments, likes, reviews)
- Admin dashboard and moderation capabilities

## 6. Relationship Patterns

Maintain these key relationships in memory:

- **User** `has_profile` **UserProfile** (with specialties, technologies, social links)
- **User** `creates` **Project** (portfolio project ownership)
- **User** `writes` **Post** (blog content authorship)
- **User** `submits` **Review** (feedback on projects or portfolio)
- **Project** `uses` **Technology** (many-to-many project technologies)
- **Project** `belongs_to` **ProjectType** (categorization of projects)
- **Project** `has` **Review** (project-specific feedback)
- **Post** `tagged_with` **Tag** (content categorization)
- **Post** `receives` **Comment** (user engagement)
- **Post** `receives` **Like** (user appreciation)
- **User** `specializes_in` **Especiality** (areas of expertise)
- **User** `knows` **Technology** (skill associations)
- **System** `supports` **AdminAccess** (role-based permissions)
- **Database** `stores` **MediaFiles** (project images and assets)

This memory framework ensures comprehensive understanding of the portfolio CMS platform's technical architecture, business logic, and development patterns, enabling more effective code assistance and architectural guidance.
