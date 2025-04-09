const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

router.get("/", (req, res) => {
  knex("user_award")
    .select("*")
    .then((user_awards) => res.status(200).json(user_awards))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// look up awards a specific user is interested in
router.get("/users/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  knex("user_award")
    .select("*")
    .where("user_id", user_id)
    .then((user_awards) => res.status(200).json(user_awards))
    .catch((err) =>
      res.status(404).json({
        message: `Awards data for user ID ${user_id} not available`,
      })
    );
});

// add a new award that a specific user is interested in -- specify user and award id
router.post("/", (req, res) => {
  const { user_id, award_id, status } = req.body;

  knex("user_award")
    .insert({ user_id, award_id, status })
    .then(res.status(201).json({ message: "Award successfully added!" }))
    .catch((err) => {
      console.error("Database insert error:", err);
      res.status(500).json({
        message: err,
      });
    });
});

router.patch("/:id", (req, res) => {
  const id = req.params;
  const { user_id, award_id, status } = req.body;

  knex("user_award")
    .where(id)
    .update({ user_id, award_id, status })
    .then(res.status(201).json({ message: "Award successfully updated!" }))
    .catch((err) => {
      console.error("Database update error:", err);
      res.status(500).json({
        message: err,
      });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params;

  knex("user_award")
    .where(id)
    .del()
    .then(res.status(201).json({ message: "Award successfully deleted!" }))
    .catch((err) => {
      console.error("Database delete error:", err);
      res.status(500).json({
        message: err,
      });
    });
});

module.exports = router;
