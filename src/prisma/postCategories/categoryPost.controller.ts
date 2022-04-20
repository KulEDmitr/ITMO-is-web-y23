import { Post, Controller, Body, Param, Get, Query } from '@nestjs/common';
import {
  ApiParam,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { CategoryPost as CategoryPostModel } from '@prisma/client';
import { CategoryPostService } from './categoryPost.service';
import { CategoryPostDto } from './models/categoryPost.dto';

@ApiTags('postCategories')
@Controller()
export class CategoryPostController {
  constructor(private readonly categoryPostService: CategoryPostService) {}

  @ApiOperation({ summary: 'Create post category with given parameters' })
  @ApiOkResponse({ description: 'Category created' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Post('posts_category')
  async createCategory(
    @Body() data: CategoryPostDto,
  ): Promise<CategoryPostModel> {
    return this.categoryPostService.createCategoryPost(data);
  }

  @ApiOperation({ summary: 'Get posts by category using given parameters' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description:
      'Id of posts category that need to be found with all posts in it',
    example: '1',
  })
  @ApiQuery({
    name: 'published',
    type: 'boolean',
    description: 'Flag, which used for filter posts by it published state',
    example: true,
  })
  @ApiOkResponse({ description: 'Category found' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @Get('posts/:categoryId')
  async getPostsByCategory(
    @Param('categoryId') categoryId: string,
    @Query() published?: boolean,
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
