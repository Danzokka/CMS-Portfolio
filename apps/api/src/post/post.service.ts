import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/PostDto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserExists(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    return true;
  }

  async checkPostExists(slug: string) {
    const post = await this.prisma.post.findUnique({
      where: { slug },
    });

    if (post) {
      throw new BadRequestException('Post already exists');
    }
    return true;
  }

  async createPost(post: CreatePostDto, username: string) {
    try {
      
      // Check

      await Promise.all([
        this.checkUserExists(username),
        this.checkPostExists(post.title.toLowerCase().replace(/\s+/g, '-')),
      ]);

      // Create the post

      return await this.prisma.post.create({
        data: {
          title: post.title,
          image: post.image,
          content: post.content,
          slug: post.title.toLowerCase().replace(/\s+/g, '-'),
          username: username,
          category: post.category,
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
        include: {
          tags: {
            select: {
              name: true,
              slug: true,
              icon: true,
            },
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePost(post: UpdatePostDto, slug: string) {
    try {
      return await this.prisma.post.update({
        where: { slug },
        data: {
          title: post.title,
          image: post.image,
          content: post.content,
          slug: post.title.toLowerCase().replace(/\s+/g, '-'),
          category: post.category,
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
        include: {
          tags: {
            select: {
              name: true,
              slug: true,
              icon: true,
            },
          }
        },
      });
    } catch (error) {
      throw new BadRequestException('Post does not exist');
    }
  }

  async getAllPosts() {
    try {
      return await this.prisma.post.findMany({
        include: {
          tags: {
            select: {
              name: true,
              slug: true,
              icon: true,
            },
          }
        },
      });
    } catch (error) {
      throw new BadRequestException('Error fetching posts');
    }
  }

  async getPostBySlug(slug: string) {
    try {
      return await this.prisma.post.findUnique({
        where: { slug },
        include: {
          tags: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Post does not exist');
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
      });
    } catch (error) {
      throw new BadRequestException('Post does not exist');
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
      });
    } catch (error) {
      throw new BadRequestException('Post does not exist');
    }
  }

  async deletePost(slug: string) {
    try {
      return await this.prisma.post.delete({
        where: { slug },
      });
    } catch (error) {
      throw new BadRequestException('Post does not exist');
    }
  }

  async getPostsByUsername(username: string) {
    // Check if the user exists
    await this.checkUserExists(username);

    try {
      return await this.prisma.post.findMany({
        where: { username },
        include: {
          tags: {
            select: {
              name: true,
              slug: true,
              icon: true,
            },
          }
        },
      });
    } catch (error) {
      throw new BadRequestException('User does not exist');
    }
  }
}
