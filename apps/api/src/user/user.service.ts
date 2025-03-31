import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateUserDto,
  AuthUserDto,
  UpdateUserDto,
  UpdateUserPasswordDto,
} from './dto/UserDto';
import { randomBytes, pbkdf2Sync } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  generateSaltAndHash(password: string) {
    try {
      const salt = randomBytes(8).toString('hex');
      const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString(
        'hex',
      );
      return `${salt}&${hash}`;
    } catch (e) {
      throw new BadRequestException('Error generating password hash');
    }
  }

  async createUser(userData: CreateUserDto) {
    try {
      userData.password = this.generateSaltAndHash(userData.password);

      return await this.prisma.user.create({
        data: {
          username: userData.username,
          name: userData.name,
          email: userData.email,
          slug: userData.name.toLowerCase().replace(/\s+/g, '-'),
          password: userData.password,
          worksAt: userData.worksAt,
          location: userData.location,
          linkedin: userData.linkedin,
          github: userData.github,
          website: userData.website,
          bio: userData.bio,
          about: userData.about,
          image:
            userData.image ||
            `https://avatar.vercel.sh/${userData.name.toLowerCase().replace(/\s+/g, '-')}`,
          especialities: {
            connectOrCreate: userData.especialities.map((especiality) => ({
              where: { slug: especiality.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: especiality,
                slug: especiality.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
          technologies: {
            connectOrCreate: userData.technologies.map((technology) => ({
              where: { slug: technology.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: technology,
                slug: technology.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
        },
      });
    } catch (error) {
      throw new BadRequestException('Error creating user');
    }
  }

  async updatePassword(updatePasswordData: UpdateUserPasswordDto) {
    try {
      const dbUser = await this.prisma.user.findUnique({
        where: {
          email: updatePasswordData.email,
        },
      });

      if (!dbUser) {
        throw new BadRequestException('User not found');
      }

      updatePasswordData.password = this.generateSaltAndHash(
        updatePasswordData.password,
      );

      const user = await this.prisma.user.update({
        where: { email: updatePasswordData.email },
        data: {
          password: updatePasswordData.password,
        },
      });

      return user;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Authentication failed');
    }
  }

  async updateUser(userData: UpdateUserDto) {
    try {
      const dbUser = await this.prisma.user.findUnique({
        where: {
          email: userData.email,
        },
      });

      if (!dbUser) {
        throw new BadRequestException('User not found');
      }

      const user = await this.prisma.user.update({
        where: { email: userData.email },
        data: {
          username: userData.username,
          name: userData.name,
          slug: userData.name.toLowerCase().replace(/\s+/g, '-'),
          email: userData.email,
          worksAt: userData.worksAt,
          location: userData.location,
          linkedin: userData.linkedin,
          github: userData.github,
          website: userData.website,
          bio: userData.bio,
          about: userData.about,
          image:
            userData.image ||
            `https://avatar.vercel.sh/${userData.name.toLowerCase().replace(/\s+/g, '-')}`,
          especialities: {
            connectOrCreate: userData.especialities.map((especiality) => ({
              where: { slug: especiality.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: especiality,
                slug: especiality.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
          technologies: {
            connectOrCreate: userData.technologies.map((technology) => ({
              where: { slug: technology.toLowerCase().replace(/\s+/g, '-') },
              create: {
                name: technology,
                slug: technology.toLowerCase().replace(/\s+/g, '-'),
              },
            })),
          },
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByField(field: string, value: string) {
    try {
      if (!field || !value) {
        throw new BadRequestException('Field and value are required');
      }

      if (
        field !== 'id' &&
        field !== 'email' &&
        field !== 'slug' &&
        field !== 'username'
      ) {
        throw new BadRequestException('Invalid field for user lookup');
      }

      const user = await this.prisma.user.findUnique({
        where:
          field === 'id'
            ? { id: value }
            : field === 'email'
              ? { email: value }
              : field === 'slug'
                ? { slug: value }
                : { username: value },
        include: {
          especialities: true,
          technologies: true,
        },
      });

      if (!user) {
        throw new BadRequestException('User not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
