const express = require('express');
const router = express.Router();

const { Review } = require('../../db/models');

router.get('/', async (req, res) => {
   const reviews = await Review.findAll();
   return res.json(reviews)
});

module.exports = router;
