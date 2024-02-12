import { ObjectType } from '@nestjs/graphql';
import { Book } from '../../books/entities/book.entity';

@ObjectType()
export class Author {
  id: string;
  firstName: string;
  lastName: string;
  books?: Book[];
}
