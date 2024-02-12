import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/modules/prisma/prisma.service';
import { Book } from './entities/book.entity';
import { Prisma } from '@prisma/client';

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

  findMany(search?: string): Promise<Book[]> {
    return this.prismaService.book.findMany({
      where: this.getSearchCondition(search),
    });
  }

  findOne(id: string): Promise<Book> {
    return this.prismaService.book.findUnique({
      where: {
        id,
      },
    });
  }

  createOne(data: Prisma.BookCreateInput): Promise<Book> {
    return this.prismaService.book.create({
      data,
    });
  }

  updateOne(id: string, data: Prisma.BookUpdateInput): Promise<Book> {
    return this.prismaService.book.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteOne(id: string): Promise<void> {
    await this.prismaService.book.delete({
      where: {
        id,
      },
    });
  }

  deleteMany(ids: string[]) {
    if (!ids.length) {
      return;
    }

    return this.prismaService.book.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  private getSearchCondition(search?: string): Prisma.BookWhereInput {
    if (!search) {
      return {};
    }

    if (search.startsWith('%')) {
      return {
        title: {
          endsWith: search.replace(/%/g, ''),
          mode: 'insensitive',
        },
      };
    }

    if (search.endsWith('%')) {
      return {
        title: {
          startsWith: search.replace(/%/g, ''),
          mode: 'insensitive',
        },
      };
    }

    return {
      title: {
        contains: search.replace(/%/g, ''),
        mode: 'insensitive',
      },
    };
  }
}
