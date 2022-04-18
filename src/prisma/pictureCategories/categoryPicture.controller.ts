import { Post, Controller, Body, Param, Get } from '@nestjs/common';
import { CategoryPicture as CategoryPictureModel } from '@prisma/client';
import { CategoryPictureService } from './categoryPicture.service';

@Controller()
export class CategoryPictureController {
  constructor(
    private readonly categoryPictureService: CategoryPictureService,
  ) {}

  @Post('pictures_category')
  async createCategory(@Body() name: string): Promise<CategoryPictureModel> {
    return this.categoryPictureService.createCategoryPicture({
      name,
    });
  }

  @Get('pictures/:categoryId')
  async getPicturesByCategory(
    @Param('categoryId') id: string,
    @Body() ownerId?: string,
  ): Promise<CategoryPictureModel> {
    return this.categoryPictureService.getPictures(
      {
        id: Number(id),
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
