import {
  DateTimeResolver,
  EmailAddressResolver,
  NegativeFloatResolver,
  NegativeIntResolver,
  NonNegativeFloatResolver,
  NonNegativeIntResolver,
  NonPositiveFloatResolver,
  NonPositiveIntResolver,
  PositiveFloatResolver,
  PositiveIntResolver,
} from 'graphql-scalars';
import { GraphQLUpload } from 'graphql-upload';

const resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  NegativeFloat: NegativeFloatResolver,
  NegativeInt: NegativeIntResolver,
  NonNegativeFloat: NonNegativeFloatResolver,
  NonNegativeInt: NonNegativeIntResolver,
  NonPositiveFloat: NonPositiveFloatResolver,
  NonPositiveInt: NonPositiveIntResolver,
  PositiveFloat: PositiveFloatResolver,
  PositiveInt: PositiveIntResolver,
  Upload: GraphQLUpload,
};

export default resolvers;
