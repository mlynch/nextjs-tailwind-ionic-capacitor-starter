import { Knex } from 'knex';
import { SCHEMA_NAME } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE SCHEMA IF NOT EXISTS "${SCHEMA_NAME}"`);
  await knex.schema.withSchema(SCHEMA_NAME).createTable('trips', table => {
    table.increments('trip_id');
    table.string('title').notNullable();
    table.string('catch_phrase').notNullable();
    table.string('cover_photo_url').notNullable();
    table.integer('created_by').notNullable();
    table.datetime('start_date', { useTz: true }).notNullable();
    table.datetime('end_date', { useTz: true }).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema(SCHEMA_NAME).dropTable('trips');
}
