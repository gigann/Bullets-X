const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  const hashedPassword = await bcrypt.hash("123abc", 10);
  await knex("users").insert([
    {
      first_name: "Mickey",
      last_name: "Mouse",
      unit_name: "Launch",
      username: "mickeymouse1",
      password: hashedPassword,
      rank: "O-5",
      profile_picture: "/mitochondria.png",
      supervisor_id: null,
      is_supervisor: true,
      admin: true,
    },
    {
      first_name: "Daisy",
      last_name: "Duck",
      unit_name: "Launch",
      username: "daisyduck1",
      password: hashedPassword,
      rank: "O-2",
      profile_picture: "/daisy.jpg",
      supervisor_id: 1,
      is_supervisor: false,
      admin: false,
    },
    {
      first_name: "Donald",
      last_name: "Duck",
      unit_name: "Launch",
      username: "donaldduck1",
      password: hashedPassword,
      rank: "O-4",
      profile_picture: "/donald.jpg",
      supervisor_id: 1,
      is_supervisor: true,
      admin: false,
    },
    {
      first_name: "Homer",
      last_name: "Simpson",
      unit_name: "71st ISRS",
      username: "homer1",
      password: hashedPassword,
      rank: "O-5",
      profile_picture: "/alien.png",
      supervisor_id: null,
      is_supervisor: true,
      admin: false,
    },
    {
      first_name: "Marge",
      last_name: "Simpson",
      unit_name: "71st ISRS",
      username: "marge1",
      password: hashedPassword,
      rank: "O-3",
      profile_picture: "/telescope.png",
      supervisor_id: 4,
      is_supervisor: true,
      admin: false,
    },
    {
      first_name: "Maggie",
      last_name: "Simpson",
      unit_name: "71st ISRS",
      username: "maggie1",
      password: hashedPassword,
      rank: "O-1",
      profile_picture: "/mitochondira.png",
      supervisor_id: 5,
      is_supervisor: true,
      admin: false,
    },
    {
      first_name: "Bart",
      last_name: "Simpson",
      unit_name: "72nd ISRS",
      username: "bart1",
      password: hashedPassword,
      rank: "O-1",
      profile_picture: "/astronaut.png",
      supervisor_id: null,
      is_supervisor: true,
      admin: false,
    },
    {
      first_name: "Lisa",
      last_name: "Simpson",
      unit_name: "72nd ISRS",
      username: "lisa1",
      password: hashedPassword,
      rank: "E-3",
      profile_picture: "/telescope.png",
      supervisor_id: 7,
      is_supervisor: true,
      admin: false,
    },
  ]);
};
