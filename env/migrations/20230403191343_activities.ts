import { Knex } from 'knex';
import { SCHEMA_NAME } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema(SCHEMA_NAME).createTable('activities', table => {
    table.increments().primary();
    table.integer('destination_id').notNullable();
    table.specificType('duration', 'interval');
    table.string('name').notNullable();
    table.text('description');
    table.integer('day_index').notNullable();
    table.integer('sequential_number').notNullable();
    table
      .foreign('destination_id')
      .references('id')
      .inTable('travel_tales.trip_destinations')
      .withKeyName('fk_destination_id')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema(SCHEMA_NAME).dropTable('activities');
}
