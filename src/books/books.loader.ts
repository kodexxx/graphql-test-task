import { PrismaService } from '../common/modules/prisma/prisma.service';
import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class BooksLoader {
  constructor(private readonly prismaService: PrismaService) {}

  public readonly batchAuthors = new DataLoader(async (bookIds: string[]) => {
    const authors = await this.prismaService.author.findMany({
      where: {
        books: {
          some: {
            id: {
              in: bookIds,
            },
          },
        },
      },
      include: {
        books: true,
      },
    });

    return bookIds.map((id) =>
      authors.filter((author) => author.books.some((book) => book.id === id)),
    );
  });
}
