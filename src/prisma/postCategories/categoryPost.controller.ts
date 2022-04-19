import { Post, Controller, Body, Param, Get } from '@nestjs/common';
import { ApiParam, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryPost as CategoryPostModel } from '@prisma/client';
import { CategoryPostService } from './categoryPost.service';

@ApiTags('postCategories')
@Controller()
export class CategoryPostController {
  constructor(private readonly categoryPostService: CategoryPostService) {}

  @ApiOperation({ summary: 'Create post category with given parameters' })
  @Post('posts_category')
  async createCategory(@Body() name: string): Promise<CategoryPostModel> {
    return this.categoryPostService.createCategoryPost({
      name,
    });
  }

  @ApiOperation({ summary: 'Get posts by category using given parameters' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description:
      'Id of posts category that need to be found with all posts in it',
    example: '1',
  })
  @Get('posts/:categoryId')
  async getPostsByCategory(
    @Param('categoryId') categoryId: string,
    @Body() published?: boolean,
  ): Promise<CategoryPostModel> {
    return this.categoryPostService.getPosts(
      {
        id: Number(categoryId),
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
