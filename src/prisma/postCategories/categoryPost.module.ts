import { Module } from '@nestjs/common';
import { CategoryPostController } from './categoryPost.controller';
import { CategoryPostService } from './categoryPost.service';

@Module({
  controllers: [CategoryPostController],
  providers: [CategoryPostService],
})
export class CategoryPostModule {}
