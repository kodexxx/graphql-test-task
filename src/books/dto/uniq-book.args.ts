import { ArgsType, InputType } from '@nestjs/graphql';

@InputType()
@ArgsType()
export class UniqBookArgs {
  id: string;
}
