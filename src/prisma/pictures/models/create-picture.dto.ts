import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryPicture as CategoryPictureModel } from '@prisma/client';

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

  @ApiProperty({
    description: 'The id of owner of the Picture',
    example: 1,
  })
  ownerId: number;
}
