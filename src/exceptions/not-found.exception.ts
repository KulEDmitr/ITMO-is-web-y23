import { Prisma } from '@prisma/client';

export class NotFoundException extends Prisma.PrismaClientKnownRequestError {
  constructor(message: string) {
    super(message, 'P2001', 'the record searched for does not exist');
  }
}