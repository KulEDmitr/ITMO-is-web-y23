import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
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

  @ApiPropertyOptional({
    description: 'Array of categories belong to the post',
    example: [1],
  })
  categories: number[];

  @ApiProperty({
    description: 'The id of author of the Post',
    example: 1,
  })
  authorId: number;
}
