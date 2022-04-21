import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the Post',
    example: 'my first draft',
  })
  @IsNotEmpty()
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
    example: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  authorId: number;
}
