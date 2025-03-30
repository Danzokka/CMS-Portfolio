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

@Module({
  imports: [ProjectModule, UserModule, PostModule],
  controllers: [AppController, PostController],
  providers: [AppService, ProjectService, UserService, PostService],
})
export class AppModule {}
