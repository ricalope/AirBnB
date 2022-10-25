const express = require('express');
const router = express.Router();

const { SpotImage } = require('../../db/models');

router.get('/', async (req, res) => {
   const images = await SpotImage.findAll();
   return res.json(images)
});

module.exports = router;
