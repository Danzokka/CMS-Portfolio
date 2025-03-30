import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/PostDto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() postDto: CreatePostDto) {
    try {
      return this.postService.createPost(postDto);
    } catch (error) {
      throw error;
    }
  }

  @Put(':slug')
  async updatePost(
    @Body() postDto: CreatePostDto,
    @Param('slug') slug: string,
  ) {
    try {
      return this.postService.updatePost(postDto, slug);
    } catch (error) {
      throw error;
    }
  }

  @Put('publish/:slug')
  async publishPost(@Param('slug') slug: string) {
    try {
      return this.postService.publishPost(slug);
    } catch (error) {
      throw error;
    }
  }

  @Put('unpublish/:slug')
  async unpublishPost(@Param('slug') slug: string) {
    try {
      return this.postService.unpublishPost(slug);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAllPosts() {
    try {
      return this.postService.getAllPosts();
    } catch (error) {
      throw error;
    }
  }
  @Get(':slug')
  async getPostBySlug(@Param('slug') slug: string) {
    try {
      return this.postService.getPostBySlug(slug);
    } catch (error) {
      throw error;
    }
  }

  @Get('user/:userid')
  async getPostsByUserId(@Param('userid') userId: string) {
    try {
      return this.postService.getPostsByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':slug')
  async deletePost(@Param('slug') slug: string) {
    try {
      return this.postService.deletePost(slug);
    } catch (error) {
      throw error;
    }
  }
}
