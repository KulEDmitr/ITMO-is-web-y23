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

  async posts(params: {
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { where, orderBy } = params;
    return this.prisma.post.findMany({ where, orderBy });
  }

  async createPost(data: CreatePostDto): Promise<Post> {
    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: { id: Number(data.authorId) },
        },
      },
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: UpdatePostDto;
  }): Promise<Post> {
    const { data, where } = params;
    return this.prisma.post.update({
      where,
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
      },
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }

  // async deleteAllPostsBy(
  //   where: Prisma.PostWhereInput,
  //   include?: Prisma.PostInclude,
  // ) {
  //   return this.prisma.post.deleteMany({
  //     include,
  //     where,
  //   });
  // }
}
