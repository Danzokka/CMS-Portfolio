---
applyTo: "apps/web/**/*.{ts,tsx,js,jsx}"
---

# Frontend Development Guidelines - Next.js + React

## Tech Stack

- Next.js 15+ com App Router (NUNCA use pages router)
- React 19+ com Server Components
- TypeScript com interfaces (não types)
- Tailwind CSS + Shadcn UI + Radix UI
- React Query (TanStack Query) para data fetching no client side

## Estrutura e Padrões

### Componentes

- Use functional components com TypeScript interfaces
- Prefira React Server Components quando possível
- Use 'use client' apenas quando necessário (interações, hooks, browser APIs)
- Implemente componentes responsivos mobile-first
- Use React.memo para evitar re-renders desnecessários

### Data Fetching

- Qualquer requisição de dados deve ser feita com server actions
- Use server actions para buscar dados, NÃO use API routes
- Implemente axios para a minha api interna do NestJS
- Use fetch cacheando caso não seja uma api do NestJS
- Implemente React Query para cache e sincronização no client side
- Use Suspense boundaries com fallbacks apropriados
- Prefira uncontrolled components com react-hook-form

### Styling

- Use Tailwind CSS com abordagem mobile-first
- Implemente design system com Shadcn UI
- Use cn() utility para concatenar classes condicionalmente

### Performance

- Minimize bundle size com dynamic imports
- Use Next.js Image component para otimização
- Implemente loading states e skeleton screens
- Use `useMemo`, `useCallback` para otimizações

### Formulários

- Use react-hook-form com uncontrolled components
- Implemente validação com Zod schemas
- Use defaultValues para evitar re-renders
- Integre com TypeScript para type safety
