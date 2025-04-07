const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);
const bcrypt = require("bcrypt");

// READ

router.get("/", (req, res) => {
  knex("users")
    .select("*")
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  knex("users")
    .select()
    .where("id", id)
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// CREATE

router.post("/", (req, res) => {
  const {
    first_name,
    last_name,
    unit_name,
    username,
    password,
    rank,
    profile_picture,
    supervisor_id,
    is_supervisor,
  } = req.body;
  bcrypt.hash(password, 10).then((hashedPassword) => {
    knex("users")
      .insert({
        first_name,
        last_name,
        unit_name,
        username,
        password: hashedPassword,
        rank,
        profile_picture,
        supervisor_id,
        is_supervisor,
      })
      .returning("id")
      .then(() => res.status(201).json({ message: `User added successfully` }))
      .catch((err) =>
        res.status(500).json({
          message: "User could not be added",
        })
      );
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  knex("users")
    .where({ username })
    .first()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        return bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            const userData = {
              id: user.id,
              username: user.username,
              first_name: user.first_name,
              last_name: user.last_name,
              unit_name: user.unit_name,
              rank: user.rank,
              profile_picture: user.profile_picture,
              supervisor_id: user.supervisor_id,
              is_supervisor: user.is_supervisor,
            };
            return res
              .status(200)
              .json({ message: "Login successful!", user: userData });
          } else {
            return res.status(404).json({ error: "User not found" });
          }
        });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "User could not be logged in",
      })
    );
});

// PATCH

router.patch("/:id", (req, res) => {
  let id = req.params.id;
  const {
    first_name,
    last_name,
    unit_name,
    username,
    password,
    rank,
    profile_picture,
    supervisor_id,
    is_supervisor,
  } = req.body;
  knex("users")
    .where("id", id)
    .update({
      first_name,
      last_name,
      unit_name,
      username,
      password,
      rank,
      profile_picture,
      supervisor_id,
      is_supervisor,
    })
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `User info updated successfully` });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "User could not be updated",
      })
    );
});

// DELETE

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  knex("users")
    .where({ id })
    .del()
    .then(() => {
      res.status(201).json({
        message: "User removed successfully!",
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "User could not be removed",
      })
    );
});

module.exports = router;
