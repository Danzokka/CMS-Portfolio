"use server"

import { Skill } from "../types/skills";

export async function getSkills() {
  try {
    // Simulate fetching skills from an API or database
    const skills: Skill[] = [
      {
        id: '1',
        name: "JavaScript",
        description: "Dynamic programming language for web development",
        icon: "https://go-skill-icons.vercel.app/api/icons?i=js",
        category: "Programming Language",
        level: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: "React",
        description: "JavaScript library for building user interfaces",
        icon: "https://go-skill-icons.vercel.app/api/icons?i=react",
        category: "Frontend Framework",
        level: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        name: "Node.js",
        description: "JavaScript runtime for server-side development",
        icon: "https://go-skill-icons.vercel.app/api/icons?i=nodejs",
        category: "Backend Runtime",
        level: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        name: "CSS",
        description: "Styling language for web presentation",
        icon: "https://go-skill-icons.vercel.app/api/icons?i=css",
        category: "Styling",
        level: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '5',
        name: "HTML",
        description: "Markup language for web structure",
        icon: "https://go-skill-icons.vercel.app/api/icons?i=html",
        category: "Markup Language",
        level: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return skills;
  } catch (error) {
    console.error("[Get Skills] Failed to fetch skills:", error);
    return [];
  }
}