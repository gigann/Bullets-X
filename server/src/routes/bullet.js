const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

// READ

router.get("/", (req, res) => {
  knex("bullet")
    .select("*")
    .orderBy("award_id")
    .then((bullets) => res.status(200).json(bullets))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/users/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  knex("bullet")
    .join("award", "award_id", "=", "award.id")
    .select("bullet.*", "award.name as award_name")
    .where("user_id", user_id)
    .orderBy("id")
    .then((bullets) => res.status(200).json(bullets))
    .catch((err) =>
      res.status(404).json({
        message: `Item data with user ID ${user_id} not available`,
      })
    );
});

router.get("/award/:award_id", (req, res) => {
  let award_id = req.params.award_id;
  knex("bullet")
    .select("*")
    .where("award_id", award_id)
    .then((bullets) => res.status(200).json(bullets))
    .catch((err) =>
      res.status(404).json({
        message: `Bullet data with award ID ${award_id} not available`,
      })
    );
});

//get latest updated bullets with "Awarded" as status
router.get("/latest-awarded", (req, res) => {
  knex("bullet")
    .join("award", "award_id", "=", "award.id")
    .select("bullet.*", "award.name as award_name")
    .where("status", "Awarded")
    .orderBy("updated_at", "desc")
    .then((bullets) => res.status(200).json(bullets))
    .catch((err) =>
      res.status(500).json({
        message: `Bullet data not available`,
      })
    );
});

//get list of bullets with the award id by looking up user id
router.get("/status/:user_id", (req, res) => {
  const { user_id } = req.params;
  knex("bullet")
    .join("award", "award_id", "=", "award.id")
    .where("bullet.user_id", user_id)
    .andWhere("bullet.status", "Supervisor Approved")
    .groupBy(
      "bullet.award_id",
      "award.name",
      "award.bullet_minimum",
      "award.bullet_maximum"
    )
    .select(
      knex.raw("COUNT(*) as approved_status_count"),
      "bullet.award_id",
      "award.name as award_name",
      "award.bullet_minimum",
      "award.bullet_maximum"
    )
    .orderBy("bullet.award_id")
    .then((bullets) => res.status(200).json(bullets))
    .catch((err) =>
      res.status(404).json({
        message: "Bullet data not available",
      })
    );
});

//get a specific user's bullets NOT in draft (ie. ready for supervisor view), with award name showing
router.get("/completed/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  knex("bullet")
    .join("award", "award_id", "=", "award.id")
    .select("bullet.*", "award.name as award_name")
    .where("user_id", user_id)
    .where("drafting", false)
    .orderBy("award_id")
    .then((bullets) => res.status(200).json(bullets))
    .catch((err) =>
      res.status(404).json({
        message: "Bullet data not available",
      })
    );
});

//get a specific user's bullets NOT in draft (ie. ready for supervisor view), for a specific award
router.get("/completed/:user_id/:award_id", (req, res) => {
  const { user_id, award_id } = req.params;

  knex("bullet")
    .select("*")
    .where({ user_id, award_id, drafting: false }) // Ensure only non-drafting bullets are returned
    .then((bullets) => {
      if (bullets.length === 0) {
        return res
          .status(404)
          .json({ message: "No bullets found for this user and award." });
      }
      res.status(200).json(bullets);
    })
    .catch((err) => {
      console.error("Error fetching bullets:", err.message);
      res.status(500).json({ message: "Failed to fetch bullets." });
    });
});

// patch a specific user's bullets NOT in draft (ie. ready for supervisor view), for a specific award
// router.patch("/completed/:id", (req, res) => {
//     let { id }= req.params;
//     let { status } = req.body;

//     knex("bullet")
//       .where("id", id)
//       .update({
//         status,
//       })
//       .then((count) => {
//         if (count > 0) {
//           res.status(200).json({ message: `Status updated successfully` });
//         } else {
//           res.status(404).json({ error: "Bullet not found" });
//         }
//       })
//       .catch((err) =>
//         res.status(500).json({
//           message: "Bullet could not be updated",
//         })
//       );
//   });

// CREATE

router.post("/", (req, res) => {
  const { user_id, name, action, impact, result, status, drafting, award_id } =
    req.body;
  knex("bullet")
    .insert({
      user_id,
      name,
      action,
      impact,
      result,
      status,
      drafting,
      award_id,
    })
    .returning("id")
    .then(() => res.status(201).json({ message: `Bullet added successfully` }))
    .catch((err) =>
      res.status(500).json({
        message: "Bullet could not be added",
      })
    );
});

// PATCH

router.patch("/:id", (req, res) => {
  let id = req.params.id;
  const { user_id, name, action, impact, result, status, drafting, award_id } =
    req.body;
  knex("bullet")
    .where("id", id)
    .update({
      user_id,
      name,
      action,
      impact,
      result,
      status,
      drafting,
      award_id,
    })
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: `Bullet updated successfully` });
      } else {
        res.status(404).json({ error: "Bullet not found" });
      }
    })
    .catch((err) =>
      res.status(500).json({
        message: "Bullet could not be updated",
      })
    );
});

// DELETE

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  knex("bullet")
    .where({ id })
    .del()
    .then(() => {
      res.status(201).json({
        message: "Bullet removed successfully!",
      });
    })
    .catch((err) =>
      res.status(500).json({
        message: "Bullet could not be removed",
      })
    );
});

module.exports = router;
