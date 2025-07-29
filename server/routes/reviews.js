const express = require('express')
const authenticateUser = require('../middleware/authentication')
const router = express.Router()

const {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviews')

router.route('/').get(getAllReviews)
router.route('/:id').get(getReview)

router.route('/').post(authenticateUser, createReview)
router.route('/:id').patch(authenticateUser, updateReview)
router.route('/:id').delete(authenticateUser, deleteReview)

module.exports = router