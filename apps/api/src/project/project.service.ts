import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/ProjectDto';

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
          technologies: {
            connectOrCreate: projectData.technologies.map((technology) => ({
              where: { slug: technology.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: technology,
                slug: technology.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
          types: {
            connectOrCreate: projectData.types.map((type) => ({
              where: { slug: type.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: type,
                slug: type.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
        },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  async getAllProjects() {
    try {
      const projects = await this.prisma.project.findMany({
        include: {
          technologies: true,
          types: true,
        },
      });
      return projects;
    } catch (error) {
      throw error;
    }
  }

  async getProjectBySlug(slug: string) {
    try {
      const project = await this.prisma.project.findUnique({
        where: { slug },
        include: {
          technologies: true,
          types: true,
        },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  async updateProject(projectData: UpdateProjectDto, slug: string) {
    try {
      const project = await this.prisma.project.update({
        where: { slug },
        data: {
          slug: projectData.name.toLowerCase().replace(/\s+/g, '-'),
          name: projectData.name,
          description: projectData.description,
          image: projectData.image,
          status: projectData.status,
          startDate: projectData.startDate,
          endDate: projectData.endDate,
          technologies: {
            connectOrCreate: projectData.technologies.map((technology) => ({
              where: { slug: technology.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: technology,
                slug: technology.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
          types: {
            connectOrCreate: projectData.types.map((type) => ({
              where: { slug: type.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: type,
                slug: type.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
        },
        include: {
          technologies: true,
          types: true,
        },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(slug: string) {
    try {
      const project = await this.prisma.project.delete({
        where: { slug },
      });
      return project;
    } catch (error) {
      throw error;
    }
  }
}
