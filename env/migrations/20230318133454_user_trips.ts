import { Knex } from 'knex';
import { SCHEMA_NAME } from '../../constants';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.withSchema(SCHEMA_NAME).createTable('users_trips', table => {
    table.increments().primary();
    table.integer('user_id').notNullable();
    table.integer('trip_id').notNullable();
    table
      .foreign('user_id')
      .references('user_id')
      .inTable('travel_tales.users')
      .withKeyName('fk_user_id')
      .onDelete('CASCADE');
    table
      .foreign('trip_id')
      .references('trip_id')
      .inTable('travel_tales.trips')
      .withKeyName('fk_trip_id')
      .onDelete('CASCADE');
    table.unique(['user_id', 'trip_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.withSchema(SCHEMA_NAME).dropTable('users_trips');
}
