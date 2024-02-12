import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { ManyBooksArgs } from './dto/many-books.args';
import { UniqBookArgs } from './dto/uniq-book.args';
import { CreateBookInput } from './dto/create-book.input';
import { PRISMA_NOT_FOUND_ERROR_CODE } from '../common/constants/prisma.constants';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}
  findMany(input: ManyBooksArgs) {
    return this.booksRepository.findMany(input.title);
  }

  async deleteOne(input: UniqBookArgs) {
    try {
      await this.booksRepository.deleteOne(input.id);
    } catch (e) {
      if (e.code === PRISMA_NOT_FOUND_ERROR_CODE) {
        return 0;
      }
      throw e;
    }
  }

  addAuthor(bookId: string, authorId: string) {
    return this.booksRepository.updateOne(bookId, {
      authors: {
        connect: { id: authorId },
      },
    });
  }

  findOne(input: UniqBookArgs) {
    return this.booksRepository.findOne(input.id);
  }

  createOne(input: CreateBookInput) {
    return this.booksRepository.createOne({
      title: input.title,
      authors: {
        connect: input.authorIds.map((id) => ({ id })),
      },
    });
  }
}
