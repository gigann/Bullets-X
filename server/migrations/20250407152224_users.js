/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("first_name", 250);
    table.string("last_name", 250);
    table.string("unit_name", 250);
    table.string("username", 250);
    table.string("password", 250);
    table.string("rank", 250);
    table.string("profile_picture", 250);
    table.integer("supervisor_id");
    table.boolean("is_supervisor");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
