import { ArgsType, Field, ID } from '@nestjs/graphql';

@ArgsType()
export class UniqAuthorArgs {
  @Field(() => ID)
  id: string;
}
