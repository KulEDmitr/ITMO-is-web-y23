import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CategoryPost } from '@prisma/client';

export class CategoryPostEntity implements CategoryPost {
  @ApiProperty({
    description: 'The unique identifier of the post category',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the post category',
    example: 'diary',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Array of posts belong to the category',
    example: [1],
  })
  posts: number[];

  constructor(partial: Partial<CategoryPostEntity>) {
    Object.assign(this, partial);
  }
}
