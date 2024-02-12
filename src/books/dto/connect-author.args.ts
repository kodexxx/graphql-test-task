import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ConnectAuthorArgs {
  bookId: string;
  authorId: string;
}
