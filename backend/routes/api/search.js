const express = require('express');
const router = express.Router()

const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

router.use(express.json());

router.get('/', async (req, res) => {

    //DEVELOPMENT

    // const { spots, filter } = req.query;

    // let Spots = []
    // let newSpot;

    // if (filter === "city") {
    //     newSpot = await Spot.findAll({
    //         where: { city: { [Op.like]: `%${spots}%` } },
    //         include: { model: SpotImage, attributes: [ 'url', 'preview' ] }
    //     })
    // } else if (filter === "state") {
    //     newSpot = await Spot.findAll({
    //         where: { state: { [Op.like]: `%${spots}%` } },
    //         include: { model: SpotImage, attributes: [ 'url', 'preview' ] }
    //     })
    // } else if (filter === "address") {
    //     newSpot = await Spot.findAll({
    //         where: { address: { [Op.like]: `%${spots}%` } },
    //         include: { model: SpotImage, attributes: [ 'url', 'preview' ] }
    //     })
    // }
    // newSpot.forEach(s => Spots.push(s.toJSON()))
    // Spots.forEach(spot => {
    //     spot.SpotImages.forEach(pic => {
    //         if (pic.preview === true) {
    //             spot.imageUrl = pic.url

    //         }
    //     })
    //     delete spot.SpotImages
    // })

    // return res.json({ Spots })

    //PRODUCTION <-- COMMENT IN BELOW FOR PROD

    const { spots, filter } = req.query;

    let Spots = []
    let newSpot;

    if (filter === "city") {
        newSpot = await Spot.findAll({
            where: { city: { [Op.iLike]: `%${spots}%` } },
            include: { model: SpotImage, attributes: [ 'url', 'preview' ] }
        })
    } else if (filter === "state") {
        newSpot = await Spot.findAll({
            where: { state: { [Op.iLike]: `%${spots}%` } },
            include: { model: SpotImage, attributes: [ 'url', 'preview' ] }
        })
    } else if (filter === "address") {
        newSpot = await Spot.findAll({
            where: { address: { [Op.iLike]: `%${spots}%` } },
            include: { model: SpotImage, attributes: [ 'url', 'preview' ] }
        })
    }
    newSpot.forEach(s => Spots.push(s.toJSON()))
    Spots.forEach(spot => {
        spot.SpotImages.forEach(pic => {
            if (pic.preview === true) {
                spot.imageUrl = pic.url

            }
        })
        delete spot.SpotImages
    })

    return res.json({ Spots })
});

module.exports = router;
