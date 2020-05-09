import { rule } from 'graphql-shield';

import { GraphQLContext } from '../context';

import createError = require('http-errors');

export const isAdmin = rule({ cache: 'contextual' })(
  (_parent, _args, ctx: GraphQLContext) => {
    if (!ctx.user) {
      return createError(401, 'Not Authorized');
    }
    return true;
  }
);
