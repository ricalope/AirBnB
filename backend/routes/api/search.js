const express = require('express');
const router = express.Router()

const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

router.use(express.json());

router.get('/', async (req, res) => {
    console.log('req.query',req.query)
    const spots = req.query.spots;
    let Spots = []

    if (req.query.filter === "city") {
        Spots =  await Spot.findAll({
            where: { city: { [Op.like]: `%${spots}%` }  },
            include: { model: SpotImage }
        })
        return res.json({ Spots })
    } else if (req.query.filter === "state") {
        Spots = await Spot.findAll({
            where: { state: { [Op.like]: `%${spots}%` } },
            include: { model: SpotImage }
        })
        return res.json({ Spots })
    } else if (req.query.filter === "address") {
        Spots = await Spot.findAll({
            where: { address: { [Op.like]: `%${spots}%` } },
            include: { model: SpotImage }
        })
        return res.json({ Spots })
    }
    else return res.json({})
});

module.exports = router;
