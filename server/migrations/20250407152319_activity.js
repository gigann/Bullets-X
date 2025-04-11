/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("activity", (table) => {
    table.increments("id").primary();
    table.integer("user_id");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.string("name");
    table.string("description");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("activity", (table) => {
      table.dropForeign("user_id");
    })
    .then(() => {
      return knex.schema.dropTableIfExists("activity");
    });
};
