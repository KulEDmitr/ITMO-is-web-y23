import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiParam, ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Picture as PictureModel,
  CategoryPicture as CategoryPictureModel,
} from '@prisma/client';
import { PictureService } from './picture.service';

@ApiTags('pictures')
@Controller()
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @ApiOperation({ summary: 'Get picture by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of picture that need to be found',
    example: '1',
  })
  @Get('picture/:id')
  async getPictureById(@Param('id') id: string): Promise<PictureModel> {
    return this.pictureService.picture({ id: Number(id) });
  }

  @ApiOperation({
    summary: 'Get all pictures with ownerId equal to given user id',
  })
  @ApiParam({
    name: 'ownerId',
    type: 'string',
    description: 'Id of user whose pictures need to be found',
    example: '1',
  })
  @Get(':ownerId/gallery')
  async getPictures(@Param() ownerId: string): Promise<PictureModel[]> {
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

  @ApiOperation({ summary: 'Create picture with given parameters' })
  @Post('picture/create')
  async createPicture(
    @Body()
    pictureData: {
      title: string;
      image: string;
      description?: string;
      ownerId?: string;
      categories?: CategoryPictureModel[];
    },
  ): Promise<PictureModel> {
    const { title, image, description, ownerId, categories } = pictureData;
    return this.pictureService.createPicture({
      title,
      image,
      description,
      owner: {
        connect: { id: Number(ownerId) },
      },
      categories: {
        connect: [...categories],
      },
    });
  }

  @ApiOperation({
    summary:
      'Edit fields for existing picture. All Body parameters are optional',
  })
  @Put('picture/:id/edit')
  async editPicture(
    @Param('id') id: string,
    @Body()
    pictureData: {
      title?: string;
      image?: string;
      description?: string;
      categories?: CategoryPictureModel[];
    },
  ): Promise<PictureModel> {
    const { title, image, description, categories } = pictureData;
    return this.pictureService.updatePicture({
      where: { id: Number(id) },
      data: {
        title: title,
        image: image,
        description: description,
        categories: {
          connect: [...categories],
        },
      },
    });
  }

  @ApiOperation({ summary: 'Delete picture by id' })
  @Delete('picture/:id/delete')
  async deletePicture(@Param('id') id: string): Promise<PictureModel> {
    return this.pictureService.deletePicture({ id: Number(id) });
  }
}
