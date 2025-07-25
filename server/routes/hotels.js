const express = require('express')
const authenticateUser = require('../middleware/authentication')

const router = express.Router()

const {
  createHotel,
  getAllHotels,
  getHotel,
  getAllRooms,
  getRoom,
  updateHotel,
  deleteHotel,
  bookHotel,
  unbookHotel,
  confirmBooking
} = require('../controllers/hotels')

router.route('/').get(getAllHotels)
router.route('/:id').get(getHotel)
router.route('/:id/rooms').get(getAllRooms)
router.route('/:hotelId/rooms/:roomId').get(getRoom)

router.route('/book/:id').post(authenticateUser, bookHotel)
router.route('/book/:bookingId').delete(authenticateUser, unbookHotel)
router.route('/book/:bookingId').patch(authenticateUser, confirmBooking)

router.route('/').post(authenticateUser, createHotel)
router.route('/:id').patch(authenticateUser, updateHotel)
router.route('/:id').delete(authenticateUser, deleteHotel)

module.exports = router