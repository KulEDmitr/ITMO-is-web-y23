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
    await this.checkUser({ id: ownerId });
    await this.checkCategory({ id: categoryId });

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
    await this.checkCategory({ name: data.name });
    const exist_pic = await this.checkPictures(data.pictures);

    return this.prisma.pictureCategory.create({
      data: {
        name: data.name,
        pictures: {
          create: exist_pic?.map((picture) => ({
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
    await this.checkUser({ id: pictureWhereInput.ownerId.toString() });

    return this.prisma.picture.findMany({
      where: pictureWhereInput,
    });
  }

  async categories(): Promise<PictureCategory[] | null> {
    return this.prisma.pictureCategory.findMany();
  }

  private async checkCategory(where: Prisma.PictureCategoryWhereUniqueInput) {
    const cat = await this.categoryPicture(where);
    if (cat != null) {
      throw new AlreadyExistException(
        'Category with data: "' + where + '" already exist in system',
      );
    }
  }

  private async checkUser(where: Prisma.UserWhereUniqueInput) {
    const user: User | null = await this.prisma.user.findUnique({
      where,
    });
    if (user == null) {
      throw new NotFoundException(
        'User with data: "' + where + '" does not exist',
      );
    }
  }

  private async checkPictures(pictures?: number[]): Promise<number[] | null> {
    const exist_pic = pictures?.filter(
      (pic) => this.prisma.picture.findUnique({ where: { id: pic } }) != null,
    );
    return exist_pic.length == 0 ? undefined : exist_pic;
  }
}
