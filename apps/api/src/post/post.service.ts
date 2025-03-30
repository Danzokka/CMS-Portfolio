import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/PostDto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(post: CreatePostDto) {
    try {
      return await this.prisma.post.create({
        data: {
          title: post.title,
          image: post.image,
          content: post.content,
          slug: post.title.toLowerCase().replace(/\s+/g, '-'),
          category: post.category,
          userId: post.userId,
          published: post.published,
          publishedAt: post.publishedAt,
          tags: {
            connectOrCreate: post.tags.map((tag) => ({
              where: { slug: tag.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: tag,
                slug: tag.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
        },
      })
    } catch (error) {
      throw error
    }
  }

  async updatePost(post: CreatePostDto, slug: string) {
    try {
      return await this.prisma.post.update({
        where: { slug },
        data: {
          title: post.title,
          image: post.image,
          content: post.content,
          slug: post.title.toLowerCase().replace(/\s+/g, '-'),
          category: post.category,
          userId: post.userId,
          published: post.published,
          publishedAt: post.publishedAt,
          tags: {
            connectOrCreate: post.tags.map((tag) => ({
              where: { slug: tag.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: tag,
                slug: tag.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
        },
      })
    } catch (error) {
      throw error
    }
  }

  async getAllPosts() {
    try {
      return await this.prisma.post.findMany({
        include: {
          tags: true,
        },
      })
    } catch (error) {
      throw error
    }
  }

  async getPostBySlug(slug: string) {
    try {
      return await this.prisma.post.findUnique({
        where: { slug },
        include: {
          tags: true,
        },
      })
    } catch (error) {
      throw error
    }
  }

  async publishPost(slug: string) {
    try {
      return await this.prisma.post.update({
        where: { slug },
        data: {
          published: true,
          publishedAt: new Date(),
        },
      })
    } catch (error) {
      throw error
    }
  }

  async unpublishPost(slug: string) {
    try {
      return await this.prisma.post.update({
        where: { slug },
        data: {
          published: false,
          publishedAt: null,
        },
      })
    } catch (error) {
      throw error
    }
  }

  async deletePost(slug: string) {
    try {
      return await this.prisma.post.delete({
        where: { slug },
      })
    } catch (error) {
      throw error
    }
  }

  async getPostsByUserId(userId: string) {
    try {
      return await this.prisma.post.findMany({
        where: { userId },
        include: {
          tags: true,
        },
      })
    } catch (error) {
      throw error
    }
  }
}
