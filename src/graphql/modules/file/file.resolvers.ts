import { resolve } from 'path';
import { createWriteStream } from 'fs';
import { v4 } from 'uuid';
import { toGlobalId } from 'graphql-relay';
import { GQLResolvers } from '../../generated/schema';

const resolvers: GQLResolvers = {
  Mutation: {
    async uploadFile(_parent, args, ctx) {
      const fileData = await args.input.file;
      const fileExtension = fileData.filename.split('.').pop();
      const fileName = `${v4()}.${fileExtension}`;

      const filePath = resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
        fileName
      );

      const streamIn = fileData.createReadStream();
      const streamOut = createWriteStream(filePath);

      await new Promise((res, rej) => {
        streamIn.pipe(streamOut).on('finish', res).on('error', rej);
      });
      const file = await ctx.models.File.create({
        original_name: fileData.filename,
        path: fileName,
      });

      return { file };
    },
  },
  File: {
    _id({ id }) {
      return id;
    },
    id({ id }) {
      return toGlobalId('File', id);
    },
    url({ path }) {
      return `http://localhost:8000/files/${path}`;
    },
  },
};

export default resolvers;
