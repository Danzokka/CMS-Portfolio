import { BaseEntity, NamedSlugEntity } from "./common";
import { User, Technology } from "./user";

// ProjectType interface
export interface ProjectType extends NamedSlugEntity {
  // Additional project type properties can be added here in the future
}

// Review interface
export interface Review extends BaseEntity {
  projectId?: string;
  userId: string;
  rating: number;
  comment: string;
  user: User;
  project?: Project;
}

// Project interface with all relationships
export interface Project extends BaseEntity {
  name: string;
  description: string;
  image?: string;
  slug: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  userId: string;
  user: User;
  technologies: Technology[];
  types: ProjectType[];
  reviews: Review[];
}

// Project creation DTO
export interface CreateProjectDto {
  name: string;
  description: string;
  image?: string;
  slug: string;
  status: string;
  startDate: Date;
  endDate?: Date;
  technologyIds: string[];
  typeIds: string[];
}

// Project update DTO
export type UpdateProjectDto = Partial<CreateProjectDto>;

// Project with aggregated data for portfolio display
export interface ProjectWithStats extends Project {
  averageRating: number;
  reviewsCount: number;
  technologiesCount: number;
}

// Project filters for listing
export interface ProjectFilters {
  status?: string;
  userId?: string;
  technologyIds?: string[];
  typeIds?: string[];
  dateFrom?: Date;
  dateTo?: Date;
}

// Project status enum
export enum ProjectStatus {
  PLANNING = "planning",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  ON_HOLD = "on_hold",
  CANCELLED = "cancelled",
}
