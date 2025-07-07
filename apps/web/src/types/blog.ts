import { BaseEntity, NamedSlugEntity } from "./common";
import { User } from "./user";

// Tag interface
export interface Tag extends NamedSlugEntity {
  icon?: string;
}

// Comment interface
export interface Comment extends BaseEntity {
  control: string;
  content: string;
  postId: string;
  userId: string;
  post: Post;
  user: User;
}

// Like interface
export interface Like extends BaseEntity {
  control: string;
  postId: string;
  userId: string;
  post: Post;
  user: User;
}

// Post interface with all relationships
export interface Post extends BaseEntity {
  title: string;
  content: string;
  image?: string;
  slug: string;
  category: string;
  published: boolean;
  publishedAt?: Date;
  username: string;
  user: User;
  tags: Tag[];
  comments: Comment[];
  likes: Like[];
}

// Post creation DTO
export interface CreatePostDto {
  title: string;
  content: string;
  image?: string;
  slug: string;
  category: string;
  published?: boolean;
  tagIds: string[];
}

// Post update DTO
export type UpdatePostDto = Partial<CreatePostDto>;

// Post with aggregated data for blog display
export interface PostWithStats extends Post {
  commentsCount: number;
  likesCount: number;
  readingTime: number; // estimated reading time in minutes
}

// Post filters for listing
export interface PostFilters {
  published?: boolean;
  category?: string;
  username?: string;
  tagIds?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

// Post status enum
export enum PostStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
  ARCHIVED = "archived",
}

// Comment creation DTO
export interface CreateCommentDto {
  content: string;
  postId: string;
}

// Comment update DTO
export interface UpdateCommentDto {
  content: string;
}
