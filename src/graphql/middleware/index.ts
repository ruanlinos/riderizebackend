import { shieldMiddleware } from './shield';
import { mutationMiddleware } from './mutation';

export const middlewares = [shieldMiddleware, mutationMiddleware];
