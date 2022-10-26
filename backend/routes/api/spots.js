const express = require('express');
const router = express.Router();

const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
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

router.get('/current', async (req, res, next) => {
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
   const allSpots = await Spot.findAll({
      include: [
         { model: SpotImage },
         { model: Review }
      ]
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

   return res.json({ Spots })
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
