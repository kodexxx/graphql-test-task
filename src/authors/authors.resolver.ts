import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { PrismaService } from '../common/modules/prisma/prisma.service';
import { Author } from './entities/author.entity';
import { Book } from '../books/entities/book.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { AuthorsManyArgs } from './dto/authors-many.args';
import { AuthorsService } from './authors.service';
import { UniqAuthorArgs } from './dto/uniq-author.args';

@Resolver(Author)
export class AuthorsResolver {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authorsService: AuthorsService,
  ) {}

  @Query(() => [Author])
  async getAuthors(@Args() data?: AuthorsManyArgs) {
    console.log(data);
    return this.authorsService.findMany();
  }

  @Query(() => Author)
  async getAuthor(@Args() data?: UniqAuthorArgs) {
    return this.authorsService.findOne(data);
  }

  @Mutation(() => Author)
  createAuthor(@Args('author') input: CreateAuthorInput) {
    return this.authorsService.createOne(input);
  }

  @Mutation(() => Int)
  deleteAuthor(@Args() input: UniqAuthorArgs): Promise<number> {
    return this.authorsService.deleteOne(input);
  }

  @Mutation(() => Int)
  deleteAuthorWithBooks(@Args() input: UniqAuthorArgs): Promise<number> {
    return this.authorsService.deleteWithBooks(input);
  }

  // todo: optimize it
  // When check logs of prisma, I find that prisma do optimization for queries,
  // https://www.prisma.io/docs/orm/prisma-client/queries/query-optimization-performance,
  // it seems that there is no need to do anything to solve the n+1 problem
  @ResolveField()
  async books(@Root() author: Author): Promise<Book[]> {
    // console.log(author)
    return this.prismaService.author
      .findUnique({
        where: {
          id: author.id,
        },
      })
      .books();
  }
}
