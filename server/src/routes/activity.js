const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

//READ
router.get("/", (req, res) => {
  knex("activity")
    .select("*")
    .then((activity) => res.status(200).json(activity))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/users/:id", (req, res) => {
  let id = req.params.id;
  knex("activity")
    .select()
    .where("user_id", id)
    .then((activity) => res.status(200).json(activity))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  knex("activity")
    .select()
    .where("id", id)
    .then((activity) => res.status(200).json(activity))
    .catch((err) => res.status(500).json({ error: err.message }));
});

//CREATE
router.post("/", (req, res) => {
  const { user_id, name, description } = req.body;
  knex("activity")
    .insert({ user_id, name, description })
    .then(() => {
      return res.status(201).json({ message: `Activity: ${name} added.` });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Unable to create activity.", error: err });
    });
});

//UPDATE
router.patch("/:id", (req, res) => {
  knex("activity")
    .where("id", req.params.id)
    .update(req.body)
    .then(() => {
      res.status(200).json({ message: "Activity updated successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error updating activity", error: err });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  knex("activity")
    .where("id", req.params.id)
    .del()
    .then((rowsDeleted) => {
      rowsDeleted == 1
        ? res.status(200).json({ message: `Activity successfully deleted.` })
        : res.status(404).json({ message: `Activity does not exist.` });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting activity", error: err });
    });
});

module.exports = router;
