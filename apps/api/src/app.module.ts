import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectService } from './project/project.service';
import { ProjectModule } from './project/project.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PostService } from './post/post.service';
import { PostController } from './post/post.controller';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { ReviewModule } from './review/review.module';
import { ReviewService } from './review/review.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProjectModule,
    UserModule,
    PostModule,
    AuthModule,
    ReviewModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [AppController, PostController, UserController, AuthController],
  providers: [
    AppService,
    ProjectService,
    UserService,
    PostService,
    PrismaService,
    AuthService,
    ReviewService,
  ],
})
export class AppModule {}
