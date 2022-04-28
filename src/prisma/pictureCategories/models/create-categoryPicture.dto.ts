import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional, IsPositive,
  IsString,
} from 'class-validator';

export class CreateCategoryPictureDto {
  @ApiProperty({
    description: 'The name of the picture category',
    example: 'minimalism',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Array of pictures belong to the category',
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  pictures: number[];
}
