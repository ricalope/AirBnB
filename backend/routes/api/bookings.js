const express = require('express');
const router = express.Router();

const { Booking } = require('../../db/models');

router.get('/', async (req, res) => {
   const bookings = await Booking.findAll();
   return res.json(bookings)
});

module.exports = router;
