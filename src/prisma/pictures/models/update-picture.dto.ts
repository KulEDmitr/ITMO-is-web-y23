import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePictureDto } from './create-picture.dto';
import { IsArray, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdatePictureDto extends PartialType(CreatePictureDto) {
  @ApiPropertyOptional({
    description: 'The title of the Picture',
    example: 'my first picture',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'The url to the Picture location',
    example: 'public/images/gallery/1.jpg',
  })
  @IsOptional()
  @IsString()
  image: string;

  @ApiPropertyOptional({
    description: 'The description of the Picture',
    example: 'This is a short template of picture description',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'Array of categories belong to the picture',
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  categories: number[];
}
