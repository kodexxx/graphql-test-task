import { ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/entities/author.entity';

@ObjectType()
export class Book {
  id: string;
  title: string;
  authors?: Author[];
}
