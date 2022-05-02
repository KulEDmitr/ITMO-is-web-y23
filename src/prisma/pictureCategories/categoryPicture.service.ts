import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Picture, PictureCategory, Prisma, User } from '@prisma/client';
import { CreateCategoryPictureDto } from './models/create-categoryPicture.dto';
import { AlreadyExistException } from '../../exceptions/already-exist.exception';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class CategoryPictureService {
  constructor(private prisma: PrismaService) {}

  async getPicturesByCategory(
    categoryId: number,
    ownerId: string,
  ): Promise<Picture[] | null> {
    return await this.getPictures({
      categories: {
        some: {
          catId: categoryId,
        },
      },
      ownerId: ownerId,
    });
  }

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
    const cat = await this.categoryPicture({ name: data.name });
    if (cat != null) {
      throw new AlreadyExistException(
        'Category with name: "' + data.name + '" already exist in system',
      );
    }

    return this.prisma.pictureCategory.create({
      data: {
        name: data.name,
        pictures: {
          create: data.pictures?.map((picture) => ({
            picture: {
              connect: { id: picture },
            },
          })),
        },
      },
    });
  }

  async getPictures(
    pictureWhereInput: Prisma.PictureWhereInput,
  ): Promise<Picture[] | null> {
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        id: pictureWhereInput.ownerId.toString(),
      },
    });
    if (user == null) {
      throw new NotFoundException(
        'User with id: "' + pictureWhereInput.ownerId + '" does not exist',
      );
    }

    return this.prisma.picture.findMany({
      where: pictureWhereInput,
    });
  }

  async categories(): Promise<PictureCategory[] | null> {
    return this.prisma.pictureCategory.findMany();
  }
}
