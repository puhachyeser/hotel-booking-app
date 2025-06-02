const express = require('express')

const router = express.Router()

const {
  createHotel,
  getAllHotels
} = require('../controllers/hotels')

router.route('/').post(createHotel).get(getAllHotels)

//router.route('/:id').get().delete().patch()

module.exports = router