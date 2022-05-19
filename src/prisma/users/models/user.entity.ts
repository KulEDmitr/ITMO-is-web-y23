import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({
    description: 'The unique identifier of the User',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'The unique identifier of the User in supertokens',
    example: 'fa7a0841-b533-4478-95533-0fde890c3483',
  })
  superTokenId: string;

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

  @ApiProperty({
    description: 'The unique login of the User',
    example: 'JaneDoe',
  })
  login: string;
}
