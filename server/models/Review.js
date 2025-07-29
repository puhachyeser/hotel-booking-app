const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Please provide hotel id']
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    comment: {
      type: String,
      maxlength: 1000,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', ReviewSchema)