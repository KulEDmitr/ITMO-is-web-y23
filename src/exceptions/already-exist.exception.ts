import { Prisma } from '@prisma/client';

export class AlreadyExistException extends Prisma.PrismaClientKnownRequestError {
  constructor(message: string) {
    super(message, 'P2002', 'unique constrained failed');
  }
}
