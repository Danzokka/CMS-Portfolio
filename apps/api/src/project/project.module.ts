import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, AuthService, UserService],
})
export class ProjectModule {}
