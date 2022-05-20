import {
  Post,
  Controller,
  Body,
  Param,
  Get,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

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
  ApiConflictResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';

import { CategoryPostService } from './categoryPost.service';

import { CreateCategoryPostDto } from './models/create-categoryPost.dto';
import { CategoryPostEntity } from './models/categoryPost.entity';
import { PostEntity } from '../posts/models/post.entity';
import { RecordExistedFilter } from '../../filters/record-existed.filter';
import { AuthGuard } from '../../auth/auth.guard';

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
  @ApiConflictResponse({
    description: 'Some of given parameters should be unique but they are not',
  })
  @UseFilters(RecordExistedFilter)
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

  @ApiOperation({
    summary: 'Get published posts by category using given parameters',
  })
  @ApiParam({
    name: 'categoryId',
    type: 'number',
    description:
      'Id of posts category that need to be found with all posts in it',
    example: 1,
  })
  @ApiQuery({
    required: false,
    name: 'authorId',
    type: 'string',
    description: 'User id which used for filter posts by its owner',
    example: '0e848a90-379a-4b50-a9f4-5b23e51140fd',
  })
  @ApiQuery({
    required: false,
    name: 'published',
    type: 'boolean',
    description: 'flag for filter posts by its publicate state',
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
  @UseFilters(RecordExistedFilter)
  @ApiCookieAuth()
  @UseGuards(AuthGuard)
  @Get(':categoryId/posts')
  async getPostsByCategoryId(
    @Param('categoryId') categoryId: number,
    @Query('authorId') authorId?: string,
    @Query('published') published?: boolean,
  ): Promise<PostEntity[]> {
    const posts = await this.categoryPostService.getPostsByCategory(
      categoryId,
      published,
      authorId,
    );
    return posts.map((post) => new PostEntity(post));
  }
}
