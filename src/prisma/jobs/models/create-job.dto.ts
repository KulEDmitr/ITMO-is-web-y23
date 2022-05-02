import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean, IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateJobDto {
  @ApiProperty({
    description: 'The job position name',
    example: 'dream position',
  })
  @IsNotEmpty()
  @IsString()
  position: string;

  @ApiProperty({
    description: 'The job place name',
    example: 'dream place',
  })
  @IsNotEmpty()
  @IsString()
  place: string;

  @ApiPropertyOptional({
    description: 'The description of the job requirements',
    example: 'I wrote a short template of soup opera stories here',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The first working day on job',
    default: Date.now(),
    example: Date.now(),
  })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @ApiPropertyOptional({
    description: 'The last working day on job',
    example: Date.now(),
  })
  @IsOptional()
  @IsDate()
  endDate: Date;

  @ApiPropertyOptional({
    description:
      'Field, that described is the job available for all users or not',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @ApiProperty({
    description: 'The id of worker',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty()
  @IsUUID()
  workerId: string;
}
