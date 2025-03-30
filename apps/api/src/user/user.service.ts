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

      // Split stored password into salt and stored hash
      const [salt, storedHash] = dbUser.password.split('&');

      // Generate hash with provided password and retrieved salt
      const computedHash = pbkdf2Sync(
        updatePasswordData.password,
        salt,
        100000,
        64,
        'sha512',
      ).toString('hex');

      // Compare the computed hash with the stored hash
      if (computedHash === storedHash) {
        const newPassword = this.generateSaltAndHash(
          updatePasswordData.newPassword,
        );
        await this.prisma.user.update({
          where: { email: updatePasswordData.email },
          data: { password: newPassword },
        });
      } else {
        throw new BadRequestException('Authentication failed');
      }
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

  async auth(user: AuthUserDto) {
    try {
      const dbUser = await this.prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (!dbUser) {
        throw new BadRequestException('User not found');
      }

      // Split stored password into salt and stored hash
      const [salt, storedHash] = dbUser.password.split('&');

      // Generate hash with provided password and retrieved salt
      const computedHash = pbkdf2Sync(
        user.password,
        salt,
        100000,
        64,
        'sha512',
      ).toString('hex');

      // Compare the computed hash with the stored hash
      if (computedHash === storedHash) {
        const { password, ...userWithoutPassword } = dbUser;
        return userWithoutPassword;
      } else {
        throw new BadRequestException('Authentication failed');
      }
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new BadRequestException('Authentication failed');
    }
  }

  async findUserByField (field: string, value: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: field === 'id'
          ? { id: value }
          : field === 'email'
          ? { email: value }
          : field === 'slug'
          ? { slug: value }
          : (() => {
              throw new BadRequestException('Invalid field for user lookup');
            })(),
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
