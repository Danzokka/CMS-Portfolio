---
mode: "agent"
tools: ["codebase"]
description: "Generate NestJS API endpoints following project standards"
---

# NestJS API Endpoint Generator

Generate complete NestJS API endpoints with controllers, services, DTOs, and tests following project patterns.

## Requirements

Ask for endpoint details if not provided:

- Resource name (singular)
- CRUD operations needed
- Validation requirements
- Authentication needs
- Relationships with other entities

## Standards to Follow

- Use proper decorators (@Controller, @Get, @Post, etc.)
- Implement DTOs with class-validator
- Use guards for authentication/authorization
- Follow RESTful conventions
- Implement proper error handling
- Use Prisma for database operations

## File Structure to Generate

```
src/[resource]/
├── [resource].controller.ts
├── [resource].service.ts
├── [resource].module.ts
├── dto/
│   ├── create-[resource].dto.ts
│   └── update-[resource].dto.ts
└── [resource].controller.spec.ts
```

## Controller Template

```typescript
@Controller("[resource]")
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createDto: CreateResourceDto, @User() user: UserEntity) {
    return this.resourceService.create(createDto, user.id);
  }

  @Get()
  async findAll(@Query() query: FindResourcesDto) {
    return this.resourceService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.resourceService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Put(":id")
  async update(@Param("id") id: string, @Body() updateDto: UpdateResourceDto) {
    return this.resourceService.update(id, updateDto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.resourceService.remove(id);
  }
}
```

## Service Template

```typescript
@Injectable()
export class ResourceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateResourceDto, userId: string) {
    try {
      return await this.prisma.resource.create({
        data: { ...createDto, userId },
        include: {
          /* relationships */
        },
      });
    } catch (error) {
      // Handle Prisma errors appropriately
      throw error;
    }
  }

  async findAll(query: FindResourcesDto) {
    return this.prisma.resource.findMany({
      where: {
        /* filters based on query */
      },
      include: {
        /* relationships */
      },
    });
  }
}
```

## DTO Requirements

- Use class-validator decorators
- Implement proper validation rules
- Use PartialType for update DTOs
- Include transformation when needed
- Document with proper JSDoc comments
