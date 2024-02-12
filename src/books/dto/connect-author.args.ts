import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class ConnectAuthorArgs {
  @Field(() => ID)
  bookId: string;
  @Field(() => ID)
  authorId: string;
}
