import {
  ApiHideProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsArray, IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiPropertyOptional({ example: 'my edited draft' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    default: '',
    example: 'This is an edited short template of draft',
  })
  @IsOptional()
  @IsString()
  content: string;

  @ApiPropertyOptional({
    description: 'Array of categories belong to the post',
    example: [1],
  })
  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  categories: number[];

  @ApiPropertyOptional({ default: false, example: true })
  @IsOptional()
  @IsBoolean()
  published: boolean;

  //как его скрыть из апи?...
  @ApiHideProperty()
  @IsOptional()
  authorId: string;
}
