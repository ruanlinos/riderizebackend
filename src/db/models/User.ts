import { Model, Sequelize, DataTypes } from 'sequelize';
import { SequelizeStaticType } from '..';

export interface User extends Model {
  readonly id: string;
  name: string;
  email: string;
  password_hash: string;
  image_profile: string;
  created_at: Date;
  updated_at: Date;
}

type UserStatic = SequelizeStaticType<User>;

export function build(sequelize: Sequelize) {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_profile: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  ) as UserStatic;
  return User;
}
