import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { Book } from './entities/book.entity';
import { ManyBooksArgs } from './dto/many-books.args';
import { UniqBookArgs } from './dto/uniq-book.args';
import { BooksService } from './books.service';
import { CreateBookInput } from './dto/create-book.input';
import { ConnectAuthorArgs } from './dto/connect-author.args';
import { BooksLoader } from './books.loader';

@Resolver(Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly booksLoader: BooksLoader,
  ) {}
  @Query(() => [Book])
  getBooks(@Args() args?: ManyBooksArgs) {
    return this.booksService.findMany(args);
  }

  @Query(() => Book, { nullable: true })
  getBook(@Args() args: UniqBookArgs) {
    return this.booksService.findOne(args);
  }

  @Mutation(() => Book)
  createBook(@Args('book') input: CreateBookInput) {
    return this.booksService.createOne(input);
  }

  @Mutation(() => Int)
  deleteBook(@Args() input: UniqBookArgs): Promise<number> {
    return this.booksService.deleteOne(input);
  }

  @Mutation(() => Book)
  addAuthor(@Args() input: ConnectAuthorArgs) {
    return this.booksService.addAuthor(input.bookId, input.authorId);
  }

  @ResolveField()
  authors(@Root() book: Book) {
    return this.booksLoader.batchAuthors.load(book.id);
  }
}
