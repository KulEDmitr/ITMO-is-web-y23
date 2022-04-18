import { Post, Controller, Body, Param, Get } from '@nestjs/common';
import { CategoryPost as CategoryPostModel } from '@prisma/client';
import { CategoryPostService } from './categoryPost.service';

@Controller()
export class CategoryPostController {
  constructor(private readonly categoryPostService: CategoryPostService) {}

  @Post('posts_category')
  async createCategory(@Body() name: string): Promise<CategoryPostModel> {
    return this.categoryPostService.createCategoryPost({
      name,
    });
  }

  @Get('posts/:categoryId')
  async getPostsByCategory(
    @Param('categoryId') id: string,
    @Body() published?: boolean,
  ): Promise<CategoryPostModel> {
    return this.categoryPostService.getPosts(
      {
        id: Number(id),
      },
      {
        posts: {
          where: {
            published: published,
          },
        },
      },
    );
  }
}
