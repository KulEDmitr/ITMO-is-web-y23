import { Module } from '@nestjs/common';
import { CategoryPictureController } from './categoryPicture.controller';
import { CategoryPictureService } from './categoryPicture.service';

@Module({
  controllers: [CategoryPictureController],
  providers: [CategoryPictureService],
})
export class CategoryPictureModule {}
