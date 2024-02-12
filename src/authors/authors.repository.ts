import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/modules/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Author } from './entities/author.entity';
import { AuthorsFilter } from './interfaces/authors.filter';

@Injectable()
export class AuthorsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findMany(filter?: AuthorsFilter): Promise<Author[]> {
    const filterIds = await this.getAuthorsIdFilter(filter);
    if (filterIds) {
      return this.prismaService.author.findMany({
        where: {
          id: {
            in: filterIds,
          },
        },
      });
    }
    return this.prismaService.author.findMany();
  }

  findOne(id: string): Promise<Author> {
    return this.prismaService.author.findUnique({
      where: {
        id,
      },
    });
  }

  deleteOne(id: string) {
    return this.prismaService.author.delete({
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

  private async getAuthorsIdFilter(filter: AuthorsFilter) {
    if (!filter.maxBook && !filter.minBook) {
      return undefined;
    }
    const result: { A: string }[] = await this.prismaService
      .$queryRaw`SELECT ba."A" FROM "Author" AS a 
        JOIN "_BookAuthors" AS ba ON ba."A" = a.id 
        GROUP BY ba."A" 
        ${this.getHavingCondition(filter)}`;

    return result.map((r) => r.A);
  }

  // for safe work with raw query in prisma we cant directly make operations with string templates
  private getHavingCondition(filter: AuthorsFilter) {
    if (filter?.maxBook !== undefined && filter?.minBook !== undefined) {
      return Prisma.sql`HAVING count(ba."A") >= ${filter.minBook} AND count(ba."A") <= ${filter.maxBook}`;
    }

    if (filter?.maxBook !== undefined) {
      return Prisma.sql`HAVING count(ba."A") <= ${filter.maxBook}`;
    }

    if (filter?.minBook !== undefined) {
      return Prisma.sql`HAVING count(ba."A") >= ${filter.minBook}`;
    }

    return Prisma.empty;
  }
}
