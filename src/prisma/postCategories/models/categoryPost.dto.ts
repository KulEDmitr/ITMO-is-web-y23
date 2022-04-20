import { ApiProperty } from '@nestjs/swagger';

export class CategoryPostDto {
  @ApiProperty({
    description: 'The name of the post category',
    example: 'diary',
  })
  name: string;
}
