import { Module } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';

@Module({
  providers: [BooksRepository, BooksService, BooksResolver],
  exports: [BooksRepository],
})
export class BooksModule {}
