/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("award").del();
  await knex("award").insert([
    {
      name: "Guardian of the Quarter",
      description:
        "Recognizes exceptional performace and dedication to the organization",
      due_date: "2025-09-01",
      bullet_minimum: 8,
      bullet_maximum: 10,
    },
    {
      name: "Guardian of the Year",
      description:
        "Recognizes exceptional performace and dedication to the organization",
      due_date: "2025-12-01",
      bullet_minimum: 8,
      bullet_maximum: 10,
    },
    {
      name: "Team Excellence Award",
      description:
        "Recognizes a team that showed outstanding innovation and mission impact",
      due_date: "2026-01-01",
      bullet_minimum: 5,
      bullet_maximum: 6,
    },
    {
      name: "*General Bullets*",
      description:
        "No specific award, just general bullets",
      due_date: "2026-01-01",
      bullet_minimum: 0,
      bullet_maximum: 100,
    },
  ]);
};
