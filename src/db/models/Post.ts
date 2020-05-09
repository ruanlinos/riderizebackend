import { Model, Sequelize, DataTypes } from 'sequelize';
import { SequelizeStaticType } from '..';

export interface Post extends Model {
  readonly id: string;
  name: string;
  image_post?: string;
  image_profile: string;
  created_at: Date;
  updated_at: Date;
}

type PostStatic = SequelizeStaticType<Post>;

export function build(sequelize: Sequelize) {
  const Post = sequelize.define(
    'posts',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      image_post: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      image_profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  ) as PostStatic;
  return Post;
}
