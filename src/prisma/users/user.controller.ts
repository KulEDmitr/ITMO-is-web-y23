import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';

import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';
import { UserEntity } from './models/user.entity';

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
    example: '1',
  })
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserEntity> {
    return new UserEntity(await this.userService.user({ id: id }));
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
    example: '1',
  })
  @Put(':id')
  async editUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(
      await this.userService.updateUser({
        where: { id: id },
        data,
      }),
    );
  }

  // @ApiOperation({
  //   summary: 'Get all pictures with ownerId equal to given user id',
  // })
  // @ApiParam({
  //   name: 'ownerId',
  //   type: 'string',
  //   description: 'Id of user whose pictures need to be found',
  //   example: '1',
  // })
  // @ApiOkResponse({ description: 'Pictures found' })
  // @ApiBadRequestResponse({
  //   description: 'The request could not be understood due to malformed syntax.',
  // })
  // @ApiForbiddenResponse({ description: 'Access denied' })
  // @ApiNotFoundResponse({ description: 'Pictures not found' })
  // @Get(':ownerId/gallery')
  // async getPictures(@Param() ownerId: string): Promise<PictureModel[]> {
  //   return this.pictureService.pictures({
  //     where: {
  //       ownerId: {
  //         equals: Number(ownerId),
  //       },
  //     },
  //     orderBy: {
  //       id: 'asc',
  //     },
  //   });
  // }
  //
  // @ApiOperation({
  //   summary: 'Get all posts with authorId equal to given user id',
  // })
  // @ApiOkResponse({ description: 'Posts found' })
  // @ApiBadRequestResponse({
  //   description: 'The request could not be understood due to malformed syntax.',
  // })
  // @ApiForbiddenResponse({ description: 'Access denied' })
  // @ApiNotFoundResponse({ description: 'Posts not found' })
  // @ApiParam({
  //   name: 'authorId',
  //   type: 'string',
  //   description: 'User id of posts author for searching',
  //   example: '1',
  // })
  // @Get(':authorId/feed')
  // async getFeed(@Param('authorId') authorId: string): Promise<PostModel[]> {
  //   return this.postService.posts({
  //     where: {
  //       authorId: {
  //         equals: Number(authorId),
  //       },
  //     },
  //     orderBy: {
  //       id: 'asc',
  //     },
  //   });
  // }
  //
  // @ApiOperation({
  //   summary: 'Get all unpublished posts with authorId equal to given user id ',
  // })
  // @ApiOkResponse({ description: 'Posts found' })
  // @ApiBadRequestResponse({
  //   description: 'The request could not be understood due to malformed syntax.',
  // })
  // @ApiForbiddenResponse({ description: 'Access denied' })
  // @ApiNotFoundResponse({ description: 'Posts not found' })
  // @ApiParam({
  //   name: 'authorId',
  //   type: 'string',
  //   description: 'User id of posts author for searching',
  //   example: '1',
  // })
  // @Get(':authorId/drafts')
  // async getDrafts(@Param('authorId') authorId: string): Promise<PostModel[]> {
  //   return this.postService.posts({
  //     where: {
  //       authorId: {
  //         equals: Number(authorId),
  //       },
  //     },
  //     orderBy: {
  //       id: 'asc',
  //     },
  //   });
  // }

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
    return new UserEntity(await this.userService.delete({ id: id }));
  }
}
