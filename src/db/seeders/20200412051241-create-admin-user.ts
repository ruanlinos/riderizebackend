import { QueryInterface } from 'sequelize';

import { v4 } from 'uuid';
import { hashSync } from 'bcryptjs';

export async function up(q: QueryInterface) {
  await q.bulkInsert('users', [
    {
      id: v4(),
      name: 'Jon Doe',
      email: 'jondoe@riderize.com',
      password_hash: hashSync('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
