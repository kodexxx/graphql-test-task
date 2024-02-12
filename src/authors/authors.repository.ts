import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/modules/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Author } from './entities/author.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class AuthorsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(): Promise<Author[]> {
    return this.prismaService.author.findMany();
  }

  findOne(id: string): Promise<Author> {
    return this.prismaService.author.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteOne(id: string): Promise<void> {
    await this.prismaService.author.delete({
      where: {
        id,
      },
    });
  }

  createOne(data: Prisma.AuthorCreateInput): Promise<Author> {
    return this.prismaService.author.create({
      data,
    });
  }

  findManyOfBook(bookId: string): Promise<Author[]> {
    return this.prismaService.book
      .findUnique({
        where: {
          id: bookId,
        },
      })
      .authors();
  }
}
