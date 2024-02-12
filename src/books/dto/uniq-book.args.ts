import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class UniqBookArgs {
  id: string;
}
