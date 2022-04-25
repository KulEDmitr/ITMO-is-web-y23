import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePictureDto {
  @ApiProperty({
    description: 'The title of the Picture',
    example: 'my first picture',
  })
  title: string;

  @ApiProperty({
    description: 'The url to the Picture location',
    example: 'public/images/gallery/1.jpg',
  })
  image: string;

  @ApiPropertyOptional({
    description: 'The description of the Picture',
    example: 'This is a short template of picture description',
  })
  description: string;

  @ApiPropertyOptional({
    description: 'Array of categories belong to the picture',
    example: [1],
  })
  categories: number[];

  @ApiProperty({
    description: 'The id of owner of the Picture',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  ownerId: string;
}
