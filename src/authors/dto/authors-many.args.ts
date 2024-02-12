import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class AuthorsManyArgs {
  minNumberOfBooks?: number;
  maxNumberOfBooks?: number;
}
