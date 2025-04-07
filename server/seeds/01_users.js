/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      first_name: "Mickey",
      last_name: "Mouse",
      unit_name: "Launch",
      username: "mickeymouse1",
      password: "789abc",
      rank: "O-5",
      profile_picture: "something.png",
      supervisor_id: null,
      is_supervisor: true,
    },
    {
      first_name: "Daisy",
      last_name: "Duck",
      unit_name: "Launch",
      username: "daisyduck1",
      password: "123abc",
      rank: "O-2",
      profile_picture: "something.png",
      supervisor_id: 1,
      is_supervisor: false,
    },
    {
      first_name: "Donald",
      last_name: "Duck",
      unit_name: "Launch",
      username: "donaldduck1",
      password: "456abc",
      rank: "O-4",
      profile_picture: "something.png",
      supervisor_id: 1,
      is_supervisor: true,
    },
  ]);
};
