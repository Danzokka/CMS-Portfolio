import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/ProjectDto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(@Body() projectDto: CreateProjectDto) {
    try {
      return this.projectService.createProject(projectDto);
    } catch (error) {
      throw error;
    }
  }

  @Put(':slug')
  async updateProject(@Body() projectDto: CreateProjectDto, @Param('slug') slug: string) {
    try {
      return this.projectService.updateProject(projectDto, slug);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAllProjects() {
    try {
      return this.projectService.getAllProjects();
    } catch (error) {
      throw error;
    }
  }
  
  @Get(':slug')
  async getProjectBySlug(@Param('slug') slug: string) {
    try {
      return this.projectService.getProjectBySlug(slug);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':slug')
  async deleteProject(@Param('slug') slug: string) {
    try {
      return this.projectService.deleteProject(slug);
    } catch (error) {
      throw error;
    }
  }
}
