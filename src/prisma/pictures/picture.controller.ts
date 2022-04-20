import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiParam,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  Picture as PictureModel,

} from '@prisma/client';
import { PictureService } from './picture.service';
import { CreatePictureDto } from './models/create-picture.dto';

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
  @ApiOkResponse({ description: 'Picture found' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Picture not found' })
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
  @ApiOkResponse({ description: 'Pictures found' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Pictures not found' })
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
  @ApiOkResponse({ description: 'Picture created' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Post('picture/create')
  async createPicture(
    @Body() data: CreatePictureDto,
  ): Promise<PictureModel> {
    return this.pictureService.createPicture(data);
  }

  @ApiOperation({
    summary:
      'Edit fields for existing picture. All Body parameters are optional',
  })
  @ApiOkResponse({ description: 'Picture edited' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Picture not found' })
  @Put('picture/:id/edit')
  async editPicture(
    @Param('id') id: string,
    @Body() data: CreatePictureDto,
  ): Promise<PictureModel> {
    return this.pictureService.updatePicture({
      where: { id: Number(id) },
      data,
    });
  }

  @ApiOperation({ summary: 'Delete picture by id' })
  @ApiOkResponse({ description: 'Picture deleted' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Picture not found' })
  @Delete('picture/:id/delete')
  async deletePicture(@Param('id') id: string): Promise<PictureModel> {
    return this.pictureService.deletePicture({ id: Number(id) });
  }
}
