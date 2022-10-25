const express = require('express');
const router = express.Router();

const { ReviewImage } = require('../../db/models');

router.get('/', async (req, res) => {
   const images = await ReviewImage.findAll();
   return res.json(images)
});

module.exports = router;
