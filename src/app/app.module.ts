import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PictureModule } from 'src/prisma/pictures/picture.module';
import { PostModule } from 'src/prisma/posts/post.module';
import { UserModule } from 'src/prisma/users/user.module';
import { CategoryPictureModule } from '../prisma/pictureCategories/categoryPicture.module';
import { CategoryPostModule } from '../prisma/postCategories/categoryPost.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PostsModule } from '../posts/posts.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    PostModule,
    PictureModule,
    CategoryPictureModule,
    CategoryPostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
