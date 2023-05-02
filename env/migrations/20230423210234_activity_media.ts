import { Knex } from 'knex';
import { SCHEMA_NAME } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema(SCHEMA_NAME).createTable('activity_media', table => {
    table.increments().primary();
    table.integer('activity_id').notNullable();
    table.enu('media_type', ['image', 'video'], { useNative: true, enumName: 'media_type' });
    table.string('media_url').notNullable();
    table
      .foreign('activity_id')
      .references('id')
      .inTable('travel_tales.activities')
      .withKeyName('fk_activities_id')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema(SCHEMA_NAME).dropTable('activities');
}
