import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { ManyBooksArgs } from './dto/many-books.args';
import { UniqBookArgs } from './dto/uniq-book.args';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}
  findMany(input: ManyBooksArgs) {
    return this.booksRepository.findMany();
  }

  findOne(input: UniqBookArgs) {
    return this.booksRepository.findOne(input.id);
  }
}
