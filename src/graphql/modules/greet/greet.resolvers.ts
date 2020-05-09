import { GQLResolvers } from '../../generated/schema';

const resolvers: GQLResolvers = {
  Query: {
    hello(_parent, _args, _ctx) {
      if (_ctx.user) {
        return `hello ${_ctx.user.name}`;
      }
      return 'hello visitor';
    },
  },
};

export default resolvers;
