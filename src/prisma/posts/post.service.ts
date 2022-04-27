import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from './models/create-post.dto';
import { UpdatePostDto } from './models/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async findPost(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
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

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
