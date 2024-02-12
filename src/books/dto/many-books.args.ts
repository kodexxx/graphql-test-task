import { ArgsType, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class ManyBooksArgs {
  title?: string;
}
