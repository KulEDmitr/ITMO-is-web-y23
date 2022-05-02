import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseFilters,
} from '@nestjs/common';

import {
  ApiParam,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { JobService } from './job.service';

import { CreateJobDto } from './models/create-job.dto';
import { UpdateJobDto } from './models/update-job.dto';
import { JobEntity } from './models/job.entity';

import { UniqueConstrainedViolationFilter } from '../../filters/unique-constrained-violation.filter';

@ApiTags('jobs')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiOperation({ summary: 'Create job with given parameters' })
  @ApiCreatedResponse({
    type: JobEntity,
    description: 'Job place created',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiConflictResponse({
    description: 'Some of given parameters should be unique but they are not',
  })
  @UseFilters(UniqueConstrainedViolationFilter)
  @Post()
  async createJobPlace(@Body() data: CreateJobDto): Promise<JobEntity> {
    return new JobEntity(await this.jobService.createJob(data));
  }

  @ApiOperation({ summary: 'Get job place by id' })
  @ApiOkResponse({
    type: JobEntity,
    description: 'Post found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Job place not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of job place that need to be found',
    example: 1,
  })
  @Get(':id')
  async getJobById(@Param('id') id: number): Promise<JobEntity> {
    return new JobEntity(await this.jobService.findJobById(id));
  }

  @ApiOperation({
    summary: 'Get all jobs in system',
  })
  @ApiOkResponse({
    type: JobEntity,
    isArray: true,
    description: 'Jobs found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Posts not found' })
  @Get()
  async getJobs(): Promise<JobEntity[]> {
    const posts = await this.jobService.jobs();
    return posts.map((post) => new JobEntity(post));
  }

  @ApiOperation({
    summary:
      'Edit fields for existing jobPlace. All Body parameters are optional',
  })
  @ApiCreatedResponse({
    type: JobEntity,
    description: 'Job edited',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of job that need to be edited',
    example: 1,
  })
  @Put(':id')
  async editJobPlaceById(
    @Param('id') id: number,
    @Body() data: UpdateJobDto,
  ): Promise<JobEntity> {
    return new JobEntity(await this.jobService.updateJobById(id, data));
  }

  @ApiOperation({ summary: 'Delete job place by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of job place that need to be deleted',
    example: 1,
  })
  @ApiOkResponse({
    type: JobEntity,
    description: 'Job place deleted',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @Delete(':id')
  async deleteJobPlaceById(@Param('id') id: number): Promise<JobEntity> {
    return new JobEntity(await this.jobService.deleteJobById(id));
  }
}
