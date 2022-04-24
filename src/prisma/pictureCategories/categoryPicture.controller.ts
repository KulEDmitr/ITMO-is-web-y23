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
import { CategoryPictureService } from './categoryPicture.service';

import { CreateCategoryPictureDto } from './models/create-categoryPicture.dto';
import { CategoryPictureEntity } from './models/categoryPicture.entity';

@ApiTags('pictureCategories')
@Controller()
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
  @Post('picture-categories')
  async createCategory(
    @Body() data: CreateCategoryPictureDto,
  ): Promise<CategoryPictureEntity> {
    return new CategoryPictureEntity(
      await this.categoryPictureService.createCategoryPicture(data),
    );
  }

  @ApiOperation({ summary: 'Get pictures by category using given parameters' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description:
      'Id of pictures category that need to be found with pictures in it',
    example: 1,
  })
  @ApiQuery({
    name: 'ownerId',
    type: 'string',
    description: 'User id which used for filter posts by its owner',
    example: 1,
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
  @Get('picture-categories/:categoryId/pictures')
  async getPicturesByCategory(
    @Param('categoryId') categoryId: string,
    @Query() ownerId?: string,
  ): Promise<CategoryPictureEntity> {
    return new CategoryPictureEntity(
      await this.categoryPictureService.getPictures(
        {
          id: Number(categoryId),
        },
        {
          pictures: {
            where: {
              ownerId: Number(ownerId),
            },
          },
        },
      ),
    );
  }
}
