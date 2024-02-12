import { Module } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { BooksLoader } from './books.loader';

@Module({
  providers: [BooksRepository, BooksService, BooksResolver, BooksLoader],
  exports: [BooksRepository],
})
export class BooksModule {}
