import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryPictureController } from './categoryPicture.controller';
import { CategoryPictureService } from './categoryPicture.service';

@Module({
  controllers: [CategoryPictureController],
  providers: [CategoryPictureService, PrismaService],
})
export class CategoryPictureModule {}
