import { toGlobalId } from 'graphql-relay';
import { hashSync } from 'bcryptjs';
import { GQLResolvers } from '../../generated/schema';

const resolvers: GQLResolvers = {
  User: {
    id({ id }) {
      return toGlobalId('User', id);
    },
    _id({ id }) {
      return id;
    },
  },
  Query: {
    me: (_parent, _arg, ctx) => ctx.user!,
    allUsers: async (_parent, _arg, ctx) => {
      const users = await ctx.models.User.findAll();

      return users;
    },
  },
  Mutation: {
    createUser: async (_parent, args, ctx) => {
      const email = args.input?.email;
      if (!email) return { error: 'Email não informado' };

      const userExists = await ctx.models.User.findOne({ where: { email } });
      if (userExists) {
        return { error: 'Email já utilizado' };
      }
      const user = await ctx.models.User.create({
        email,
        password_hash: hashSync(args!.input!.password, 8),
        name: args.input?.name,
        image_profile: 'http://localhost:8000/files/default-profile-avatar.jpg',
      });
      return { user };
    },
    updateUser: async (_parent, args, ctx) => {
      const userID = args.input?.id;

      if (!userID) {
        return { error: 'Invalid user id' };
      }

      const isValidUser = await ctx.models.User.findByPk(userID);

      if (!isValidUser) {
        return { error: 'User not found!' };
      }

      if (!args.input?.image_profile) {
        return { error: 'Picture_id must be informed' };
      }

      await ctx.models.User.update(
        { image_profile: args.input?.image_profile },
        { where: { id: userID } }
      );

      return { message: 'User updated successfully' };
    },
  },
};

export default resolvers;
