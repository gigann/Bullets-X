/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_award", (table) => {
    table.increments("id").primary();
    table.integer("user_id");
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.integer("award_id");
    table
      .foreign("award_id")
      .references("id")
      .inTable("award")
      .onDelete("CASCADE");
    table.string("status");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("user_award", (table) => {
      table.dropForeign("user_id");
      table.dropForeign("award_id");
    })
    .then(() => {
      return knex.schema.dropTableIfExists("user_award");
    });
};
