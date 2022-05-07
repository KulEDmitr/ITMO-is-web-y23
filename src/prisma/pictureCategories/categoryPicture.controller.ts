import {
  Post,
  Controller,
  Body,
  Param,
  Get,
  Query,
  UseFilters,
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
} from '@nestjs/swagger';

import { CategoryPictureService } from './categoryPicture.service';

import { CreateCategoryPictureDto } from './models/create-categoryPicture.dto';
import { CategoryPictureEntity } from './models/categoryPicture.entity';
import { PictureEntity } from '../pictures/models/picture.entity';

import { RecordExistedFilter } from '../../filters/record-existed.filter';

@ApiTags('pictureCategories')
@Controller('picture-categories')
export class CategoryPictureController {
  constructor(
    private readonly categoryPictureService: CategoryPictureService,
  ) {}

  @ApiOperation({ summary: 'Create picture category with given parameters' })
  @ApiCreatedResponse({
    type: CategoryPictureEntity,
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
    @Body() data: CreateCategoryPictureDto,
  ): Promise<CategoryPictureEntity> {
    return new CategoryPictureEntity(
      await this.categoryPictureService.createCategoryPicture(data),
    );
  }

  @ApiOperation({ summary: 'Get all picture categories' })
  @ApiOkResponse({
    type: CategoryPictureEntity,
    isArray: true,
    description: 'Categories found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Pictures not found' })
  @Get()
  async getCategories(): Promise<CategoryPictureEntity[]> {
    const categories = await this.categoryPictureService.categories();
    return categories.map((category) => new CategoryPictureEntity(category));
  }

  @ApiOperation({ summary: 'Get pictures by category using given parameters' })
  @ApiParam({
    name: 'categoryId',
    type: 'number',
    description:
      'Id of pictures category that need to be found with pictures in it',
    example: 1,
  })
  @ApiQuery({
    required: false,
    name: 'ownerId',
    type: 'string',
    description: 'User id which used for filter pictures by its owner',
    example: '0e848a90-379a-4b50-a9f4-5b23e51140fd',
  })
  @ApiOkResponse({
    type: CategoryPictureEntity,
    description: 'Category found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @UseFilters(RecordExistedFilter)
  @Get(':categoryId/pictures')
  async getPicturesByCategoryId(
    @Param('categoryId') categoryId: number,
    @Query('ownerId') ownerId?: string,
  ): Promise<PictureEntity[]> {
    const pictures = await this.categoryPictureService.getPicturesByCategory(
      categoryId,
      ownerId,
    );
    return pictures.map((picture) => new PictureEntity(picture));
  }
}
