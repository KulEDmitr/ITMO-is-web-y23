import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The email of the User',
    example: 'JaneDoe@google.com',
  })
  email: string;

  @ApiPropertyOptional({
    description: 'The name of the User',
    example: 'Jane Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The unique login of the User',
    example: 'JaneDoe',
  })
  login: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'jkljlfu7lk86',
  })
  password: string;
}
