import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the User',
    example: 'JaneDoe@google.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    description: 'The name of the User',
    example: 'Jane Doe',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The unique login of the User. Length should be from 5 to 20 characters',
    example: 'JaneDoe',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  login: string;

  @ApiProperty({
    description: 'The password of the User. Should be longer or equal than 8 characters',
    example: 'jkljlfu7lk86',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
