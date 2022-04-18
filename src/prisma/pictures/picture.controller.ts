import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { Picture as PictureModel } from '@prisma/client';

@Controller()
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get('picture/:id')
  async getPictureById(@Param('id') id: string): Promise<PictureModel> {
    return this.pictureService.picture({ id: Number(id) });
  }

  @Get('gallery')
  async getPictures(@Body() ownerId: string): Promise<PictureModel[]> {
    return this.pictureService.pictures({
      where: {
        ownerId: {
          equals: Number(ownerId),
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  @Post('picture')
  async createPicture(
    @Body()
    pictureData: {
      title: string;
      image: string;
      description?: string;
      ownerId?: string;
    },
  ): Promise<PictureModel> {
    const { title, image, description, ownerId } = pictureData;
    return this.pictureService.createPicture({
      title,
      image,
      description,
      owner: {
        connect: { id: Number(ownerId) },
      },
    });
  }

  @Put('gallery/edit/:id')
  async editPicture(
    @Param('id') id: string,
    @Body()
    pictureData: {
      title?: string;
      image: string;
      description?: string;
    },
  ): Promise<PictureModel> {
    const { title, image, description } = pictureData;
    return this.pictureService.updatePicture({
      where: { id: Number(id) },
      data: {
        title: title,
        image: image,
        description: description,
      },
    });
  }

  @Delete('picture/:id')
  async deletePicture(@Param('id') id: string): Promise<PictureModel> {
    return this.pictureService.deletePicture({ id: Number(id) });
  }
}
