const express = require('express');
const router = express.Router();

const { Booking, Spot, User, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

router.get('/current', requireAuth, async (req, res) => {
   const Bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: { model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] } }
   });
   for (let booking of Bookings) {
      const previewImage = await SpotImage.findOne({
         where: { spotId: booking.Spot.id },
         attributes: ['url']
      });
      booking.Spot.dataValues.previewImage = previewImage.dataValues.url
   }
   return res.json({ Bookings })
});

router.put('/:bookingId', requireAuth, async (req, res, next) => {
   let { startDate, endDate } = req.body;
   const booking = await Booking.findByPk(req.params.bookingId);
   if (!booking) {
      res.status(404)
      return res.json({
         message: "Booking couldn't be found",
         statusCode: 404
      });
   }

   startDate = new Date(startDate);
   endDate = new Date(endDate);
   if (startDate > endDate) {
      res.status(400)
      return res.json({
         message: "Validation Error",
         statusCode: 400,
         errors: {
            endDate: "endDate cannot come before startDate"
         }
      });
   }
   if (new Date() >= endDate) {
      res.status(403)
      return res.json({
         message: "Past bookings can't be modified",
         statusCode: 403
      });
   }
   const bookedSpot = await Booking.findAll({
      where: {
         spotId: booking.spotId,
         [Op.or]: [
            { startDate: { [Op.between]: [startDate, endDate] } },
            { endDate: { [Op.between]: [startDate, endDate] } }
         ]
      }
   });

   for (let bookings of bookedSpot) {
      if ((bookings.startDate <= startDate && bookings.endDate <= endDate)
      || (bookings.startDate <= startDate || bookings.endDate >= endDate)) {
         res.status(403)
         return res.json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
               startDate: "Start date conflicts with an existing booking",
               endDate: "End date conflicts with an existing booking"
            }
         });
      }
   }

   const updatedBooking = await booking.set({
      startDate,
      endDate
   });
   await updatedBooking.save();
   return res.json(updatedBooking);
});

router.delete('/:bookingId', requireAuth, async (req, res, next) => {
   const booking = await Booking.findByPk(req.params.bookingId);
   if (!booking) {
      res.status(404)
      return res.json({
         message: "Booking couldn't be found",
         statusCode: 404
      });
   }

   if (new Date() >= booking.endDate) {
      res.status(403)
      return res.json({
         message: "Bookings that have been started can't be deleted",
         statusCode: 403
      });
   }

   await booking.destroy();
   return res.json({
      message: "Successfully deleted",
      statusCode: 200
   });
});

module.exports = router;
