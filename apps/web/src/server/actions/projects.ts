"use server";

import {
  Project,
  ProjectType,
  ProjectWithStats,
  ProjectFilters,
  ProjectStatus,
} from "../types/projects";
import { Review } from "../types/review";
import { mockTechnologies, mockUsers } from "./users";

// Mock project types
export const mockProjectTypes: ProjectType[] = [
  {
    id: "type_1",
    name: "Web Application",
    slug: "web-application",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "type_2",
    name: "Mobile App",
    slug: "mobile-app",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "type_3",
    name: "API/Backend",
    slug: "api-backend",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "type_4",
    name: "Desktop Application",
    slug: "desktop-application",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "type_5",
    name: "DevOps/Infrastructure",
    slug: "devops-infrastructure",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
];

// Mock reviews
export const mockReviews: Review[] = [
  {
    id: "review_1",
    projectId: "project_1",
    userId: "user_2",
    rating: 5,
    comment:
      "Amazing project! The UI is beautiful and the performance is excellent.",
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-11-15"),
    user: {
      id: "user_2",
      name: "Ana Silva",
      username: "ana_silva",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=400",
    },
  },
  {
    id: "review_2",
    projectId: "project_1",
    userId: "user_3",
    rating: 4,
    comment: "Great work! Really impressed with the technical implementation.",
    createdAt: new Date("2024-11-10"),
    updatedAt: new Date("2024-11-10"),
    user: {
      id: "user_3",
      name: "Carlos Santos",
      username: "carlos_santos",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  },
  {
    id: "review_3",
    projectId: "project_2",
    userId: "user_2",
    rating: 5,
    comment: "This mobile app is incredibly smooth and well-designed.",
    createdAt: new Date("2024-10-20"),
    updatedAt: new Date("2024-10-20"),
    user: {
      id: "user_2",
      name: "Ana Silva",
      username: "ana_silva",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=400",
    },
  },
];

// Mock projects
export const mockProjects: Project[] = [
  {
    id: "project_1",
    name: "Portfolio CMS Platform",
    description:
      "A comprehensive portfolio management system built with Next.js and NestJS. Features include project showcase, blog functionality, user authentication, and an admin dashboard.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    slug: "portfolio-cms-platform",
    status: ProjectStatus.COMPLETED,
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-12-01"),
    userId: "user_1",
    user: mockUsers[0],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-12-01"),
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[1], // Next.js
      mockTechnologies[2], // TypeScript
      mockTechnologies[4], // NestJS
      mockTechnologies[5], // Prisma
      mockTechnologies[6], // PostgreSQL
      mockTechnologies[7], // Docker
    ],
    types: [mockProjectTypes[0]], // Web Application
    reviews: mockReviews.filter((r) => r.projectId === "project_1"),
  },
  {
    id: "project_2",
    name: "E-Commerce Mobile App",
    description:
      "React Native mobile application for online shopping with features like product catalog, shopping cart, payment integration, and order tracking.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
    slug: "ecommerce-mobile-app",
    status: ProjectStatus.IN_PROGRESS,
    startDate: new Date("2024-09-01"),
    userId: "user_1",
    user: mockUsers[0],
    createdAt: new Date("2024-09-01"),
    updatedAt: new Date("2024-12-07"),
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[2], // TypeScript
      mockTechnologies[3], // Node.js
    ],
    types: [mockProjectTypes[1]], // Mobile App
    reviews: mockReviews.filter((r) => r.projectId === "project_2"),
  },
  {
    id: "project_3",
    name: "Task Management API",
    description:
      "RESTful API built with NestJS for task and project management. Includes user authentication, real-time updates, and comprehensive reporting features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800",
    slug: "task-management-api",
    status: ProjectStatus.COMPLETED,
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-15"),
    userId: "user_1",
    user: mockUsers[0],
    createdAt: new Date("2024-06-01"),
    updatedAt: new Date("2024-08-15"),
    technologies: [
      mockTechnologies[4], // NestJS
      mockTechnologies[2], // TypeScript
      mockTechnologies[5], // Prisma
      mockTechnologies[6], // PostgreSQL
      mockTechnologies[7], // Docker
    ],
    types: [mockProjectTypes[2]], // API/Backend
    reviews: [],
  },
  {
    id: "project_4",
    name: "Design System Components",
    description:
      "Comprehensive React component library with Storybook documentation. Built with TypeScript and includes accessibility features.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800",
    slug: "design-system-components",
    status: ProjectStatus.PLANNING,
    startDate: new Date("2025-01-01"),
    userId: "user_2",
    user: mockUsers[1],
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-07"),
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[2], // TypeScript
      mockTechnologies[9], // Tailwind CSS
    ],
    types: [mockProjectTypes[0]], // Web Application
    reviews: [],
  },
];

// Server actions
export async function getProjects(
  filters?: ProjectFilters
): Promise<Project[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredProjects = [...mockProjects];

    if (filters?.status) {
      filteredProjects = filteredProjects.filter(
        (p) => p.status === filters.status
      );
    }

    if (filters?.userId) {
      filteredProjects = filteredProjects.filter(
        (p) => p.userId === filters.userId
      );
    }

    if (filters?.technologyIds?.length) {
      filteredProjects = filteredProjects.filter((p) =>
        p.technologies.some((tech) => filters.technologyIds!.includes(tech.id))
      );
    }

    if (filters?.typeIds?.length) {
      filteredProjects = filteredProjects.filter((p) =>
        p.types.some((type) => filters.typeIds!.includes(type.id))
      );
    }

    return filteredProjects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const project = mockProjects.find((p) => p.slug === slug);
    return project || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function getProjectsWithStats(): Promise<ProjectWithStats[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return mockProjects.map((project) => ({
      ...project,
      averageRating:
        project.reviews.length > 0
          ? project.reviews.reduce((sum, review) => sum + review.rating, 0) /
            project.reviews.length
          : 0,
      reviewsCount: project.reviews.length,
      technologiesCount: project.technologies.length,
    }));
  } catch (error) {
    console.error("Error fetching projects with stats:", error);
    return [];
  }
}

export async function getProjectTypes(): Promise<ProjectType[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockProjectTypes;
  } catch (error) {
    console.error("Error fetching project types:", error);
    return [];
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    // Return projects with highest ratings or most recent completed ones
    return mockProjects
      .filter((p) => p.status === ProjectStatus.COMPLETED)
      .sort((a, b) => {
        const aAvgRating =
          a.reviews.length > 0
            ? a.reviews.reduce((sum, review) => sum + review.rating, 0) /
              a.reviews.length
            : 0;
        const bAvgRating =
          b.reviews.length > 0
            ? b.reviews.reduce((sum, review) => sum + review.rating, 0) /
              b.reviews.length
            : 0;
        return bAvgRating - aAvgRating;
      })
      .slice(0, 3);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}
