import { ArgsType, Field, InputType } from "@nestjs/graphql";

@ArgsType()
@InputType()
export class AuthorsManyArgs {
  minNumberOfBooks?: number;
  maxNumberOfBooks?: number;
}
