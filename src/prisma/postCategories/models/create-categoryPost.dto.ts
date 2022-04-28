import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional, IsPositive,
  IsString,
} from 'class-validator';

export class CreateCategoryPostDto {
  @ApiProperty({
    description: 'The name of the post category',
    example: 'diary',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Array of posts belong to the category',
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  posts: number[];
}
