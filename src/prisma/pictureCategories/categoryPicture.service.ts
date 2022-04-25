import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PictureCategory, Prisma } from '@prisma/client';
import { CreateCategoryPictureDto } from './models/create-categoryPicture.dto';

@Injectable()
export class CategoryPictureService {
  constructor(private prisma: PrismaService) {}

  async categoryPicture(
    categoryPictureWhereUniqueInput: Prisma.PictureCategoryWhereUniqueInput,
  ): Promise<PictureCategory | null> {
    return this.prisma.pictureCategory.findUnique({
      where: categoryPictureWhereUniqueInput,
    });
  }

  async createCategoryPicture(
    data: CreateCategoryPictureDto,
  ): Promise<PictureCategory | null> {
    return this.prisma.pictureCategory.create({
      data: {
        name: data.name,
      },
    });
  }

  async getPictures(
    categoryPictureWhereUniqueInput: Prisma.PictureCategoryWhereUniqueInput,
    categoryPictureInclude?: Prisma.PictureCategoryInclude,
  ): Promise<PictureCategory | null> {
    return this.prisma.pictureCategory.findUnique({
      where: categoryPictureWhereUniqueInput,
      include: categoryPictureInclude,
    });
  }

  async categories(): Promise<PictureCategory[] | null> {
    return this.prisma.pictureCategory.findMany();
  }
}
