import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Post } from '@prisma/client';

export class PostEntity implements Post {
  @ApiProperty({
    description: 'The unique identifier of the post',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The title of the Post',
    example: 'my first draft',
  })
  title: string;

  @ApiPropertyOptional({
    description: 'The content of the Post',
    example: 'This is a short template of draft',
  })
  content: string;

  @ApiPropertyOptional({
    description:
      'Field, that described is the post available for all users or not',
    default: false,
  })
  published: boolean;

  @ApiProperty({
    description: 'The id of author of the Post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  authorId: string;

  @ApiPropertyOptional({
    description: 'Array of categories belong to the post',
    example: [1],
  })
  categories: number[];

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
