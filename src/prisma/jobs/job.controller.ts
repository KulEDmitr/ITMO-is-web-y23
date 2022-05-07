import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseFilters,
  Res,
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
  ApiExcludeEndpoint,
} from '@nestjs/swagger';

import { JobService } from './job.service';

import { CreateJobDto } from './models/create-job.dto';
import { UpdateJobDto } from './models/update-job.dto';
import { JobEntity } from './models/job.entity';
import { RecordExistedFilter } from '../../filters/record-existed.filter';

@ApiTags('jobs')
@Controller()
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
  @UseFilters(RecordExistedFilter)
  @Post('jobs')
  async createJobPlace(@Body() data: CreateJobDto): Promise<JobEntity> {
    return new JobEntity(await this.jobService.createJob(data));
  }

  @ApiOperation({ summary: 'Get job place by id' })
  @ApiOkResponse({
    type: JobEntity,
    description: 'Job place found',
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
  @Get('jobs/:id')
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
  @ApiNotFoundResponse({ description: 'Job places not found' })
  @Get('jobs')
  async getJobs() {
    const jobs = await this.jobService.jobs();
    return jobs.map((job) => new JobEntity(job));
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
  @ApiNotFoundResponse({ description: 'Job place not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of job that need to be edited',
    example: 1,
  })
  @UseFilters(RecordExistedFilter)
  @Put('jobs/:id')
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
  @ApiNotFoundResponse({ description: 'Job place not found' })
  @Delete('jobs/:id')
  async deleteJobPlaceById(@Param('id') id: number): Promise<JobEntity> {
    return new JobEntity(await this.jobService.deleteJobById(id));
  }

  @ApiExcludeEndpoint()
  @Get()
  async getNJobs(@Res() res) {
    const jobs = await this.jobService.getMainJobs(3);
    res.render('pages/index1', {
      jobPlace: jobs.map((job) => new JobEntity(job)),
    });
  }
}
