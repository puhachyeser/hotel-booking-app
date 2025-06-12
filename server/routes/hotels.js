const express = require('express')
const authenticateUser = require('../middleware/authentication')

const router = express.Router()

const {
  createHotel,
  getAllHotels,
  getHotel,
  updateHotel,
  deleteHotel,
  bookHotel,
  unbookHotel,
  confirmBooking
} = require('../controllers/hotels')

router.route('/').get(getAllHotels)
router.route('/:id').get(getHotel)

router.route('/book/:id').post(authenticateUser, bookHotel)
router.route('/book/:id').delete(authenticateUser, unbookHotel)
router.route('/book/:id').patch(authenticateUser, confirmBooking)

router.route('/').post(authenticateUser, createHotel)
router.route('/:id').patch(authenticateUser, updateHotel)
router.route('/:id').delete(authenticateUser, deleteHotel)

module.exports = router