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
      default: 0
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
    },
    images: [String],
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
          images: [String]
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

HotelSchema.pre('validate', function (next) {
  if (this.rooms && this.rooms.length > 0) {
    const prices = this.rooms.map(room => room.price)
    this.bottomPrice = Math.min(...prices)
  }
  next()
})

module.exports = mongoose.model('Hotel', HotelSchema)