import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseFilters,
  Query,
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
  ApiQuery,
} from '@nestjs/swagger';

import { PostService } from './post.service';

import { CreatePostDto } from './models/create-post.dto';
import { UpdatePostDto } from './models/update-post.dto';
import { PostEntity } from './models/post.entity';
import { RecordExistedFilter } from '../../filters/record-existed.filter';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @ApiOperation({ summary: 'Create post with given parameters' })
  @ApiCreatedResponse({
    type: PostEntity,
    description: 'Post created',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiConflictResponse({
    description: 'Some of given parameters should be unique but they are not',
  })
  @UseFilters(RecordExistedFilter)
  @Post()
  async createDraft(@Body() data: CreatePostDto): Promise<PostEntity> {
    return new PostEntity(await this.postService.createPost(data));
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiOkResponse({
    type: PostEntity,
    description: 'Post found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of post that need to be found',
    example: 1,
  })
  @Get(':id')
  async getPostById(@Param('id') id: number): Promise<PostEntity> {
    return new PostEntity(await this.postService.findPostById(id));
  }

  @ApiOperation({ summary: 'Get all posts with published flag' })
  @ApiOkResponse({
    type: PostEntity,
    isArray: true,
    description: 'Post found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiQuery({
    name: 'published',
    type: 'boolean',
    description: 'published flag for posts that need to be found',
    example: true,
  })
  @Get()
  async getFeed(@Query('published') published: boolean) {
    const posts = await this.postService.posts({ published: published });
    return posts.map((post) => new PostEntity(post));
  }

  @ApiOperation({
    summary: 'Edit fields for existing post. All Body parameters are optional',
  })
  @ApiCreatedResponse({
    type: PostEntity,
    description: 'Post edited',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of post that need to be edited',
    example: 1,
  })
  @UseFilters(RecordExistedFilter)
  @Put(':id')
  async editPostById(
    @Param('id') id: number,
    @Body() data: UpdatePostDto,
  ): Promise<PostEntity> {
    return new PostEntity(await this.postService.updatePostById(id, data));
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'Id of post that need to be deleted',
    example: 1,
  })
  @ApiOkResponse({
    type: PostEntity,
    description: 'Post deleted',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @Delete(':id')
  async deletePostById(@Param('id') id: number): Promise<PostEntity> {
    return new PostEntity(await this.postService.deletePostById(id));
  }
}
