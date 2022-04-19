import { Post, Controller, Body, Param, Get } from '@nestjs/common';
import { ApiParam, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryPicture as CategoryPictureModel } from '@prisma/client';
import { CategoryPictureService } from './categoryPicture.service';

@ApiTags('pictureCategories')
@Controller()
export class CategoryPictureController {
  constructor(
    private readonly categoryPictureService: CategoryPictureService,
  ) {}

  @ApiOperation({ summary: 'Create picture category with given parameters' })
  @Post('pictures_category')
  async createCategory(@Body() name: string): Promise<CategoryPictureModel> {
    return this.categoryPictureService.createCategoryPicture({
      name,
    });
  }

  @ApiOperation({ summary: 'Get pictures by category using given parameters' })
  @ApiParam({
    name: 'categoryId',
    type: 'string',
    description:
      'Id of pictures category that need to be found with pictures in it',
    example: '1',
  })
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
