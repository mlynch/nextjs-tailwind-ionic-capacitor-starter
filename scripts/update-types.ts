import { knex } from 'knex';
import { updateTypes } from 'knex-types';
import { existsSync, mkdirSync } from 'fs';
import { SCHEMA_NAME } from '../constants';

if (!existsSync('./types')) {
  mkdirSync('./types');
}

const db = knex(require('../knexfile').development);

updateTypes(db, {
  output: './types/db-schema-definitions.ts',
  schema: SCHEMA_NAME,
  exclude: ['knex_migrations', 'knex_migrations_lock'],
}).catch(err => {
  console.error(err);
  process.exit(1);
});
