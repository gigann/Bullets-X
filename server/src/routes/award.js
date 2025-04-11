const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

//get all awards
router.get("/", (req, res) => {
  knex("award")
    .select()
    .then((award) => res.status(200).json(award))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// //get award by id
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   knex("award")
//     .where({ id })
//     .then((award) => res.status(200).json(award))
//     .catch((err) => res.status(500).json({ error: err.message }));
// });

//get award by name or id
router.get("/:id", (req, res) => {
  let id = req.params.id;
  if (isNaN(Number(id))) {
    knex("award")
      .select("*")
      .whereILike("name", `%${id}%`)
      .then((awards) => res.status(200).json(awards))
      .catch((err) => res.status(500).json({ error: err.message }));
  } else {
    knex("award")
      .select()
      .where("id", id)
      .then((awards) => res.status(200).json(awards))
      .catch((err) => res.status(500).json({ error: err.message }));
  }
});

//hi

//post new award
router.post("/", (req, res) => {
  const { name, description, due_date, bullet_minimum, bullet_maximum } =
    req.body;
  knex("award")
    .insert({ name, description, due_date, bullet_minimum, bullet_maximum })
    .then(() => res.status(201).json({ message: "Award added successfully." }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//update award by id
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, due_date, bullet_minimum, bullet_maximum } =
    req.body;
  knex("award")
    .where({ id })
    .update({ name, description, due_date, bullet_minimum, bullet_maximum })
    .then((award) => res.status(200).json(award))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//delete award by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  knex("award")
    .where({ id })
    .del()
    .then(() =>
      res.status(200).json({ message: "Award deleted successfully." })
    )
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
