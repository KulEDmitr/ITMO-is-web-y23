import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryPicture, Prisma } from '@prisma/client';
import { CategoryPictureDto } from './models/categoryPicture.dto';

@Injectable()
export class CategoryPictureService {
  constructor(private prisma: PrismaService) {}

  async categoryPicture(
    categoryPictureWhereUniqueInput: Prisma.CategoryPictureWhereUniqueInput,
  ): Promise<CategoryPicture | null> {
    return this.prisma.categoryPicture.findUnique({
      where: categoryPictureWhereUniqueInput,
    });
  }

  async createCategoryPicture(
    data: CategoryPictureDto,
  ): Promise<CategoryPicture> {
    return this.prisma.categoryPicture.create({
      data: {
        name: data.name,
      },
    });
  }

  async getPictures(
    categoryPictureWhereUniqueInput: Prisma.CategoryPictureWhereUniqueInput,
    categoryPictureInclude?: Prisma.CategoryPictureInclude,
  ): Promise<CategoryPicture> {
    return this.prisma.categoryPicture.findUnique({
      where: categoryPictureWhereUniqueInput,
      include: categoryPictureInclude,
    });
  }
}
