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

  @ApiProperty({
    description: 'The id of author of the Post',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  @IsPositive()
  authorId: number;
}
