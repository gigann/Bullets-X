/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_award").del();
  await knex("user_award").insert([
    { user_id: 1, award_id: 3, status: "Supervisor Review", drafting: false },
    { user_id: 1, award_id: 2, status: "Supervisor Review", drafting: false },
    { user_id: 1, award_id: 1, status: "Drafting", drafting: true },
    { user_id: 1, award_id: 4, status: "Supervisor Review", drafting: false },

    { user_id: 2, award_id: 1, status: "Supervisor Review", drafting: true },
    { user_id: 2, award_id: 2, status: "Supervisor Review", drafting: false },
    { user_id: 2, award_id: 3, status: "Drafting", drafting: false },
    { user_id: 2, award_id: 4, status: "Supervisor Review", drafting: false },

    { user_id: 3, award_id: 1, status: "Supervisor Review", drafting: false },
    { user_id: 3, award_id: 2, status: "Drafting", drafting: false },
    { user_id: 3, award_id: 4, status: "Supervisor Review", drafting: false },

    { user_id: 4, award_id: 1, status: "Drafting", drafting: false },
    { user_id: 4, award_id: 2, status: "Drafting", drafting: false },
    { user_id: 4, award_id: 3, status: "Drafting", drafting: false },
    { user_id: 4, award_id: 4, status: "Supervisor Review", drafting: true },

    { user_id: 5, award_id: 1, status: "Supervisor Review", drafting: false },
    { user_id: 5, award_id: 2, status: "Supervisor Review", drafting: false },
    { user_id: 5, award_id: 3, status: "Drafting", drafting: true },
    { user_id: 5, award_id: 4, status: "Drafting", drafting: true },

    { user_id: 6, award_id: 1, status: "Drafting", drafting: false },
    { user_id: 6, award_id: 2, status: "Supervisor Review", drafting: false },
    { user_id: 6, award_id: 3, status: "Supervisor Review", drafting: false },
    { user_id: 6, award_id: 4, status: "Supervisor Review", drafting: false },

    { user_id: 7, award_id: 1, status: "Drafting", drafting: false },
    { user_id: 7, award_id: 2, status: "Supervisor Review", drafting: false },
    { user_id: 7, award_id: 3, status: "Supervisor Review", drafting: false },
    { user_id: 7, award_id: 4, status: "Supervisor Review", drafting: false },

    { user_id: 8, award_id: 1, status: "Supervisor Review", drafting: false },
    { user_id: 8, award_id: 2, status: "Drafting", drafting: true },
    { user_id: 8, award_id: 3, status: "Drafting", drafting: true },
    { user_id: 8, award_id: 4, status: "Supervisor Review", drafting: false },
  ]);
};