const express = require('express');
const router = express.Router();

const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { Op } = require('sequelize');

router.use(express.json());

const validateSpot = [
   check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
   check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
   check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
   check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
   check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
   check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
   check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
   check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
   check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
   handleValidationErrors
]

const validateReview = [
   check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
   check('stars')
      .exists({ checkFalsy: true })
      .withMessage('Stars must be an integer from 1 to 5'),
   handleValidationErrors
]

router.get('/current', requireAuth, async (req, res, next) => {
   const userSpots = await Spot.findAll({
      where: { ownerId: req.user.id },
      // where: { ownerId: 1 }, // <<----- just for testing locally
      include: [
         { model: SpotImage },
         { model: Review }
      ]
   });
   const Spots = []
   userSpots.forEach(spot => Spots.push(spot.toJSON()));
   Spots.forEach(spot => {
      let count = 0
      let sum = 0
      spot.Reviews.forEach(review => {
         count++
         sum += review.stars
      });
      spot.avgRating = sum / count

      spot.SpotImages.forEach(pic => {
         if (pic.preview === true) {
            spot.previewImage = pic.url
         }
      });
      delete spot.Reviews
      delete spot.SpotImages
   });
   return res.json({ Spots })
});

router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
   let { startDate, endDate } = req.body;
   const spot = await Spot.findByPk(req.params.spotId);
   if (!spot) {
      res.status(404)
      return res.json({
         message: "Spot couldn't be found",
         statusCode: 404
      });
   }
   startDate = new Date(startDate);
   endDate = new Date(endDate)
   if (startDate >= endDate) {
      res.status(400)
      return res.json({
         message: "Validation Error",
         statusCode: 400,
         errors: {
            endDate: "endDate cannot be on or before startDate"
         }
      });
   }

   const bookedSpot = await Booking.findAll({
      where: {
         spotId: spot.id,
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
            message: "Sorry this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
               startDate: "Start date conflicts with an existing booking",
               endDate: "End date conflicts with an existing booking"
            }
         });
      }
   }

   const newBooking = await Booking.create({
      spotId: spot.id,
      userId: req.user.id,
      startDate,
      endDate
   });
   return res.status(201).json(newBooking);
});

router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
   const spotId = +req.params.spotId;
   const spot = await Spot.findByPk(spotId);
   if (!spot) {
      res.status(404)
      return res.json({
         message: "Spot couldn't be found",
         statusCode: 404
      });
   }

   let Bookings;
   if (req.user.id === spot.ownerId) {
      Bookings = await Booking.findAll({
         where: { spotId: spot.id },
         include: { model: User }
      });
   } else if (req.user.id !== spot.ownerId) {
      Bookings = await Booking.findAll({
         where: { spotId: spot.id },
         attributes: ['spotId', 'startDate', 'endDate']
      });
   }
   return res.json({ Bookings })
});

router.get('/:spotId/reviews', async (req, res, next) => {
   const spot = await Spot.findByPk(req.params.spotId);
   if (!spot) {
      res.status(404)
      return res.json({
         message: "Spot couldn't be found",
         statusCode: 404
      });
   }
   const Reviews = await Review.findAll({
      where: { spotId: spot.id },
      include: [
         { model: User, attributes: ['id', 'firstName', 'lastName'] },
         { model: ReviewImage, attributes: ['id', 'url'] }
      ]
   });
   return res.json({ Reviews });
});

router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res, next) => {
   const { review, stars } = req.body;
   const spot = await Spot.findByPk(req.params.spotId);

   if (!spot) {
      res.status(404);
      return res.json({
         message: "Spot couldn't be found",
         statusCode: 404
      });
   }

   const reviewExists = await Review.findOne({
      where: {
         [Op.and]: [
            { userId: req.user.id },
            { spotId: spot.id }
         ]
      }
   });

   if (reviewExists) {
      res.status(403)
      return res.json({
         message: "User already has a review for this spot",
         statusCode: 403
      });
   }

   const newReview = await Review.create({
      userId: req.user.id,
      spotId: spot.id,
      review,
      stars
   });
   return res.status(201).json(newReview)
});

router.post('/:spotId/images', requireAuth, async (req, res, next) => {
   const { url, preview } = req.body;
   const spot = await Spot.findByPk(req.params.spotId);

   if (!spot) {
      res.status(404)
      return res.json({
         message: "Spot couldn't be found",
         statusCode: 404
      });
   }
   const newImage = await SpotImage.create({ spotId: spot.id, url, preview });
   return res.status(201).json(newImage)
});

router.get('/', async (req, res, next) => {
   let { page, size } = req.query;
   page = (page === undefined) ? 1 : parseInt(page);
   size = (size === undefined) ? 20 : parseInt(size);

   const pagination = {}
   if (page > 10) page = 10;
   if (size > 20) size = 20;
   if (page > 0 && size > 0) {
      pagination.limit = size;
      pagination.offset = size * (page - 1);
   } else if (page <= 0 && size <= 0) {
      res.status(400)
      return res.json({
         message: "Validation Error",
         statusCode: 400,
         errors: {
            page: "Page must be greater than or equal to 1",
            size: "Size must be greater than or equal to 1"
         }
      });
   }

   const allSpots = await Spot.findAll({
      include: [
         { model: SpotImage },
         { model: Review }
      ],
      ...pagination
   });

   const Spots = []
   allSpots.forEach(spot => Spots.push(spot.toJSON()));
   Spots.forEach(spot => {
      let count = 0
      let sum = 0
      spot.Reviews.forEach(review => {
         count++
         sum += review.stars
      });
      spot.avgRating = sum / count

      spot.SpotImages.forEach(pic => {
         if (pic.preview === true) {
            spot.previewImage = pic.url
         }
      });
      delete spot.Reviews
      delete spot.SpotImages
   });

   return res.json({ Spots, page, size })
});

router.post('/', validateSpot, requireAuth, async (req, res, next) => {
   const { address, city, state, country, lat, lng, name, description, price } = req.body;
   const createdSpot = await Spot.create({
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
   });
   return res.status(201).json(createdSpot)
});

router.get('/:spotId', async (req, res, next) => {
   let spot = await Spot.findByPk(req.params.spotId, {
      include: [
         { model: Review },
         { model: SpotImage, attributes: ['id', 'url', 'preview'] },
         { model: User, attributes: ['id', 'firstName', 'lastName'] }
      ]
   });

   if (!spot) {
      res.status(404)
      return res.json({
         message: "Spot couldn't be found",
         statusCode: 404
      });
   }

   spot = spot.toJSON();
   let count = 0
   let sum = 0
   spot.Reviews.forEach(review => {
      count++
      sum += review.stars
   });
   spot.numReviews = count;
   spot.avgStarRating = sum / count;
   delete spot.Reviews;

   spot.Owner = spot.User;
   delete spot.User

   return res.json(spot)
});

router.put('/:spotId', validateSpot, requireAuth, async (req, res, next) => {
   const { address, city, state, country, lat, lng, name, description, price } = req.body;
   const spot = await Spot.findByPk(req.params.spotId)

   if (!spot) {
      res.status(404)
      return res.json({
         message: "Spot couldn't be found",
         statusCode: 404
      });
   }

   const updatedSpot = spot.set({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
   });

   await updatedSpot.save();
   res.json(updatedSpot)
});

router.delete('/:spotId', requireAuth, async (req, res, next) => {
   const spot = await Spot.findByPk(req.params.spotId);
   if (!spot) {
      res.status(404)
      return res.json({
         message: "Spot couldn't be found",
         statusCode: 404
      });
   }
   await spot.destroy();
   return res.json({
      message: "Successfully deleted",
      statusCode: 200
   });
});

module.exports = router;
