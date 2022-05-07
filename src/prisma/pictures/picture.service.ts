import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Picture, Prisma, User } from '@prisma/client';
import { CreatePictureDto } from './models/create-picture.dto';
import { UpdatePictureDto } from './models/update-picture.dto';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class PictureService {
  constructor(private prisma: PrismaService) {}

  async findPictureById(id: number): Promise<Picture | null> {
    return this.picture({ id: id });
  }

  async picture(
    pictureWhereUniqueInput: Prisma.PictureWhereUniqueInput,
  ): Promise<Picture | null> {
    return this.prisma.picture.findUnique({
      where: pictureWhereUniqueInput,
    });
  }

  async pictures(): Promise<Picture[] | null> {
    return this.prisma.picture.findMany();
  }

  async createPicture(data: CreatePictureDto): Promise<Picture | null> {
    const exist_cat = await this.checkCategories(data.categories);
    if (data.ownerId != undefined) {
      await this.checkUser({ id: data.ownerId });
    }

    return this.prisma.picture.create({
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        owner: {
          connect: { id: data.ownerId },
        },
        categories: {
          create: exist_cat?.map((cat) => ({
            category: {
              connect: { id: cat },
            },
          })),
        },
      },
    });
  }

  async updatePictureById(
    id: number,
    data: UpdatePictureDto,
  ): Promise<Picture | null> {
    return this.updatePicture({ id: id }, data);
  }

  async updatePicture(
    where: Prisma.PictureWhereUniqueInput,
    data: UpdatePictureDto,
  ): Promise<Picture | null> {
    const exist_cat = await this.checkCategories(data.categories);
    await this.checkPicture(where);

    return this.prisma.picture.update({
      where,
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        categories: {
          create: exist_cat?.map((cat) => ({
            category: {
              connect: { id: cat },
            },
          })),
        },
      },
    });
  }

  async deletePictureById(id: number): Promise<Picture | null> {
    return this.deletePicture({ id: id });
  }

  async deletePicture(
    where: Prisma.PictureWhereUniqueInput,
  ): Promise<Picture | null> {
    return this.prisma.picture.delete({
      where,
    });
  }

  private async checkCategories(
    categories?: number[],
  ): Promise<number[] | null> {
    if (categories == undefined) {
      return categories;
    }
    const exist_cats = categories?.filter(
      (cat) =>
        this.prisma.pictureCategory.findUnique({ where: { id: cat } }) != null,
    );
    return exist_cats.length == 0 ? undefined : exist_cats;
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

  private async checkPicture(where: Prisma.PictureWhereUniqueInput) {
    const pic: Picture | null = await this.prisma.picture.findUnique({
      where,
    });
    if (pic == null) {
      throw new NotFoundException('Picture with given data does not exist');
    }
  }
}
