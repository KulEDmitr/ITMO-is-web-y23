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
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CategoryPostService } from './categoryPost.service';

import { CreateCategoryPostDto } from './models/create-categoryPost.dto';
import { CategoryPostEntity } from './models/categoryPost.entity';

@ApiTags('postCategories')
@Controller('post-categories')
export class CategoryPostController {
  constructor(private readonly categoryPostService: CategoryPostService) {}

  @ApiOperation({ summary: 'Create post category with given parameters' })
  @ApiCreatedResponse({
    type: CategoryPostEntity,
    description: 'Category created',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Post()
  async createCategory(
    @Body() data: CreateCategoryPostDto,
  ): Promise<CategoryPostEntity> {
    return new CategoryPostEntity(
      await this.categoryPostService.createCategoryPost(data),
    );
  }

  @ApiOperation({ summary: 'Get all post categories' })
  @ApiOkResponse({
    type: CategoryPostEntity,
    isArray: true,
    description: 'Categories found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Pictures not found' })
  @Get()
  async getCategories(): Promise<CategoryPostEntity[]> {
    const categories = await this.categoryPostService.categories();
    return categories.map((category) => new CategoryPostEntity(category));
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
  @ApiOkResponse({
    type: CategoryPostEntity,
    description: 'Category found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @Get(':categoryId/posts')
  async getPostsByCategory(
    @Param('categoryId') categoryId: string,
    @Query() published?: boolean,
  ): Promise<CategoryPostEntity> {
    return new CategoryPostEntity(
      await this.categoryPostService.getPosts(
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
      ),
    );
  }
}
