import { ArgsType, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class UniqAuthorArgs {
  id: string;
}
