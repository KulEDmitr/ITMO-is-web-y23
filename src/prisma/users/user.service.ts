import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma, Post, Picture, JobPlace } from '@prisma/client';
import { CreateUserDto } from './models/create-user.dto';
import { UpdateUserDto } from './models/update-user.dto';
import { AlreadyExistException } from '../../exceptions/already-exist.exception';
import { NotFoundException } from '../../exceptions/not-found.exception';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string): Promise<User | null> {
    return this.user({ id: id });
  }

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
    await this.checkUser({ email: data.email }, false);

    return this.prisma.user.create({
      data: {
        login: data.login,
        password: data.password,
        email: data.email,
        name: data.name,
      },
    });
  }

  async updateUserById(id: string, data: UpdateUserDto): Promise<User | null> {
    return this.updateUser({ id: id }, data);
  }

  async updateUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    data: UpdateUserDto,
  ): Promise<User | null> {
    await this.checkUser(userWhereUniqueInput, true);
    const curUser = await this.user(userWhereUniqueInput);
    if (curUser.email == data.email) {
      data.email = undefined;
    }
    if (curUser.name == data.name) {
      data.name = undefined;
    }

    return this.prisma.user.update({
      where: userWhereUniqueInput,
      data: {
        email: data.email,
        name: data.name,
      },
    });
  }

  async getPublishedPostsByAuthorId(id: string): Promise<Post[] | null> {
    return this.getPosts({ id: id }, { published: true });
  }

  async getUnpublishedPostsByAuthorId(id: string): Promise<Post[] | null> {
    return this.getPosts({ id: id }, { published: false });
  }

  async getPosts(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    postWhereInput: Prisma.PostWhereInput,
  ): Promise<Post[] | null> {
    await this.checkUser(userWhereUniqueInput, true);

    return this.prisma.user
      .findUnique({
        where: userWhereUniqueInput,
      })
      .posts({
        where: postWhereInput,
      });
  }

  async getPictureByOwner(id: string): Promise<Picture[] | null> {
    return this.getPictures({ id: id });
  }

  async getPictures(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    pictureWhereInput?: Prisma.PictureWhereInput,
  ): Promise<Picture[] | null> {
    await this.checkUser(userWhereUniqueInput, true);
    return this.prisma.user
      .findUnique({
        where: userWhereUniqueInput,
      })
      .pictures({
        where: pictureWhereInput,
      });
  }

  async getJobsByWorkerId(id: string): Promise<JobPlace[] | null> {
    return this.getJobs({ id: id });
  }

  async getJobs(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    jobWhereInput?: Prisma.JobPlaceWhereInput,
  ): Promise<JobPlace[] | null> {
    await this.checkUser(userWhereUniqueInput, true);
    return this.prisma.user
      .findUnique({
        where: userWhereUniqueInput,
      })
      .jobs({
        where: jobWhereInput,
      });
  }

  async deleteUserById(id: string): Promise<User | null> {
    return this.delete({ id: id });
  }

  async delete(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.delete({ where });
  }

  private async checkUser(where: Prisma.UserWhereUniqueInput, exist: boolean) {
    const user: User | null = await this.prisma.user.findUnique({
      where,
    });
    if (!exist && user != null) {
      throw new AlreadyExistException('User with given data already exist');
    }
    if (exist && user == null) {
      throw new NotFoundException('User with given data do not exist');
    }
  }
}
