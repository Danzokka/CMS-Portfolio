// Common/shared types
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SlugEntity extends BaseEntity {
  slug: string;
}

export interface NamedEntity extends BaseEntity {
  name: string;
}

export interface NamedSlugEntity extends NamedEntity, SlugEntity {}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
