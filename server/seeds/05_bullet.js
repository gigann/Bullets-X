/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("bullet").del();
  await knex("bullet").insert([
    {
      user_id: 1,
      name: "Fundraiser",
      description:
        "Led inaugural USSF fundraising campaign—coordinated 15 volunteers & 3 events across base",
      status: "Drafting",
      award_id: 1,
    },
    {
      user_id: 2,
      name: "Ops",
      description:
        "Streamlined satellite maneuver protocols—integrated AI prediction models into ops planning",
      status: "Supervisor Review",
      award_id: 3,
    },
    {
      user_id: 3,
      name: "Ops",
      description:
        "Led joint orbital surveillance op w/ Allied Space Command—executed 24/7 threat tracking",
      status: "Complete",
      award_id: 2,
    },
  ]);
};
