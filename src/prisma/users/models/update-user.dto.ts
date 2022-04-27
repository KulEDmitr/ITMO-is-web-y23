import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'The email of the User',
    example: 'JaneDoe@google.com',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'The name of the User',
    example: 'Jane Doe',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description:
      'The unique login of the User. Length should be from 5 to 20 characters',
    example: 'JaneDoe',
  })
  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  login: string;

  @ApiPropertyOptional({
    description:
      'The password of the User. Should be longer or equal than 8 characters',
    example: 'jkljlfu7lk86',
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password: string;
}
