import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumberString, IsPositive, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the Post',
    example: 'my first draft',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'The content of the Post',
    example: 'This is a short template of draft',
  })
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description:
      'Field, that described is the post available for all users or not',
    default: false,
  })
  @IsBoolean()
  published: boolean;

  @ApiPropertyOptional({
    description: 'Array of categories belong to the post',
    example: [1],
  })
  categories: number[];

  @ApiProperty({
    description: 'The id of author of the Post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  authorId: string;
}
