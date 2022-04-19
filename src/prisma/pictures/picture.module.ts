import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';

@Module({
  controllers: [PictureController],
  providers: [PictureService, PrismaService],
})
export class PictureModule {}
