const express = require('express');
const router = express.Router();

const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
   const image = await ReviewImage.findByPk(req.params.imageId);
   if (!image) {
      res.status(404)
      return res.json({
         message: "Review Image couldn't be found",
         statusCode: 404
      });
   }
   await image.destroy();
   return res.json({
      message: "Successfully deleted",
      statusCode: 200
   });
});

module.exports = router;
