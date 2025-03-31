import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/PostDto';
import { CreateCommentDto, UpdateCommentDto } from './dto/CommentDto';

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
          },
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
          },
          User: {
            select: {
              username: true,
              image: true,
            },
          },
          Like: {
            select: {
              User: {
                select: {
                  username: true,
                  image: true,
                },
              },
            },
          },
          Comment: {
            select: {
              content: true,
              createdAt: true,
              User: {
                select: {
                  username: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
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
          tags: {
            select: {
              name: true,
              slug: true,
              icon: true,
            },
          },
          User: {
            select: {
              username: true,
              image: true,
            },
          },
          Like: {
            select: {
              User: {
                select: {
                  username: true,
                  image: true,
                },
              }
            }
          },
          Comment: {
            select: {
              content: true,
              createdAt: true,
              User: {
                select: {
                  username: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: 'desc',
            },
          },
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
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('User does not exist');
    }
  }

  async checkComment(postId: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { control: `${postId}p-${userId}u` },
    });

    if (comment) {
      throw new BadRequestException('Comment already exists');
    }
    return true;
  }

  async checkLike(postId: string, userId: string) {
    const like = await this.prisma.like.findUnique({
      where: { control: `${postId}p-${userId}u` },
    });
    if (like) {
      throw new BadRequestException('Like already exists');
    }
    return true;
  }

  async createComment(data: CreateCommentDto, userId: string) {
    try {
      // Check if the comment exists
      await this.checkComment(data.postId, userId);

      const comment = await this.prisma.comment.create({
        data: {
          control: `${data.postId}p-${userId}u`,
          content: data.content,
          postId: data.postId,
          userId,
        },
        include: {
          User: {
            select: {
              username: true,
              image: true,
            },
          },
        },
      });

      return comment;
    } catch (error) {
      throw new BadRequestException('Error creating comment');
    }
  }

  async updateComment(data: UpdateCommentDto, userId: string) {
    try {
      // Check if the comment exists
      const comment = await this.prisma.comment.findUnique({
        where: { control: `${data.postId}p-${userId}u` },
      });
      if (!comment) {
        throw new BadRequestException('Comment does not exist');
      }

      return await this.prisma.comment.updateMany({
        where: {
          control: `${data.postId}p-${userId}u`,
        },
        data: {
          content: data.content,
          postId: data.postId,
          userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Error updating comment');
    }
  }

  async deleteComment(id: string) {
    try {
      // Check if the comment exists
      const comment = await this.prisma.comment.findUnique({
        where: { id },
      });
      if (!comment) {
        throw new BadRequestException('Comment does not exist');
      }

      return await this.prisma.comment.delete({
        where: { id },
      });
    } catch (error) {
      throw new BadRequestException('Error deleting comment');
    }
  }

  async deleteComments() {
    try {
      return await this.prisma.comment.deleteMany();
    } catch (error) {
      throw new BadRequestException('Error deleting comments');
    }
  }

  async addLike(postId: string, userId: string) {
    try {
      // Check if the like exists
      await this.checkLike(postId, userId);

      return await this.prisma.like.create({
        data: {
          control: `${postId}p-${userId}u`,
          postId,
          userId,
        },
      });
    } catch (error) {
      throw new BadRequestException('Error adding like');
    }
  }

  async removeLike(postId: string, userId: string) {
    try {
      // Check if the like exists
      const like = await this.prisma.like.findUnique({
        where: { control: `${postId}p-${userId}u` },
      });
      if (!like) {
        throw new BadRequestException('Like does not exist');
      }

      return await this.prisma.like.delete({
        where: {
          control: `${postId}p-${userId}u`,
        },
      });
    } catch (error) {
      throw new BadRequestException('Error removing like');
    }
  }
}
