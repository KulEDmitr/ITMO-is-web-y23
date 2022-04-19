import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryPostController } from './categoryPost.controller';
import { CategoryPostService } from './categoryPost.service';

@Module({
  controllers: [CategoryPostController],
  providers: [CategoryPostService, PrismaService],
})
export class CategoryPostModule {}
