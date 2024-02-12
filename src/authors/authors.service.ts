import { Injectable } from '@nestjs/common';
import { AuthorsRepository } from './authors.repository';
import { UniqAuthorArgs } from './dto/uniq-author.args';
import { PRISMA_NOT_FOUND_ERROR_CODE } from '../common/constants/prisma.constants';
import { CreateAuthorInput } from './dto/create-author.input';
import { BooksRepository } from '../books/books.repository';
import { PrismaService } from '../common/modules/prisma/prisma.service';
import { AuthorsManyArgs } from './dto/authors-many.args';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly authorsRepository: AuthorsRepository,
    private readonly booksRepository: BooksRepository,
    private readonly prismaService: PrismaService,
  ) {}

  findMany(data?: AuthorsManyArgs) {
    return this.authorsRepository.findMany({
      minBook: data.minNumberOfBooks,
      maxBook: data.maxNumberOfBooks,
    });
  }

  findOne(input: UniqAuthorArgs) {
    return this.authorsRepository.findOne(input.id);
  }

  async deleteOne(input: UniqAuthorArgs) {
    try {
      await this.authorsRepository.deleteOne(input.id);
    } catch (e) {
      if (e.code === PRISMA_NOT_FOUND_ERROR_CODE) {
        return 0;
      }
      throw e;
    }
  }

  async deleteWithBooks(input: UniqAuthorArgs) {
    // todo: optimize it
    const booksOfAuthor = await this.booksRepository.findManyOfAuthor(input.id);

    const booksToDelete = booksOfAuthor
      .filter((b) => b?.authors?.length == 1)
      .map((b) => b.id);

    await this.prismaService.$transaction([
      this.booksRepository.deleteMany(booksToDelete),
      this.authorsRepository.deleteOne(input.id),
    ]);

    return booksOfAuthor.length + 1;
  }

  createOne(input: CreateAuthorInput) {
    return this.authorsRepository.createOne({
      firstName: input.firstName,
      lastName: input.lastName,
    });
  }
}
