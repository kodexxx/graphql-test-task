import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/modules/prisma/prisma.service';
import { Book } from './entities/book.entity';
import { Author } from "../authors/entities/author.entity";

@Injectable()
export class BooksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findManyOfAuthor(authorId: string): Promise<Book[]> {
    return this.prismaService.author
      .findUnique({
        where: {
          id: authorId,
        },
      })
      .books({
        include: {
          authors: true,
        },
      });
  }

  findMany(): Promise<Book[]> {
    return this.prismaService.book.findMany();
  }

  findOne(id: string): Promise<Book> {
    return this.prismaService.book.findUnique({
      where: {
        id,
      },
    });
  }

  async deleteMany(ids: string[]): Promise<void> {
    if (!ids.length) {
      return;
    }

    await this.prismaService.book.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
