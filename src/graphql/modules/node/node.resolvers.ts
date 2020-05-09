import { fromGlobalId } from 'graphql-relay';
import { GQLResolvers } from '../../generated/schema';
import { Models } from '../../../db';
import { GraphQLContext } from '../../context';

function isSupportedType(
  type: string,
  ctx: GraphQLContext
): type is keyof Models {
  return type in ctx.models;
}

const resolvers: GQLResolvers = {
  Query: {
    async node(_parent, args, ctx): Promise<any> {
      // const { type, _id } = fromGlobalId(args.id);
      const { type } = fromGlobalId(args.id);

      if (!isSupportedType(type, ctx)) {
        return null;
      }
      // const node = await ctx.models[type].findByPk(id, {
      //   raw: true,
      // });
      const node = {};

      if (!node) {
        return null;
      }

      return {
        ...node,
        __typename: type,
      };
    },
  },
};

export default resolvers;
