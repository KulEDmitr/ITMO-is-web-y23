import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseFilters,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';

import { JobEntity } from '../jobs/models/job.entity';
import { UserEntity } from './models/user.entity';
import { PictureEntity } from '../pictures/models/picture.entity';
import { PostEntity } from '../posts/models/post.entity';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';

import { UniqueConstrainedViolationFilter } from '../../filters/unique-constrained-violation.filter';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'User created',
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
  async signupUser(@Body() userData: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.userService.createUser(userData));
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({
    type: UserEntity,
    description: 'User found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of user that need to be found',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return new UserEntity(await this.userService.getUserById(id));
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: UserEntity,
    isArray: true,
    description: 'User found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get()
  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userService.users();
    return users.map((user) => new UserEntity(user));
  }

  @ApiOperation({
    summary: 'Get all pictures with ownerId equal to given user id',
  })
  @ApiParam({
    name: 'ownerId',
    type: 'string',
    description: 'Id of user whose pictures need to be found',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({ description: 'Pictures found' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Pictures not found' })
  @Get(':ownerId/gallery')
  async getPictures(
    @Param('ownerId') ownerId: string,
  ): Promise<PictureEntity[]> {
    const pictures = await this.userService.getPictureByOwner(ownerId);
    return pictures.map((picture) => new PictureEntity(picture));
  }

  @ApiOperation({
    summary: 'Get all posts with authorId equal to given user id',
  })
  @ApiOkResponse({ description: 'Posts found' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Posts not found' })
  @ApiParam({
    name: 'authorId',
    type: 'string',
    description: 'User id of posts author for searching',
    example: '1',
  })
  @Get(':authorId/feed')
  async getFeed(@Param('authorId') authorId: string): Promise<PostEntity[]> {
    const posts = await this.userService.getPublishedPostsByAuthorId(authorId);
    return posts.map((post) => new PostEntity(post));
  }

  @ApiOperation({
    summary: 'Get all unpublished posts with authorId equal to given user id ',
  })
  @ApiOkResponse({ description: 'Posts found' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Posts not found' })
  @ApiParam({
    name: 'authorId',
    type: 'string',
    description: 'User id of posts author for searching',
    example: '1',
  })
  @Get(':authorId/drafts')
  async getDrafts(@Param('authorId') authorId: string): Promise<PostEntity[]> {
    const posts = await this.userService.getUnpublishedPostsByAuthorId(
      authorId,
    );
    return posts.map((post) => new PostEntity(post));
  }

  @ApiOperation({
    summary: 'Get all job places with workerId equal to given user id',
  })
  @ApiParam({
    name: 'workerId',
    type: 'string',
    description: 'Id of user whose job places need to be found',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiOkResponse({ description: 'Job places found' })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Job places not found' })
  @Get(':workerId/jobs')
  async getJobs(@Param('workerId') workerId: string): Promise<JobEntity[]> {
    const jobs = await this.userService.getJobsByWorkerId(workerId);
    return jobs.map((job) => new JobEntity(job));
  }

  @ApiOperation({
    summary: 'Edit data for existing user. All Body parameters are optional',
  })
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'User edited',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of user that need to be edited',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Put(':id')
  async editUserById(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(await this.userService.updateUserById(id, data));
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of user that need to be deleted',
    example: 1,
  })
  @ApiOkResponse({
    type: UserEntity,
    description: 'User deleted',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserEntity> {
    return new UserEntity(await this.userService.deleteUserById(id));
  }
}
