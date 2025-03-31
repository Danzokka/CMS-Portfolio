import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Request,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateReviewDto } from './dto/ReviewDto';
import { RequestAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createReview(
    @Body() reviewDto: CreateReviewDto,
    @Request() req: Request & { user: RequestAuthGuard['user'] },
  ) {
    try {
      return this.reviewService.createReview(reviewDto, req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async updateReview(
    @Body() reviewDto: CreateReviewDto,
    @Param('id') id: string,
  ) {
    try {
      return this.reviewService.updateReview(reviewDto, id);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAllReviews() {
    try {
      return this.reviewService.getAllReviews();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async getReviewById(@Param('id') id: string) {
    try {
      return this.reviewService.getReviewById(id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async getUserReviews(
    @Request() req: Request & { user: RequestAuthGuard['user'] },
  ) {
    try {
      return this.reviewService.getUserReviews(req.user.id);
    } catch (error) {
      throw error;
    }
  }

  @Get('user/:id')
  async getUserReviewsById(@Param('id') id: string) {
    try {
      return this.reviewService.getReviewsByUserId(id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteReview(
    @Param('id') id: string,
    @Request() req: Request & { user: RequestAuthGuard['user'] },
  ) {
    try {
      return this.reviewService.deleteReview(id, req.user.id);
    } catch (error) {
      throw error;
    }
  }
}
