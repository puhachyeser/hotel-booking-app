const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide hotel id'],
    },
    roomId: {
      type: mongoose.Types.ObjectId,
      required: [true, 'Please provide room id']
    },
    checkInDate: {
      type: Date,
      required: [true, 'Please provide check-in date'],
    },
    checkOutDate: {
      type: Date,
      required: [true, 'Please provide check-out date'],
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending'
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