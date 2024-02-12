import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UniqBookArgs {
  @Field(() => ID)
  id: string;
}
