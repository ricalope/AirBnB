const express = require('express');
const router = express.Router();

const { User, Review, ReviewImage, Spot, SpotImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { Op } = require('sequelize');

const validateReviews = [
   check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
   check('stars')
      .exists({ checkFalsy: true })
      .withMessage('Stars must be an integer from 1 to 5'),
   handleValidationErrors
];

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
   const { url } = req.body;
   const review = await Review.findByPk(req.params.reviewId);
   if (!review) {
      res.status(404)
      return res.json({
         message: "Review couldn't be found",
         statusCode: 404
      });
   }

   const reviewImageCount = await ReviewImage.count({
      where: { reviewId: review.id }
   });
   if (reviewImageCount >= 10) {
      res.status(403)
      return res.json({
         message: "Maximum number of images for this resource was reached",
         statusCode: 403
      });
   }

   const newImage = await ReviewImage.create({ reviewId: review.id, url });
   const newReviewImage = await ReviewImage.findByPk(newImage.id, {
      attributes: [ 'id', 'url' ]
   });
   return res.status(201).json(newReviewImage)
});

router.get('/current', requireAuth, async (req, res) => {
   const Reviews = await Review.findAll({
      where: { userId: req.user.id },
      include: [
         { model: User, attributes: [ 'id', 'firstName', 'lastName' ] },
         { model: Spot, attributes: { exclude: [ 'description', 'createdAt', 'updatedAt' ] } },
         { model: ReviewImage, attributes: [ 'id', 'url' ] }
      ]
   });

   for (let review of Reviews) {
      const previewImage = await SpotImage.findOne({
         where: { spotId: review.Spot.id, preview: true },
         attributes: ['url'],
         raw: true
      });
      review.Spot.dataValues.previewImage = previewImage.url
   }

   return res.json({ Reviews })
});

router.put('/:reviewId', validateReviews, requireAuth, async (req, res, next) => {
   const { review, stars } = req.body;
   const currentReview = await Review.findByPk(req.params.reviewId);
   if (!currentReview) {
      res.status(404)
      return res.json({
         message: "Review couldn't be found",
         statusCode: 404
      });
   }

   const newReview = await currentReview.set({
      review,
      stars
   });
   await newReview.save();
   return res.json(newReview);
});

router.delete('/:reviewId', requireAuth, async (req, res, next) => {
   const review = await Review.findByPk(req.params.reviewId);
   if (!review) {
      res.status(404)
      return res.json({
         message: "Review couldn't be found",
         statusCode: 404
      });
   }
   await review.destroy();
   return res.json({ message: "Successfully deleted" });
});

module.exports = router;
