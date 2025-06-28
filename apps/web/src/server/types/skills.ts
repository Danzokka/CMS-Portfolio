export type Skill = {
  id: string;
  name: string;
  description: string;
  icon: string; // URL or path to the icon image
  category: string; // e.g., "Programming", "Design", etc.
  level: number; // Skill level from 1 to 5
  createdAt: Date;
  updatedAt: Date;
}