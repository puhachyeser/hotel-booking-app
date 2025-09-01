const Review = require('../models/Review')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, ConflictError } = require('../errors')
const checkReviewAccess = require('../utils/checkPermissions')
const updateHotelRating = require('../services/updateHotelRating')

const getAllReviews = async (req, res) => {
    const reviews = await Review.find()
    res.status(StatusCodes.OK).json({ reviews })
}

const getReview = async (req, res) => {
    const reviewId = req.params.id
    const review = await Review.findOne({_id: reviewId})
    if (!review) {
        throw new NotFoundError(`No review with id ${reviewId}`)
    }
    res.status(StatusCodes.OK).json({ review })
}

const createReview = async (req, res) => {
    const { user: { userId } } = req

    const existingReview = await Review.findOne({createdBy: userId, hotelId: req.body.hotelId})
    if (existingReview) {
        throw new ConflictError(`Review created by user ${userId} already exists`)
    }

    req.body.createdBy = userId
    const newReview = await Review.create(req.body)
    updateHotelRating(req.body.hotelId)
    res.status(StatusCodes.CREATED).json({ newReview })
}

const updateReview = async (req, res) => {
    const {
        user: { userId },
        params: { id: reviewId },
    } = req

    const review = await Review.findOne({_id: reviewId})
    if (!review) {
        throw new NotFoundError(`No review with id ${reviewId}`)
    }

    const user = await User.findOne({_id: userId})
    checkReviewAccess(user, review)

    const allowedFields = ['rating', 'comment']
    const updateData = {}
    for (const key of allowedFields) {
        if (key in req.body) updateData[key] = req.body[key]
    }

    Object.assign(review, updateData)
    await review.save()

    updateHotelRating(review.hotelId)
    res.status(StatusCodes.OK).json({ updatedReview: review })
}

const deleteReview = async (req, res) => {
    const {
        user: { userId },
        params: { id: reviewId },
    } = req

    const review = await Review.findOne({_id: reviewId})
    if (!review) {
        throw new NotFoundError(`No review with id ${reviewId}`)
    }

    const user = await User.findOne({_id: userId})
    checkReviewAccess(user, review)

    await Review.findOneAndDelete({_id: reviewId})
    updateHotelRating(review.hotelId)
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
}