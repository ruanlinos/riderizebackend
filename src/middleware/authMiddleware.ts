import { Middleware } from 'koa';

import { promisify } from 'util';
import { verify, GetPublicKeyOrSecret, Secret } from 'jsonwebtoken';
import { models } from '../db';

const verifyAsync = promisify<string, Secret | GetPublicKeyOrSecret>(verify);

export const authMiddleware: Middleware = async (ctx, next) => {
  const auth =
    ctx.request.headers.authorization || ctx.request.headers.Authorization;

  if (!auth) {
    return next();
  }
  const [bearer, token] = auth.split(' ');

  if (bearer !== 'Bearer') {
    throw new Error('invalid token');
  }

  const tokenData = ((await verifyAsync(
    token,
    process.env.API_SECRET as string
  )) as unknown) as { userId?: string };

  const { userId } = tokenData;
  if (!userId) {
    throw new Error('invalid token');
  }
  const user = await models.User.findByPk(userId);

  if (!user) {
    throw new Error('invalid token');
  }

  ctx.state.user = user;

  return next();
};
