import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { JobPlace } from '@prisma/client';

export class JobEntity implements JobPlace {
  @ApiProperty({
    description: 'The unique identifier of the job place',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The job position name',
    example: 'dream position',
  })
  position: string;

  @ApiProperty({
    description: 'The job place name',
    example: 'dream place',
  })
  place: string;

  @ApiPropertyOptional({
    description: 'The description of the job requirements',
    example: 'I wrote a short template of soup opera stories here',
  })
  description: string;

  @ApiProperty({
    description: 'The first working day on job',
    example: '',
  })
  startDate: string;

  @ApiPropertyOptional({
    description: 'The last working day on job',
    example: '',
  })
  endDate: string;

  @ApiPropertyOptional({
    description:
      'Field, that described is the job available for all users or not',
    default: false,
  })
  hidden: boolean;

  @ApiProperty({
    description: 'The id of worker',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  workerId: string;

  constructor(partial: Partial<JobEntity>) {
    Object.assign(this, partial);
  }
}
