/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('award', (table) => {
  table.increments("id").primary();
  table.string("name");
  table.string("description");
  table.date("due_date");
  table.integer("bullet_minimum");
  table.integer("bullet_maximum");
  table.timestamps(true, true);
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('award');
};
