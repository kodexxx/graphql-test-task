import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/entities/author.entity';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;
  title: string;
  @Field({ complexity: 3 })
  authors?: Author[];
}
