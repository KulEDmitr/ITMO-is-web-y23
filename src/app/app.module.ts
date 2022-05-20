import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PictureModule } from '../prisma/pictures/picture.module';
import { PostModule } from '../prisma/posts/post.module';
import { UserModule } from '../prisma/users/user.module';
import { CategoryPictureModule } from '../prisma/pictureCategories/categoryPicture.module';
import { CategoryPostModule } from '../prisma/postCategories/categoryPost.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JobModule } from '../prisma/jobs/job.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    UserModule,
    PostModule,
    JobModule,
    PictureModule,
    CategoryPictureModule,
    CategoryPostModule,
    AuthModule.forRoot({
      connectionURI: process.env.CONNECTION_URI,
      apiKey: process.env.API_KEY,
      appInfo: {
        appName: process.env.APP_NAME,
        apiDomain: process.env.APP_DOMAIN,
        websiteDomain: process.env.WEBSITE_DOMAIN,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
