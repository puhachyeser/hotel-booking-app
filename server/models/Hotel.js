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
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    rooms: {
      type: [
        {
          number: {
            type: String,
            required: true
          },
          type: {
            type: String,
            enum: ['single', 'double', 'suite'],
            required: true
          },
          price: {
            type: Number,
            required: true
          },
          description: {
            type: String,
            default: 'Placeholder'
          },
        }
      ],
      validate: {
        validator: function (value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: 'Please provide at least one room'
      }
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    approved: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Hotel', HotelSchema)