import { Injectable } from '@nestjs/common';
import { CategoryPost } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CategoryPicture, Prisma } from '@prisma/client';

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
    data: Prisma.CategoryPostCreateInput,
  ): Promise<CategoryPicture> {
    return this.prisma.categoryPost.create({
      data,
    });
  }

  async getPictures(
    categoryPictureWhereUniqueInput: Prisma.CategoryPictureWhereUniqueInput,
    categoryPictureInclude?: Prisma.CategoryPictureInclude,
  ): Promise<CategoryPost> {
    return this.prisma.categoryPicture.findUnique({
      where: categoryPictureWhereUniqueInput,
      include: categoryPictureInclude,
    });
  }
}
