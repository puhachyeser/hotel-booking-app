const { UnauthenticatedError } = require('../errors')

const checkHotelAccess = (user, hotel) => {
  const isOwner = hotel.createdBy.toString() === user._id.toString()
  const isAdmin = user.isAdmin
  if (!isOwner && !isAdmin) {
    throw new UnauthenticatedError('Not authorized')
  }
}

const checkReviewAccess = (user, review) => {
  const isReviewer = review.createdBy.toString() === user._id.toString()
  const isAdmin = user.isAdmin
  if (!isReviewer && !isAdmin) {
    throw new UnauthenticatedError('Not authorized')
  }
}

module.exports = checkHotelAccess, checkReviewAccess