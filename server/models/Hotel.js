const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide hotel name'],
      maxlength: 50,
    },
    location: {
      type: String,
      required: [true, 'Please provide hotel location'],
      maxlength: 100,
    },
    rating: {
      type: Number,
      required: [true, 'Please provide rating'],
    },
    bottomPrice: {
      type: Number,
      required: [true, 'Please provide bottom price'],
    },
    /*
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    */
  },
  { timestamps: true }
)

module.exports = mongoose.model('Hotel', HotelSchema)