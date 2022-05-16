import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, IsUUID } from 'class-validator';

export class CreatePictureDto {
  @ApiProperty({
    description: 'The title of the Picture',
    example: 'my first picture',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The url to the Picture location',
    example: 'public/images/gallery/1.jpg',
  })
  @IsNotEmpty()
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

  @ApiProperty({
    description: 'The id of owner of the Picture',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  ownerId: string;
}
