import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma, Post, Picture, JobPlace } from '@prisma/client';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }

  async createUser(data: CreateUserDto): Promise<User | null> {
    return this.prisma.user.create({
      data: {
        login: data.login,
        password: data.password,
        email: data.email,
        name: data.name,
      },
    });
  }

  async updateUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    data: UpdateUserDto,
  ): Promise<User | null> {
    return this.prisma.user.update({
      where: userWhereUniqueInput,
      data: {
        email: data.email,
        name: data.name,
      },
    });
  }

  async getPosts(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    postWhereInput: Prisma.PostWhereInput,
  ): Promise<Post[] | null> {
    return this.prisma.user
      .findUnique({
        where: userWhereUniqueInput,
      })
      .posts({
        where: postWhereInput,
      });
  }

  async getPictures(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    pictureWhereInput?: Prisma.PictureWhereInput,
  ): Promise<Picture[] | null> {
    return this.prisma.user
      .findUnique({
        where: userWhereUniqueInput,
      })
      .pictures({
        where: pictureWhereInput,
      });
  }

  async getJobs(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    jobWhereInput?: Prisma.JobPlaceWhereInput,
  ): Promise<JobPlace[] | null> {
    return this.prisma.user
      .findUnique({
        where: userWhereUniqueInput,
      })
      .jobs({
        where: jobWhereInput,
      });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.delete({ where });
  }
}
