import { shield, allow } from 'graphql-shield';

import { isAdmin } from '../rules';

import createError = require('http-errors');

export const shieldMiddleware = shield(
  {
    Mutation: {
      login: allow,
    },
    Query: {
      hello: allow,
      posts: allow,
    },
    LoginPayload: allow,
  },
  {
    fallbackRule: isAdmin,
    fallbackError: createError(500, 'Internal server error'),
    debug: process.env.NODE_ENV === 'production',
  }
);
