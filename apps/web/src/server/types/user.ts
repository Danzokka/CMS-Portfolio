import { BaseEntity, NamedSlugEntity } from "../../types/common";

// Technology interface
export interface Technology extends NamedSlugEntity {
  // Additional technology-specific properties can be added here in the future
}

// Especiality interface
export interface Especiality extends NamedSlugEntity {
  icon?: string;
}

// User interface with all relationships
export interface User extends BaseEntity {
  username: string;
  name: string;
  email: string;
  password: string;
  worksAt: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  bio: string;
  about?: string;
  image?: string;
  slug: string;
  isAdmin: boolean;
  especialities?: Especiality[];
  technologies?: Technology[];
}

// User creation interface (without password and sensitive data)
export interface UserPublic extends Omit<User, "password" | "email"> {
  especialities: Especiality[];
  technologies: Technology[];
}

// User creation DTO
export interface CreateUserDto {
  username: string;
  name: string;
  email: string;
  password: string;
  worksAt?: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  bio: string;
  about?: string;
  image?: string;
  slug: string;
  especialityIds?: string[];
  technologyIds?: string[];
}

// User update DTO
export type UpdateUserDto = Partial<
  Omit<CreateUserDto, "username" | "email" | "password">
>;

// User profile for portfolio display
export interface UserProfile extends UserPublic {
  projectsCount: number;
  postsCount: number;
  reviewsCount: number;
}
