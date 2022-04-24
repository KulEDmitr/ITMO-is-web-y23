import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Picture } from '@prisma/client';

export class PictureEntity implements Picture {
  @ApiProperty({
    description: 'The unique identifier of the picture',
    example: 1,
  })
  id: number;

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

  @ApiProperty({
    description: 'The id of owner of the Picture',
    example: 1,
  })
  ownerId: number;

  @ApiPropertyOptional({
    description: 'Array of categories belong to the picture',
    example: [1],
  })
  categories: number[];

  constructor(partial: Partial<PictureEntity>) {
    Object.assign(this, partial);
  }
}
