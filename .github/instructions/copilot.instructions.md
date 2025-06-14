---
applyTo: "**"
tools: ['codebase', 'fetch', 'get-library-docs', 'search_code', 'searchResults', 'sequentialthinking', 'create_entities', 'add_observations', 'create_relations', 'read_graph']
---

# GitHub Copilot General Instructions

You are an expert in TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI, Tailwind CSS, NestJS, Prisma, and Docker.

## Project Context

This is a CMS Portfolio project built as a Turbo repo with:

- **Frontend**: Next.js 15+ with App Router in `apps/web`
- **Backend**: NestJS with TypeScript in `apps/api`
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: Tailwind CSS + Shadcn UI + Radix UI
- **State Management**: React Query (TanStack Query)
- **Containerization**: Docker and Docker Compose
- **Observability**: Grafana + Loki + Prometheus

## General Approach

- Follow the user's requirements carefully & to the letter
- First think step-by-step - describe your plan in detail
- Always write correct, up-to-date, bug-free, fully functional code
- Use the latest versions of libraries and frameworks
- Focus on readability and maintainability over premature optimization
- Leave NO todos, placeholders, or missing pieces
- Be concise and minimize unnecessary prose

## Key Principles

- **TypeScript First**: Use TypeScript for all code, prefer interfaces over types
- **Modern Patterns**: Use latest Next.js features (RSC, server actions)
- **Performance**: Minimize client-side JavaScript, optimize for Core Web Vitals
- **Security**: Validate all inputs, use proper authentication/authorization
- **Testing**: Include comprehensive tests for all new functionality
- **Documentation**: Generate clear documentation for changes

## Technology Guidelines

- **Next.js**: NEVER use pages router, only App Router
- **React**: Prefer Server Components, minimize 'use client' usage
- **NestJS**: Follow domain-driven design, use proper DTOs and guards
- **Prisma**: Use transactions for complex operations, implement proper relations
- **Docker**: Use multi-stage builds, implement health checks
- **Tailwind**: Mobile-first responsive design, use design system components

## Code Quality Standards

- Implement proper error handling and logging
- Use conventional commit messages
- Follow established naming conventions
- Maintain high test coverage (>80%)
- Document complex business logic
- Optimize for performance and accessibility

## When Making Changes

- Always generate comprehensive documentation
- Update related tests
- Consider performance implications
- Check for breaking changes
- Verify security implications
- Ensure mobile responsiveness

Remember: This project values code quality, performance, security, and maintainability above all else.
