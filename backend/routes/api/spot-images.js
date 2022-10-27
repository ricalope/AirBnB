const express = require('express');
const router = express.Router();

const { SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.delete('/:imageId', requireAuth, async (req, res, next) => {
   const image = await SpotImage.findByPk(req.params.imageId);
   if (!image) {
      res.status(404)
      return res.json({
         message: "Spot Image couldn't be found",
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
