import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Picture, Prisma } from '@prisma/client';
import { CreatePictureDto } from './models/create-picture.dto';
import { CategoryPictureDto } from '../pictureCategories/models/categoryPicture.dto';
import { UpdatePictureDto } from './models/update-picture.dto';

@Injectable()
export class PictureService {
  constructor(private prisma: PrismaService) {}

  async picture(
    pictureWhereUniqueInput: Prisma.PictureWhereUniqueInput,
  ): Promise<Picture | null> {
    return this.prisma.picture.findUnique({
      where: pictureWhereUniqueInput,
    });
  }

  async pictures(params: {
    where?: Prisma.PictureWhereInput;
    orderBy?: Prisma.PictureOrderByWithRelationInput;
  }): Promise<Picture[]> {
    const { where, orderBy } = params;
    return this.prisma.picture.findMany({ where, orderBy });
  }

  async createPicture(
    data: CreatePictureDto,
  ): Promise<Picture> {
    return this.prisma.picture.create({
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        owner: {
          connect: { id: Number(data.ownerId) },
        },
        // categories: {
        //   connect: [...categories],
        // },
      },
    });
  }

  async updatePicture(params: {
    where: Prisma.PictureWhereUniqueInput;
    data: UpdatePictureDto;
  }): Promise<Picture> {
    const { data, where } = params;
    return this.prisma.picture.update({
      where,
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        // categories: {
        //   connect: [...categories],
        // },
      },
    });
  }

  async deletePicture(where: Prisma.PictureWhereUniqueInput): Promise<Picture> {
    return this.prisma.picture.delete({
      where,
    });
  }
}
