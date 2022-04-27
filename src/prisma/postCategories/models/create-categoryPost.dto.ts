import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCategoryPostDto {
  @ApiProperty({
    description: 'The name of the post category',
    example: 'diary',
  })
  @MinLength(5)
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Array of posts belong to the category',
    example: [1],
  })
  @IsOptional()
  @IsArray()
  posts: number[];
}
