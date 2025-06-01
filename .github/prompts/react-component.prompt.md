---
mode: "agent"
tools: ["codebase"]
description: "Generate React components following project standards"
---

# React Component Generator

Generate new React components following the project's established patterns and standards.

## Requirements

Ask for component details if not provided:

- Component name
- Component type (Server/Client)
- Props interface
- Styling approach

## Standards to Follow

- Use TypeScript interfaces for props
- Follow naming conventions (PascalCase for components)
- Use functional components
- Implement proper error boundaries
- Use Tailwind CSS for styling
- Follow mobile-first responsive design

## Component Template Structure

```tsx
interface ComponentNameProps {
  // Define props with proper types
}

export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  // Component logic

  return <div className="responsive-classes">{/* Component JSX */}</div>;
}
```

## For Client Components

- Add 'use client' directive when needed
- Use React hooks appropriately
- Implement proper error handling
- Add React.memo for performance when needed

## For Server Components

- Keep as Server Components by default
- Use async/await for data fetching
- Implement proper loading states
- Use Suspense boundaries

## Styling Guidelines

- Use Tailwind CSS classes
- Implement responsive design (mobile-first)
- Use consistent spacing and typography
- Follow the project's design system

## File Structure

- Create component file in appropriate directory
- Use lowercase-with-hyphens for directories
- Export as named export
- Include proper imports for dependencies
