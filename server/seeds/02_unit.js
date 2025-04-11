/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("unit").del();
  await knex("unit").insert([
    { name: "71st ISRS" },
    { name: "72nd ISRS" },
    { name: "Launch" },
  ]);
};
