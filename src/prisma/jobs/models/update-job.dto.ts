import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @ApiPropertyOptional({
    description: 'The job position name',
    example: 'dream position',
  })
  @IsOptional()
  @IsString()
  position: string;

  @ApiPropertyOptional({
    description: 'The job place name',
    example: 'dream place',
  })
  @IsOptional()
  @IsString()
  place: string;

  @ApiPropertyOptional({
    description: 'The description of the job requirements',
    example: 'I wrote a short template of soup opera stories here',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    description: 'The last working day on job',
    example: Date.now().toString(),
  })
  @IsOptional()
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({
    description:
      'Field, that described is the job available for all users or not',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;
}
