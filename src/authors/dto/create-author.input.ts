import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  firstName: string;
  lastName: string;
}
