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
}
