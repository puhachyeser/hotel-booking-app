const Review = require('../models/Review')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../errors')
const checkReviewAccess = require('../utils/checkPermissions')

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
    req.body.createdBy = userId
    const review = await Review.create(req.body)
    res.status(StatusCodes.CREATED).json({ review })
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
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
}