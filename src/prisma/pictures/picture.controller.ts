import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseFilters,
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
  ApiConflictResponse,
} from '@nestjs/swagger';

import { PictureService } from './picture.service';

import { CreatePictureDto } from './models/create-picture.dto';
import { PictureEntity } from './models/picture.entity';
import { UpdatePictureDto } from './models/update-picture.dto';

import { UniqueConstrainedViolationFilter } from '../../filters/unique-constrained-violation.filter';

@ApiTags('pictures')
@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @ApiOperation({ summary: 'Create picture with given parameters' })
  @ApiCreatedResponse({
    type: PictureEntity,
    description: 'Picture created',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiConflictResponse({
    description: 'Some of given parameters should be unique but they are not',
  })
  @UseFilters(UniqueConstrainedViolationFilter)
  @Post()
  async createPicture(@Body() data: CreatePictureDto): Promise<PictureEntity> {
    return new PictureEntity(await this.pictureService.createPicture(data));
  }

  @ApiOperation({ summary: 'Get picture by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of picture that need to be found',
    example: 1,
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
  async getPictureById(@Param('id') id: number): Promise<PictureEntity> {
    return new PictureEntity(await this.pictureService.findPictureById(id));
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
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of picture that need to be found',
    example: 1,
  })
  @Put(':id')
  async editPictureById(
    @Param('id') id: number,
    @Body() data: UpdatePictureDto,
  ): Promise<PictureEntity> {
    return new PictureEntity(
      await this.pictureService.updatePictureById(id, data),
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
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of picture that need to be found',
    example: 1,
  })
  @Delete(':id')
  async deletePictureById(@Param('id') id: number): Promise<PictureEntity> {
    return new PictureEntity(await this.pictureService.deletePictureById(id));
  }
}
