import { Sequelize, BuildOptions, Model } from 'sequelize';
import * as config from './config';
import * as User from './models/User';
import * as Post from './models/Post';
import * as File from './models/File';

function isNodeEnvValid(env?: string): env is keyof typeof config {
  return !!env && env in config;
}

const env = process.env.NODE_ENV;
if (!isNodeEnvValid(env)) {
  throw new Error('invalid environment');
}
const seqConfig = config[env];

export const sequelize = new Sequelize(seqConfig);

function buildModel(seq: Sequelize) {
  const models = {
    User: User.build(seq),
    Post: Post.build(seq),
    File: File.build(seq),
  };

  Object.keys(models).forEach((key) => {
    const modelKey = key as keyof typeof models;
    if (models[modelKey].associate) {
      models[modelKey].associate!(models);
    }
  });

  return models;
}

export const models = buildModel(sequelize);

export type Models = ReturnType<typeof buildModel>;

type AvailableModelKeys = keyof Models;

type AvailableModels = Models[AvailableModelKeys];

type SequelizeInstanceType<TStatic> = TStatic extends typeof Model & {
  new (values?: Partial<infer U>, options?: BuildOptions): infer U;
}
  ? U
  : never;

export type AvailableModelInstanceTypes = SequelizeInstanceType<
  AvailableModels
>;

export type SequelizeStaticType<TInstance> = typeof Model & {
  new (values?: Partial<TInstance>, options?: BuildOptions): TInstance;
} & {
  associate?: (
    models: Record<
      string,
      typeof Model & {
        new (values?: Partial<any>, options?: BuildOptions): any;
      }
    >
  ) => void;
};

export type AnyModel = SequelizeStaticType<AvailableModelInstanceTypes>;
