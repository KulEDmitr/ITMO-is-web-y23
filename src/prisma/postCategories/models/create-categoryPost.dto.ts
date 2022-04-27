import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryPostDto {
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
}
