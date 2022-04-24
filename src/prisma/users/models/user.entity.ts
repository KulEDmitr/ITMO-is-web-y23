import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({
    description: 'The unique identifier of the User',
    example: 1,
  })
  id: number;

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

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
