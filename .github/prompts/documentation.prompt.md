---
mode: "agent"
description: "Generate comprehensive documentation for changes made"
---

# Documentation Generator

Generate comprehensive documentation for all changes made to the codebase.

## Documentation Requirements

### Change Documentation Format

```markdown
# [Feature/Fix/Refactor]: [Brief Description]

## Overview

Brief explanation of what was changed and why.

## Changes Made

### Frontend (if applicable)

- [ ] Component: [ComponentName] - [Description]
- [ ] Page: [PageName] - [Description]
- [ ] Style: [Description]
- [ ] Logic: [Description]

### Backend (if applicable)

- [ ] Endpoint: [Method] [Route] - [Description]
- [ ] Service: [ServiceName] - [Description]
- [ ] Database: [Schema changes/migrations]
- [ ] Authentication: [Changes]

### Infrastructure (if applicable)

- [ ] Docker: [Container/compose changes]
- [ ] Environment: [New variables/configs]
- [ ] Monitoring: [Grafana/Prometheus changes]

## Technical Details

### Architecture Changes

Describe any architectural modifications or patterns introduced.

### Performance Impact

- Bundle size impact: [increase/decrease/neutral]
- Database performance: [queries optimized/added]
- Memory usage: [impact assessment]

### Breaking Changes

List any breaking changes and migration instructions.

### Dependencies

- Added: [list new dependencies]
- Updated: [list updated dependencies]
- Removed: [list removed dependencies]

## Testing

### Test Coverage

- Unit tests: [added/updated/removed]
- Integration tests: [added/updated/removed]
- E2E tests: [added/updated/removed]

### Manual Testing

- [ ] Feature works as expected
- [ ] Edge cases tested
- [ ] Error handling verified
- [ ] Responsive design confirmed (if UI)

## Deployment Notes

### Environment Variables

List any new environment variables needed.

### Database Migrations

List any database migrations that need to be run.

### Configuration Changes

List any configuration file changes needed.

## Future Considerations

- Technical debt introduced
- Potential optimizations
- Follow-up tasks needed

---

Generated on: [Date]
Author: [Name]
Related PRs: [PR links]
```

## Requirements

- Always document WHY changes were made, not just WHAT
- Include migration instructions for breaking changes
- Document environment variable changes
- List all new dependencies and their purpose
- Include performance impact assessment
- Document testing approach and coverage
