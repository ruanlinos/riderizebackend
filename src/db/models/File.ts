import { Model, Sequelize, DataTypes } from 'sequelize';
import { SequelizeStaticType } from '..';

export interface File extends Model {
  readonly id: string;
  original_name: string;
  path: string;
  created_at: Date;
  updated_at: Date;
}

type FileStatic = SequelizeStaticType<File>;

export function build(sequelize: Sequelize) {
  const File = sequelize.define(
    'files',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      path: {
        type: DataTypes.STRING,
      },
      original_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  ) as FileStatic;
  return File;
}
