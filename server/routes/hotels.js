const express = require('express')

const router = express.Router()

const {
  createHotel,
  getAllHotels,
  getHotel
} = require('../controllers/hotels')

router.route('/').post(createHotel).get(getAllHotels)
router.route('/:id').get(getHotel)

//router.route('/:id').get().delete().patch()

module.exports = router