import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Device {
  @Field()
  id: string;

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
