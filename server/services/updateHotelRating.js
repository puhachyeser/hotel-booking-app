const Hotel = require('../models/Hotel')
const Review = require('../models/Review')
const mongoose = require('mongoose')

const updateHotelRating = async (hotelId) => {
    const result = await Review.aggregate([
        { $match: { hotelId: new mongoose.Types.ObjectId(hotelId) } },
        {
            $group: {
                _id: null,
                avg: { $avg: '$rating' },
                count: { $sum: 1 }
            }
        }
    ])

    const averageRating = result[0]?.avg || 0
    const count = result[0]?.count || 0

    await Hotel.findByIdAndUpdate(hotelId, {
        rating: averageRating.toFixed(1),
        reviewsCount: count
    })
}

module.exports = updateHotelRating