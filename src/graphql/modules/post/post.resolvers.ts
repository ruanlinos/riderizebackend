// import { toGlobalId } from 'graphql-relay';
import { GQLResolvers } from '../../generated/schema';

const resolvers: GQLResolvers = {
  Query: {
    posts: async (_parent, _args, ctx) => {
      const posts = await ctx.models.Post.findAll({
        order: [['created_at', 'DESC']],
      });
      return posts;
    },
  },
  Mutation: {
    createPost: async (_parent, args, ctx) => {
      const post = await ctx.models.Post.create({
        name: ctx.user?.name,
        image_post: args.input?.image_post,
        image_profile: ctx.user?.image_profile,
      });
      return { post };
    },
    deletePost: async (_parent, args, ctx) => {
      const postId = args.input?.id;

      if (!postId) {
        return { error: 'Invalid post id' };
      }

      const isValidPost = await ctx.models.Post.findByPk(postId);

      if (!isValidPost) {
        return { error: 'Post not found!' };
      }

      await ctx.models.Post.destroy({ where: { id: postId } });

      return { message: 'Post deleted successfully' };
    },
    updatePost: async (_parent, args, ctx) => {
      const postId = args.input?.id;

      if (!postId) {
        return { error: 'Invalid post id' };
      }

      const isValidPost = await ctx.models.Post.findByPk(postId);

      if (!isValidPost) {
        return { error: 'Post not found!' };
      }

      if (!args.input?.image_post) {
        return { error: 'Image must be informed' };
      }

      await ctx.models.Post.update(
        { image_post: args.input.image_post },
        { where: { id: postId } }
      );

      return { message: 'Post updated successfully' };
    },
  },
};
export default resolvers;
