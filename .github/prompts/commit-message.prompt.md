---
mode: "agent"
description: "Generate conventional commit messages"
---

# Conventional Commit Message Generator

Generate commit messages following the Conventional Commits specification for this project.

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Types

- **feat**: new feature for the user
- **fix**: bug fix for the user
- **docs**: changes to documentation
- **style**: formatting, missing semicolons, etc
- **refactor**: refactoring production code
- **test**: adding missing tests, refactoring tests
- **chore**: updating build tasks, package manager configs

## Scopes (when applicable)

- **api**: backend changes
- **web**: frontend changes
- **docker**: containerization changes
- **ci**: CI/CD changes
- **deps**: dependency updates

## Examples

- `feat(api): add user authentication endpoint`
- `fix(web): resolve responsive layout issues on mobile`
- `docs: update API documentation`
- `refactor(api): optimize database queries`
- `chore(deps): update Next.js to v14`

## Requirements

- Use imperative mood in the description
- Keep first line under 72 characters
- Reference issue numbers when applicable
- Be specific about what changed and why
