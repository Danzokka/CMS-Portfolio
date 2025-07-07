import { BaseEntity } from "../../types/common";

// Forward declare to avoid circular dependencies
interface User {
  id: string;
  name: string;
  username: string;
  image?: string;
}

interface Project {
  id: string;
  name: string;
  slug: string;
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

// Review creation DTO
export interface CreateReviewDto {
  projectId?: string;
  rating: number;
  comment: string;
}

// Review update DTO
export type UpdateReviewDto = Partial<Omit<CreateReviewDto, "projectId">>;

// Review filters for listing
export interface ReviewFilters {
  projectId?: string;
  userId?: string;
  rating?: number;
  minRating?: number;
  maxRating?: number;
  dateFrom?: Date;
  dateTo?: Date;
}

// Review with user details for display
export interface ReviewWithDetails extends Review {
  userDisplayName: string;
  userImage?: string;
  projectName?: string;
}
