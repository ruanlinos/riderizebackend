import { QueryInterface, DataTypes } from 'sequelize';

export async function up(q: QueryInterface) {
  await q.createTable('files', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    original_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
}

export async function down(q: QueryInterface) {
  await q.dropTable('files');
}
