import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryPostDto {
  @ApiProperty({
    description: 'The name of the post category',
    example: 'diary',
  })
  name: string;
}
