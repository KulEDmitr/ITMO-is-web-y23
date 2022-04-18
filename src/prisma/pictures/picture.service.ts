import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Picture, Prisma } from '@prisma/client';

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

  async createPicture(data: Prisma.PictureCreateInput): Promise<Picture> {
    return this.prisma.picture.create({
      data,
    });
  }

  async updatePicture(params: {
    where: Prisma.PictureWhereUniqueInput;
    data: Prisma.PictureUpdateInput;
  }): Promise<Picture> {
    const { data, where } = params;
    return this.prisma.picture.update({
      data,
      where,
    });
  }

  async deletePicture(where: Prisma.PictureWhereUniqueInput): Promise<Picture> {
    return this.prisma.picture.delete({
      where,
    });
  }
}
