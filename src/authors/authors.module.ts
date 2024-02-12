import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { AuthorsRepository } from './authors.repository';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [BooksModule],
  providers: [AuthorsService, AuthorsResolver, AuthorsRepository],
})
export class AuthorsModule {}
