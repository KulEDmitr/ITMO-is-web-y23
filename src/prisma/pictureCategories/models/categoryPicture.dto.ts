import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryPictureDto {
  @ApiProperty({
    description: 'The name of the picture category',
    example: 'minimalism',
  })
  @IsNotEmpty()
  name: string;
}
