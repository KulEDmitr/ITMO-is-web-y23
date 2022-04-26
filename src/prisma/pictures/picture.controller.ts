import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiParam,
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { PictureService } from './picture.service';

import { CreatePictureDto } from './models/create-picture.dto';
import { PictureEntity } from './models/picture.entity';
import { UpdatePictureDto } from './models/update-picture.dto';

@ApiTags('pictures')
@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @ApiOperation({ summary: 'Get picture by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of picture that need to be found',
    example: '1',
  })
  @ApiOkResponse({
    type: PictureEntity,
    description: 'Picture found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Picture not found' })
  @Get(':id')
  async getPictureById(@Param('id') id: string): Promise<PictureEntity> {
    return new PictureEntity(
      await this.pictureService.picture({ id: Number(id) }),
    );
  }

  @ApiOperation({ summary: 'Get pictures' })
  @ApiOkResponse({
    type: PictureEntity,
    isArray: true,
    description: 'Picture found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Pictures not found' })
  @Get()
  async getPictures(): Promise<PictureEntity[]> {
    const pictures = await this.pictureService.pictures();
    return pictures.map((picture) => new PictureEntity(picture));
  }

  @ApiOperation({ summary: 'Create picture with given parameters' })
  @ApiCreatedResponse({
    type: PictureEntity,
    description: 'Picture created',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Post()
  async createPicture(@Body() data: CreatePictureDto): Promise<PictureEntity> {
    return new PictureEntity(await this.pictureService.createPicture(data));
  }

  @ApiOperation({
    summary:
      'Edit fields for existing picture. All Body parameters are optional',
  })
  @ApiCreatedResponse({
    type: PictureEntity,
    description: 'Picture edited',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Picture not found' })
  @Put(':id')
  async editPicture(
    @Param('id') id: string,
    @Body() data: UpdatePictureDto,
  ): Promise<PictureEntity> {
    return new PictureEntity(
      await this.pictureService.updatePicture({ id: Number(id) }, data),
    );
  }

  @ApiOperation({ summary: 'Delete picture by id' })
  @ApiOkResponse({
    type: PictureEntity,
    description: 'Picture deleted',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Picture not found' })
  @Delete(':id')
  async deletePicture(@Param('id') id: string): Promise<PictureEntity> {
    return new PictureEntity(
      await this.pictureService.deletePicture({ id: Number(id) }),
    );
  }
}
