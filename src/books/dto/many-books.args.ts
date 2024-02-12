import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class ManyBooksArgs {
  title?: string;
}
