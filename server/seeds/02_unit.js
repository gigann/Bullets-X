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
    { name: "73 ISRS" },
    { name: "64 CYS" },
    { name: "7 SWS" },
    { name: "AATS" },
    { name: "53 SOPS Det C" },
    { name: "11 DOS S4/6" },
    { name: "S2" },
  ]);
};
