import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete, ParseIntPipe,
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
} from '@nestjs/swagger';
import { PostService } from './post.service';

import { CreatePostDto } from './models/create-post.dto';
import { UpdatePostDto } from './models/update-post.dto';
import { PostEntity } from './models/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

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
  async getPostById(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return new PostEntity(await this.postService.findPost({ id: id }));
  }

  @ApiOperation({
    summary: 'Get all published posts in system',
  })
  @ApiOkResponse({
    type: PostEntity,
    isArray: true,
    description: 'Posts found',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiNotFoundResponse({ description: 'Posts not found' })
  @Get()
  async getPublishedPosts(): Promise<PostEntity[]> {
    const posts = await this.postService.posts({ published: true });
    return posts.map((post) => new PostEntity(post));
  }

  @ApiOperation({ summary: 'Create post with given parameters' })
  @ApiCreatedResponse({
    type: PostEntity,
    description: 'Post created',
  })
  @ApiBadRequestResponse({
    description: 'The request could not be understood due to malformed syntax.',
  })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @Post()
  async createDraft(@Body() data: CreatePostDto): Promise<PostEntity> {
    return new PostEntity(await this.postService.createPost(data));
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
  @Put(':id')
  async editPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ): Promise<PostEntity> {
    return new PostEntity(
      await this.postService.updatePost({ id: id }, data),
    );
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
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return new PostEntity(
      await this.postService.deletePost({ id: id }),
    );
  }
}
