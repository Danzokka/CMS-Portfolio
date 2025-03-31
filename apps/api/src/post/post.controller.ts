import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/PostDto';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AdminGuard)
  @Post()
  async createPost(@Body() postDto: CreatePostDto) {
    try {
      return this.postService.createPost(postDto);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Put(':slug')
  async updatePost(@Body() postDto: CreatePostDto, @Param('slug') slug: string) {
    try {
      return this.postService.updatePost(postDto, slug);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Put('publish/:slug')
  async publishPost(@Param('slug') slug: string) {
    try {
      return this.postService.publishPost(slug);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Delete(':slug')
  async deletePost(@Param('slug') slug: string) {
    try {
      return this.postService.deletePost(slug);
    } catch (error) {
      throw error;
    }
  }
}
