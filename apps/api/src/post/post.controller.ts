import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/PostDto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AuthGuard, RequestAuthGuard } from 'src/auth/guards/auth.guard';
import { CreateCommentDto } from './dto/CommentDto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createPost(
    @Body() postDto: CreatePostDto,
    @Request() request: Request & { user: RequestAuthGuard['user'] },
  ) {
    try {
      return this.postService.createPost(postDto, request.user.username);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('comment')
  async commentPost(
    @Body() commentDto: CreateCommentDto,
    @Request() request: Request & { user: RequestAuthGuard['user'] },
  ) {
    try {
      return this.postService.createComment(commentDto, request.user.id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('like/:postId')
  async likePost(
    @Param('postId') postId: string,
    @Request() request: Request & { user: RequestAuthGuard['user'] },
  ) {
    try {
      return this.postService.addLike(postId, request.user.id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Post('unlike/:postId')
  async unlikePost(
    @Param('postId') postId: string,
    @Request() request: Request & { user: RequestAuthGuard['user'] },
  ) {
    try {
      return this.postService.removeLike(postId, request.user.id);
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

  @Get('user/:username')
  async getPostsByUsername(@Param('username') username: string) {
    try {
      return this.postService.getPostsByUsername(username);
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

  @UseGuards(AuthGuard, AdminGuard)
  @Put('publish/:slug')
  async publishPost(@Param('slug') slug: string) {
    try {
      return this.postService.publishPost(slug);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put('unpublish/:slug')
  async unpublishPost(@Param('slug') slug: string) {
    try {
      return this.postService.unpublishPost(slug);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard)
  @Put('comment')
  async updateComment(
    @Body() commentDto: CreateCommentDto,
    @Request() request: Request & { user: RequestAuthGuard['user'] },
  ) {
    try {
      return this.postService.updateComment(commentDto, request.user.id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put(':slug')
  async updatePost(
    @Body() postDto: UpdatePostDto,
    @Param('slug') slug: string,
  ) {
    try {
      return this.postService.updatePost(postDto, slug);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AdminGuard)
  @Delete('comment')
  async deleteCommentByUser() {
    try {
      return this.postService.deleteComments();
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete('comment/:id')
  async deleteComment(
    @Param('id') id: string,
    @Request() request: Request & { user: RequestAuthGuard['user'] },
  ) {
    try {
      return this.postService.deleteComment(id);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':slug')
  async deletePost(@Param('slug') slug: string) {
    try {
      return this.postService.deletePost(slug);
    } catch (error) {
      throw error;
    }
  }
}
