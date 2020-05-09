import { execute } from 'graphql-api-koa';
import { resolve } from 'path';
import Playground from 'graphql-playground-middleware-koa';
import { graphqlUploadKoa } from 'graphql-upload';
import { schema } from './graphql';
import { getContext } from './graphql/context';

import send = require('koa-send');
import Router = require('@koa/router');

const router = new Router();

router.get('/hello', (ctx, next) => {
  ctx.body = 'hello visitor';

  return next();
});

router.all('/playground', Playground({ endpoint: '/graphql' }));

router.get('/files/:file', (ctx) => {
  return send(ctx, ctx.params.file, {
    root: resolve(__dirname, '..', 'tmp', 'uploads'),
  });
});

router.post(
  '/graphql',
  graphqlUploadKoa({
    maxFiles: 10,
    maxFieldSize: 1000000,
  }),
  execute({
    override: (ctx) => {
      return {
        schema,
        contextValue: getContext(ctx),
      };
    },
  })
);

export { router };
