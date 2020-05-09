import { join } from 'path';

import { makeExecutableSchema } from 'graphql-tools';

import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import { applyMiddleware } from 'graphql-middleware';
// import { middlewares } from './middleware';

function getResolvers() {
  const resolversArray = fileLoader(
    join(__dirname, 'modules/**/*.resolvers.*s')
  );
  return mergeResolvers(resolversArray);
}

function getTypes() {
  const typesArray = fileLoader(join(__dirname, 'modules/**/*.graphql'));
  return mergeTypes(typesArray);
}

function createSchema() {
  const typeDefs = getTypes();
  const resolvers = getResolvers();

  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  return applyMiddleware(executableSchema);
}

export const schema = createSchema();
