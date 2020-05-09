import { Middleware } from 'koa';

export const errorMiddleware: Middleware = async (_ctx, next) => {
  try {
    const response = await next();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
