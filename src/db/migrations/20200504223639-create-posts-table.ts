import { QueryInterface, DataTypes } from 'sequelize';

export async function up(q: QueryInterface) {
  await q.createTable('posts', {
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
    image_post: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_profile: {
      type: DataTypes.STRING,
      allowNull: true,
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
  await q.dropTable('posts');
}
