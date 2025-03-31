import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization && authorization.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: request.user.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.isAdmin && user.username !== process.env.ADMIN_USERNAME) {
      throw new UnauthorizedException('User is not an admin');
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      request.user = {
        username: tokenPayload.username,
        email: tokenPayload.email,
        id: tokenPayload.id,
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export type RequestAdminGuard = {
  user: {
    username: string;
    email: string;
    id: string;
  };
};
