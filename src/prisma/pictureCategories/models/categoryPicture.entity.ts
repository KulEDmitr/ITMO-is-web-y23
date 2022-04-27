import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PictureCategory } from '@prisma/client';

export class CategoryPictureEntity implements PictureCategory {
  @ApiProperty({
    description: 'The unique identifier of the picture category',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the picture category',
    example: 'minimalism',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Array of pictures belong to the category',
    example: [1],
  })
  pictures: number[];

  constructor(partial: Partial<CategoryPictureEntity>) {
    Object.assign(this, partial);
  }
}
