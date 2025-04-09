/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("bullet", (table) => {
    table.increments("id").primary();
    table.integer("user_id");
    table.foreign("user_id").references("users.id").onDelete("CASCADE");
    table.string("name", 250);
    table.string("action", 250);
    table.string("impact", 250);
    table.string("result", 250);
    table.string("status", 250);
    table.timestamps(true, true);
    table.integer("award_id");
    table.foreign("award_id").references("award.id").onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("bullet", (table) => {
      table.dropForeign("user_id");
      table.dropForeign("award_id");
    })
    .then(function () {
      return knex.schema.dropTableIfExists("bullet");
    });
};
