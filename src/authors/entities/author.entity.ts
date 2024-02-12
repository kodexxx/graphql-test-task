import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from '../../books/entities/book.entity';

@ObjectType()
export class Author {
  @Field(() => ID)
  id: string;
  firstName: string;
  lastName: string;
  @Field({ complexity: 3 })
  books?: Book[];
}
