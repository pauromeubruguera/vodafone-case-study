import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateDeviceInput {
  @Field()
  name: string;

  @Field()
  mobileNumber: string;

  @Field()
  lastConnection: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}
