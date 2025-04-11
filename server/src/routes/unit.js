const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);
const bcrypt = require("bcrypt");

// READ

router.get("/", (req, res) => {
  knex("unit")
    .select("*")
    .then((units) => res.status(200).json(units))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:name", (req, res) => {
  let name = req.params.name;
  knex("unit")
    .select()
    .whereILike("name", `%${name}%`)
    .then((units) => res.status(200).json(units))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// CREATE
router.post("/", (req, res) => {
  const { name } = req.body;
  knex("unit")
    .insert({ name })
    .then(() => {
      return res.status(201).json({ message: `Unit ${name} added.` });
    })
    .catch((err) => {
      res.status(500).json({ message: "Unable to add unit.", error: err });
    });
});

// PATCH
router.patch("/:id", (req, res) => {
  knex("unit")
    .where("id", req.params.id)
    .update(req.body)
    .then(() => {
      res.status(200).json({ message: "Unit updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating unit", error: err });
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  knex("unit")
    .where("id", req.params.id)
    .del()
    .then((rowsDeleted) => {
      rowsDeleted == 1
        ? res.status(200).json({ message: `Unit successfully deleted.` })
        : res.status(404).json({ message: `Unit does not exist.` });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting unit", error: err });
    });
});

module.exports = router;
