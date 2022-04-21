import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryPostDto {
  @ApiProperty({
    description: 'The name of the post category',
    example: 'diary',
  })
  @IsNotEmpty()
  name: string;
}
