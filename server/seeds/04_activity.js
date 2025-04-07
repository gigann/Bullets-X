/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("activity").del();
  await knex("activity").insert([
    {
      user_id: 1,
      name: "Money",
      description: "I raised $200,000 for the USSF",
    },
    { user_id: 2, name: "Acq", description: "I worked on a 2M project" },
    {
      user_id: 3,
      name: "Operations",
      description: "I was a crew commander for 1 SPAFORGEN cycle",
    },
  ]);
};
