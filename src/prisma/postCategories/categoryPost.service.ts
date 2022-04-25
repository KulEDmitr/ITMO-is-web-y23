import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PostCategory, Prisma } from '@prisma/client';
import { CreateCategoryPostDto } from './models/create-categoryPost.dto';

@Injectable()
export class CategoryPostService {
  constructor(private prisma: PrismaService) {}

  async categoryPost(
    categoryPostWhereUniqueInput: Prisma.PostCategoryWhereUniqueInput,
  ): Promise<PostCategory | null> {
    return this.prisma.postCategory.findUnique({
      where: categoryPostWhereUniqueInput,
    });
  }

  async getPosts(
    categoryPostWhereUniqueInput: Prisma.PostCategoryWhereUniqueInput,
    categoryPostInclude?: Prisma.PostCategoryInclude,
  ): Promise<PostCategory> {
    return this.prisma.postCategory.findUnique({
      where: categoryPostWhereUniqueInput,
      include: categoryPostInclude,
    });
  }

  async categories(): Promise<PostCategory[] | null> {
    return this.prisma.postCategory.findMany();
  }

  async createCategoryPost(data: CreateCategoryPostDto): Promise<PostCategory> {
    return this.prisma.postCategory.create({
      data: {
        name: data.name,
      },
    });
  }
}
