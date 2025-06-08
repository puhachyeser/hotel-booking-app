const express = require('express')
const authenticateUser = require('../middleware/authentication')

const router = express.Router()

const {
  createHotel,
  getAllHotels,
  getHotel,
  updateHotel,
  deleteHotel
} = require('../controllers/hotels')

router.route('/').get(getAllHotels)
router.route('/:id').get(getHotel)

router.route('/').post(authenticateUser, createHotel)

// add admin or user(owner) auth
router.route('/:id').patch(authenticateUser, updateHotel)
router.route('/:id').delete(authenticateUser, deleteHotel)

module.exports = router