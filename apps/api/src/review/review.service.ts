import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/ReviewDto';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async checkReviewExists(userId: string, projectId: string | undefined) {
    if (!projectId) {
      const review = await this.prisma.review.findFirst({
        where: {
          userId: userId,
          projectId: null,
        },
      });
      if (review) {
        throw new BadRequestException('Review already exists');
      }
      return false;
    }

    const review = await this.prisma.review.findFirst({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });
    if (review) {
      throw new BadRequestException('Review already exists');
    }
    return false;
  }

  async checkProjectExists(id: string) {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new BadRequestException('Project does not exist');
    }
    return false;
  }

  async checkUserExists(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return false;
  }

  async checkReview(id: string) {
    const review = await this.prisma.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new BadRequestException('Review does not exist');
    }
    return false;
  }

  async createReview(reviewData: CreateReviewDto, id: string) {
    try {
      await Promise.all([
        this.checkUserExists(id),
        this.checkReviewExists(id, reviewData.projectId),
      ]);

      if (!reviewData.projectId) {
        const review = await this.prisma.review.create({
          data: {
            comment: reviewData.comment,
            rating: reviewData.rating,
            userId: id,
          },
        });
        return review;
      }

      const review = await this.prisma.review.create({
        data: {
          comment: reviewData.comment,
          rating: reviewData.rating,
          projectId: reviewData.projectId,
          userId: id,
        },
      });

      return review;
    } catch (error) {
      throw error;
    }
  }

  async updateReview(reviewData: UpdateReviewDto, id: string) {
    try {
      await this.checkReview(id);

      const review = await this.prisma.review.update({
        where: { id },
        data: {
          comment: reviewData.comment,
          rating: reviewData.rating,
        },
      });
      return review;
    } catch (error) {
      throw error;
    }
  }

  async getAllReviews() {
    try {
      const reviews = await this.prisma.review.findMany({
        include: {
          user: true,
          Project: true,
        },
      });
      return reviews;
    } catch (error) {
      throw error;
    }
  }

  async getReviewById(id: string) {
    try {
      const review = await this.prisma.review.findUnique({
        where: { id },
        include: {
          user: true,
          Project: true,
        },
      });
      return review;
    } catch (error) {
      throw error;
    }
  }

  async getPortfolioReviews() {
    try {
      const reviews = await this.prisma.review.findMany({
        where: {
          projectId: null,
        },
        include: {
          user: true,
        },
      });
      return reviews;
    } catch (error) {
      throw error;
    }
  }

  async deleteReview(id: string, userId: string) {
    try {
      await this.checkReview(id);
      await this.checkUserExists(userId);

      await this.prisma.review.delete({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async getReviewsByProjectId(projectId: string) {
    try {
      await this.checkProjectExists(projectId);

      const reviews = await this.prisma.review.findMany({
        where: { projectId },
        include: {
          user: true,
        },
      });
      return reviews;
    } catch (error) {
      throw error;
    }
  }

  async getUserReviews(userId: string) {
    try {
      await this.checkUserExists(userId);

      const reviews = await this.prisma.review.findMany({
        where: { userId },
        include: {
          Project: true,
        },
      });
      return reviews;
    } catch (error) {
      throw error;
    }
  }

  async getReviewsByUserId(userId: string) {
    try {
      const reviews = await this.prisma.review.findMany({
        where: { userId },
        include: {
          Project: true,
        },
      });
      return reviews;
    } catch (error) {
      throw error;
    }
  }
}
