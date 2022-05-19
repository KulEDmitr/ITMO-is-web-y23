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
      connectionURI: new ConfigService().get('CONNECTION_URI'),
      apiKey: new ConfigService().get('API_KEY'),
      appInfo: {
        appName: new ConfigService().get('APP_NAME'),
        apiDomain: new ConfigService().get('APP_DOMAIN'),
        websiteDomain: new ConfigService().get('WEBSITE_DOMAIN'),
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
