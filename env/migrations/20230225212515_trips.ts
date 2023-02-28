import { Knex } from 'knex';
import { SCHEMA_NAME } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${SCHEMA_NAME}"`);
  await knex.schema.withSchema(SCHEMA_NAME).createTable('trips', table => {
    table.increments();
    table.string('title').notNullable();
    table.string('catch_phrase').notNullable();
    table.string('cover_photo_url').notNullable();
    table.string('created_by').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {}
