const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../../knexfile")["development"]);

router.get("/", (req, res) => {
  knex("award")
    .select()
    .then((award) => res.status(200).json(award))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  knex('award')
    .where({id})
    .then(award => {
      
    })
})

module.exports = router;
