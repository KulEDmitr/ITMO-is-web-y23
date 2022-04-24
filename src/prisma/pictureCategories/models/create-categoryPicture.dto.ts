import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryPictureDto {
  @ApiProperty({
    description: 'The name of the picture category',
    example: 'minimalism',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Array of pictures belong to the category',
    example: [1],
  })
  pictures: number[];
}
