import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreatePictureDto {
  @ApiProperty({
    description: 'The title of the Picture',
    example: 'my first picture',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The url to the Picture location',
    example: 'public/images/gallery/1.jpg',
  })
  @IsNotEmpty()
  image: string;

  @ApiPropertyOptional({
    description: 'The description of the Picture',
    example: 'This is a short template of picture description',
  })
  description: string;

  @ApiProperty({
    description: 'The id of owner of the Picture',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumberString()
  ownerId: number;
}
