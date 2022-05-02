import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Picture, Prisma } from '@prisma/client';
import { CreatePictureDto } from './models/create-picture.dto';
import { UpdatePictureDto } from './models/update-picture.dto';

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
    return this.prisma.picture.create({
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        owner: {
          connect: { id: data.ownerId },
        },
        categories: {
          create: data.categories?.map((cat) => ({
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
    return this.prisma.picture.update({
      where,
      data: {
        title: data.title,
        image: data.image,
        description: data.description,
        categories: {
          create: data.categories?.map((cat) => ({
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
}
