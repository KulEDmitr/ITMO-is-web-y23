import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiPropertyOptional({ example: 'my edited draft' })
  title: string;

  @ApiPropertyOptional({
    default: '',
    example: 'This is an edited short template of draft',
  })
  content: string;

  @ApiPropertyOptional({
    description: 'Array of categories belong to the post',
    example: [1],
  })
  categories: number[];

  @ApiPropertyOptional({ default: false, example: true })
  published: boolean;
}
