import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';

@ApiTags('users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create new user' })
  @Post('user')
  async signupUser(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of user that need to be found',
    example: '1',
  })
  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @ApiOperation({
    summary: 'Edit data for existing user. All Body parameters are optional',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Id of user that need to be edited',
    example: '1',
  })
  @Put('user/:id/edit')
  async editUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }
}
