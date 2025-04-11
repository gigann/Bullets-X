/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_award").del();
  await knex("user_award").insert([
    { user_id: 1, award_id: 3, status: "Submitted" },
    { user_id: 2, award_id: 2, status: "Drafting" },
    { user_id: 2, award_id: 3, status: "Drafting" },
    { user_id: 3, award_id: 1, status: "Awarded" },
    { user_id: 4, award_id: 2, status: "Drafting" },
    { user_id: 4, award_id: 1, status: "Awarded" },
    { user_id: 5, award_id: 2, status: "Drafting" },
    { user_id: 6, award_id: 3, status: "Submitted" },
    { user_id: 6, award_id: 1, status: "Drafting" },
    { user_id: 6, award_id: 2, status: "Submitted" },
    { user_id: 7, award_id: 3, status: "Drafting" },
    { user_id: 8, award_id: 1, status: "Drafting" },
    { user_id: 8, award_id: 2, status: "Drafting" },
    { user_id: 8, award_id: 3, status: "Submitted" },
  ]);
};
