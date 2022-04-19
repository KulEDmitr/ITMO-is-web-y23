import { Post, Controller, Body, Param, Get } from '@nestjs/common';
import {
  ApiParam,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CategoryPicture as CategoryPictureModel } from '@prisma/client';
import { CategoryPictureService } from './categoryPicture.service';
import { CreateCategoryPictureDto } from './models/create-categoryPicture.dto';

@ApiTags('pictureCategories')
@Controller()
export class CategoryPictureController {
  constructor(
    private readonly categoryPictureService: CategoryPictureService,
  ) {}

  @ApiOperation({ summary: 'Create picture category with given parameters' })
  @ApiOkResponse({ description: 'Category created' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Post('pictures_category')
  async createCategory(
    @Body() data: CreateCategoryPictureDto,
  ): Promise<CategoryPictureModel> {
    return this.categoryPictureService.createCategoryPicture(data);
  }

  @ApiOperation({ summary: 'Get pictures by category using given parameters' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description:
      'Id of pictures category that need to be found with pictures in it',
    example: '1',
  })
  @ApiOkResponse({ description: 'Category found' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Category not found' })
  @Get('pictures/:categoryId')
  async getPicturesByCategory(
    @Param('categoryId') categoryId: string,
    @Body() ownerId?: string,
  ): Promise<CategoryPictureModel> {
    return this.categoryPictureService.getPictures(
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
    );
  }
}
