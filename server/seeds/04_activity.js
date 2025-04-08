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
    {
      user_id: 4,
      name: "Things",
      description: "I do stuff and things like 100 times a day",
    },
    {
      user_id: 5,
      name: "Stuff",
      description: "I do stuff and things like 600 times a day",
    },
    {
      user_id: 6,
      name: "Lethal",
      description: "I am so lethal omg",
    },
    {
      user_id: 7,
      name: "Money",
      description: "There's a lot of money and I intend to get all of it",
    },
    {
      user_id: 8,
      name: "Rizzler",
      description: "My rizz has been insane lately...",
    },
  ]);
};
