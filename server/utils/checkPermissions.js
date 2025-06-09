const { UnauthenticatedError } = require('../errors')

const checkHotelAccess = (user, hotel) => {
  const isOwner = hotel.createdBy.toString() === user._id.toString()
  const isAdmin = user.isAdmin
  if (!isOwner && !isAdmin) {
    throw new UnauthenticatedError('Not authorized')
  }
}

module.exports = checkHotelAccess