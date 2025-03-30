import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto } from './dto/ProjectDto';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(projectData: CreateProjectDto) {
    try {
      const project = await this.prisma.project.create({
        data: {
          slug: projectData.name.toLowerCase().replace(/\s+/g, '-'),
          name: projectData.name,
          description: projectData.description,
          image: projectData.image,
          status: projectData.status,
          startDate: projectData.startDate,
          endDate: projectData.endDate,
          userId: projectData.userId,
        },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

}
