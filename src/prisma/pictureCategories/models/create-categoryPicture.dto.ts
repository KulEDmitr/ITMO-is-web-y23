import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryPictureDto {
  @ApiProperty({
    description: 'The name of the picture category',
    example: 'minimalism',
  })
  name: string;
}
