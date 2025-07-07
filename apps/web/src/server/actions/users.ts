"use server";

import {
  UserPublic,
  Especiality,
  Technology,
  UserProfile,
} from "../types/user";

// Mock data for especialities
export const mockEspecialities: Especiality[] = [
  {
    id: "esp_1",
    name: "Frontend Development",
    slug: "frontend-development",
    icon: "🎨",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "esp_2",
    name: "Backend Development",
    slug: "backend-development",
    icon: "⚙️",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "esp_3",
    name: "Mobile Development",
    slug: "mobile-development",
    icon: "📱",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "esp_4",
    name: "DevOps",
    slug: "devops",
    icon: "🔧",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "esp_5",
    name: "UI/UX Design",
    slug: "ui-ux-design",
    icon: "🎯",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
];

// Mock data for technologies
export const mockTechnologies: Technology[] = [
  {
    id: "tech_1",
    name: "React",
    slug: "react",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tech_2",
    name: "Next.js",
    slug: "nextjs",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tech_3",
    name: "TypeScript",
    slug: "typescript",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tech_4",
    name: "Node.js",
    slug: "nodejs",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tech_5",
    name: "NestJS",
    slug: "nestjs",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tech_6",
    name: "Prisma",
    slug: "prisma",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tech_7",
    name: "PostgreSQL",
    slug: "postgresql",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tech_8",
    name: "Docker",
    slug: "docker",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tech_9",
    name: "AWS",
    slug: "aws",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "tech_10",
    name: "Tailwind CSS",
    slug: "tailwind-css",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
];

// Mock data for users
export const mockUsers: UserPublic[] = [
  {
    id: "user_1",
    username: "rafael_dantas",
    name: "Rafael Dantas",
    worksAt: "Freelancer",
    location: "São Paulo, Brazil",
    linkedin: "https://linkedin.com/in/rafael-dantas",
    github: "https://github.com/rafaeldantas",
    website: "https://rafaeldantas.dev",
    bio: "Full-stack developer passionate about creating amazing user experiences",
    about:
      "I'm a passionate developer with over 5 years of experience in web development. I love working with modern technologies and creating scalable applications.",
    image: "https://github.com/rafaeldantas.png",
    slug: "rafael-dantas",
    isAdmin: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-12-01"),
    especialities: [
      mockEspecialities[0],
      mockEspecialities[1],
      mockEspecialities[3],
    ],
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[1], // Next.js
      mockTechnologies[2], // TypeScript
      mockTechnologies[3], // Node.js
      mockTechnologies[4], // NestJS
      mockTechnologies[5], // Prisma
      mockTechnologies[6], // PostgreSQL
      mockTechnologies[9], // Tailwind CSS
    ],
  },
  {
    id: "user_2",
    username: "ana_silva",
    name: "Ana Silva",
    worksAt: "TechCorp",
    location: "Rio de Janeiro, Brazil",
    linkedin: "https://linkedin.com/in/ana-silva",
    github: "https://github.com/anasilva",
    website: "https://anasilva.dev",
    bio: "Frontend specialist with a passion for UI/UX design",
    about:
      "Frontend developer with 4 years of experience. I specialize in React and modern CSS frameworks.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612-b5ff?w=400",
    slug: "ana-silva",
    isAdmin: false,
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2024-11-15"),
    especialities: [mockEspecialities[0], mockEspecialities[4]],
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[1], // Next.js
      mockTechnologies[2], // TypeScript
      mockTechnologies[9], // Tailwind CSS
    ],
  },
  {
    id: "user_3",
    username: "carlos_santos",
    name: "Carlos Santos",
    worksAt: "DevStudio",
    location: "Belo Horizonte, Brazil",
    bio: "Mobile app developer focused on React Native and Flutter",
    about:
      "Mobile developer with expertise in cross-platform solutions. Love creating smooth user experiences.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    slug: "carlos-santos",
    isAdmin: false,
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2024-10-01"),
    especialities: [mockEspecialities[2]],
    technologies: [
      mockTechnologies[0], // React
      mockTechnologies[2], // TypeScript
      mockTechnologies[3], // Node.js
    ],
  },
];

// Server actions
export async function getUsers(): Promise<UserPublic[]> {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export async function getUserByUsername(
  username: string
): Promise<UserPublic | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const user = mockUsers.find((u) => u.username === username);
    return user || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export async function getUserProfile(
  username: string
): Promise<UserProfile | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const user = mockUsers.find((u) => u.username === username);

    if (!user) return null;

    return {
      ...user,
      projectsCount: Math.floor(Math.random() * 10) + 1,
      postsCount: Math.floor(Math.random() * 15) + 1,
      reviewsCount: Math.floor(Math.random() * 25) + 1,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}

export async function getEspecialities(): Promise<Especiality[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockEspecialities;
  } catch (error) {
    console.error("Error fetching especialities:", error);
    return [];
  }
}

export async function getTechnologies(): Promise<Technology[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return mockTechnologies;
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return [];
  }
}
