const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema(
  {
    hotelId: {
      type: String,
      required: [true, 'Please provide hotel id'],
    },
    room: {
      type: Number,
      required: [true, 'Please provide room number'],
    },
    checkInDate: {
      type: Date,
      required: [true, 'Please provide check-in date'],
    },
    checkOutDate: {
      type: Date,
      required: [true, 'Please provide check-out date'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Booking', BookingSchema)