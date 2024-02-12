import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  title: string;
  authorIds: string[];
}
