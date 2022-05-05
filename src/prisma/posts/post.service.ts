import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from './models/create-post.dto';
import { UpdatePostDto } from './models/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findPostById(id: number): Promise<Post | null> {
    return this.findPost({ id: id });
  }

  async findPost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async getPublishedPosts(): Promise<Post[] | null> {
    return this.posts({ published: true });
  }

  async posts(
    where?: Prisma.PostWhereInput,
    orderBy?: Prisma.PostOrderByWithRelationInput,
  ): Promise<Post[] | null> {
    return this.prisma.post.findMany({ where, orderBy });
  }

  async createPost(data: CreatePostDto): Promise<Post | null> {
    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        author: {
          connect: { id: data.authorId },
        },
        categories: {
          create: data.categories?.map((cat) => ({
            category: {
              connect: { id: cat },
            },
          })),
        },
      },
    });
  }

  async updatePostById(id: number, data: UpdatePostDto): Promise<Post | null> {
    return this.updatePost({ id: id }, data);
  }

  async updatePost(
    where: Prisma.PostWhereUniqueInput,
    data: UpdatePostDto,
  ): Promise<Post | null> {
    return this.prisma.post.update({
      where,
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
        categories: {
          create: data.categories?.map((cat) => ({
            category: {
              connect: { id: cat },
            },
          })),
        },
      },
    });
  }

  async deletePostById(id: number): Promise<Post | null> {
    return this.deletePost({ id: id });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
