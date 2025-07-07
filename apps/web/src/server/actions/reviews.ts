"use server";

import {
  Review,
  ReviewWithDetails,
  ReviewFilters,
  CreateReviewDto,
} from "../types/review";
import { mockUsers } from "./users";
import { mockProjects } from "./projects";

// Mock reviews (extended from projects but separate for organization)
export const mockReviews: Review[] = [
  {
    id: "review_1",
    projectId: "project_1",
    userId: "user_2",
    rating: 5,
    comment:
      "Amazing project! The UI is beautiful and the performance is excellent. Rafael really knows how to build scalable applications.",
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-11-15"),
    user: {
      id: "user_2",
      name: "Ana Silva",
      username: "ana_silva",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=400",
    },
    project: {
      id: "project_1",
      name: "Portfolio CMS Platform",
      slug: "portfolio-cms-platform",
    },
  },
  {
    id: "review_2",
    projectId: "project_1",
    userId: "user_3",
    rating: 4,
    comment:
      "Great work! Really impressed with the technical implementation. The use of modern technologies shows deep understanding.",
    createdAt: new Date("2024-11-10"),
    updatedAt: new Date("2024-11-10"),
    user: {
      id: "user_3",
      name: "Carlos Santos",
      username: "carlos_santos",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    project: {
      id: "project_1",
      name: "Portfolio CMS Platform",
      slug: "portfolio-cms-platform",
    },
  },
  {
    id: "review_3",
    projectId: "project_2",
    userId: "user_2",
    rating: 5,
    comment:
      "This mobile app is incredibly smooth and well-designed. The user experience is top-notch!",
    createdAt: new Date("2024-10-20"),
    updatedAt: new Date("2024-10-20"),
    user: {
      id: "user_2",
      name: "Ana Silva",
      username: "ana_silva",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=400",
    },
    project: {
      id: "project_2",
      name: "E-Commerce Mobile App",
      slug: "ecommerce-mobile-app",
    },
  },
  {
    id: "review_4",
    projectId: "project_3",
    userId: "user_3",
    rating: 4,
    comment:
      "Solid API implementation with good documentation and error handling. Well structured and maintainable code.",
    createdAt: new Date("2024-09-05"),
    updatedAt: new Date("2024-09-05"),
    user: {
      id: "user_3",
      name: "Carlos Santos",
      username: "carlos_santos",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    project: {
      id: "project_3",
      name: "Task Management API",
      slug: "task-management-api",
    },
  },
  // General portfolio reviews (no specific project)
  {
    id: "review_5",
    userId: "user_2",
    rating: 5,
    comment:
      "Rafael's portfolio demonstrates exceptional skills across the full stack. His projects show attention to detail and modern best practices.",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-01"),
    user: {
      id: "user_2",
      name: "Ana Silva",
      username: "ana_silva",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5ff?w=400",
    },
  },
  {
    id: "review_6",
    userId: "user_3",
    rating: 5,
    comment:
      "Impressive work! The combination of frontend and backend skills is remarkable. Great code quality and architecture decisions.",
    createdAt: new Date("2024-11-28"),
    updatedAt: new Date("2024-11-28"),
    user: {
      id: "user_3",
      name: "Carlos Santos",
      username: "carlos_santos",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  },
];

// Server actions
export async function getReviews(filters?: ReviewFilters): Promise<Review[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    let filteredReviews = [...mockReviews];

    if (filters?.projectId) {
      filteredReviews = filteredReviews.filter(
        (r) => r.projectId === filters.projectId
      );
    }

    if (filters?.userId) {
      filteredReviews = filteredReviews.filter(
        (r) => r.userId === filters.userId
      );
    }

    if (filters?.rating) {
      filteredReviews = filteredReviews.filter(
        (r) => r.rating === filters.rating
      );
    }

    if (filters?.minRating) {
      filteredReviews = filteredReviews.filter(
        (r) => r.rating >= filters.minRating!
      );
    }

    if (filters?.maxRating) {
      filteredReviews = filteredReviews.filter(
        (r) => r.rating <= filters.maxRating!
      );
    }

    if (filters?.dateFrom) {
      filteredReviews = filteredReviews.filter(
        (r) => r.createdAt >= filters.dateFrom!
      );
    }

    if (filters?.dateTo) {
      filteredReviews = filteredReviews.filter(
        (r) => r.createdAt <= filters.dateTo!
      );
    }

    return filteredReviews.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
}

export async function getReviewById(id: string): Promise<Review | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const review = mockReviews.find((r) => r.id === id);
    return review || null;
  } catch (error) {
    console.error("Error fetching review:", error);
    return null;
  }
}

export async function getProjectReviews(projectId: string): Promise<Review[]> {
  try {
    return getReviews({ projectId });
  } catch (error) {
    console.error("Error fetching project reviews:", error);
    return [];
  }
}

export async function getGeneralReviews(): Promise<Review[]> {
  try {
    return getReviews({ projectId: undefined });
  } catch (error) {
    console.error("Error fetching general reviews:", error);
    return [];
  }
}

export async function getReviewsWithDetails(): Promise<ReviewWithDetails[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return mockReviews.map((review) => ({
      ...review,
      userDisplayName: review.user.name,
      userImage: review.user.image,
      projectName: review.project?.name,
    }));
  } catch (error) {
    console.error("Error fetching reviews with details:", error);
    return [];
  }
}

export async function createReview(
  data: CreateReviewDto & { userId: string }
): Promise<Review | null> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const user = mockUsers.find((u) => u.id === data.userId);
    if (!user) return null;

    let project = undefined;
    if (data.projectId) {
      const foundProject = mockProjects.find((p) => p.id === data.projectId);
      if (foundProject) {
        project = {
          id: foundProject.id,
          name: foundProject.name,
          slug: foundProject.slug,
        };
      }
    }

    const newReview: Review = {
      id: `review_${Date.now()}`,
      projectId: data.projectId,
      userId: data.userId,
      rating: data.rating,
      comment: data.comment,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
      project,
    };

    mockReviews.push(newReview);
    return newReview;
  } catch (error) {
    console.error("Error creating review:", error);
    return null;
  }
}

export async function getAverageRating(projectId?: string): Promise<number> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const reviews = projectId
      ? mockReviews.filter((r) => r.projectId === projectId)
      : mockReviews.filter((r) => !r.projectId); // General reviews

    if (reviews.length === 0) return 0;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal place
  } catch (error) {
    console.error("Error calculating average rating:", error);
    return 0;
  }
}

export async function getReviewStats(): Promise<{
  totalReviews: number;
  averageRating: number;
  ratingDistribution: { [key: number]: number };
}> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    mockReviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
      }
    });

    const averageRating = await getAverageRating();

    return {
      totalReviews: mockReviews.length,
      averageRating,
      ratingDistribution,
    };
  } catch (error) {
    console.error("Error fetching review stats:", error);
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }
}
