import { Args, Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Book } from './entities/book.entity';
import { ManyBooksArgs } from './dto/many-books.args';
import { UniqBookArgs } from './dto/uniq-book.args';
import { BooksService } from './books.service';
import { PrismaService } from '../common/modules/prisma/prisma.service';

@Resolver(Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly prismaService: PrismaService,
  ) {}
  @Query(() => [Book])
  getBooks(@Args() args?: ManyBooksArgs) {
    return this.booksService.findMany(args);
  }

  @Query(() => Book)
  getBook(@Args() args: UniqBookArgs) {
    return this.booksService.findOne(args);
  }

  @ResolveField()
  authors(@Root() book: Book) {
    return this.prismaService.book
      .findUnique({
        where: {
          id: book.id,
        },
      })
      .authors();
  }
}
