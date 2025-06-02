const Hotel = require('../models/Hotel')
const { StatusCodes } = require('http-status-codes')

const getAllHotels = async (req, res) => {
    const hotels = await Hotel.find()
    res.status(StatusCodes.OK).json({ hotels, count: hotels.length })
}

const createHotel = async (req, res) => {
    const hotel = await Hotel.create(req.body)
    res.status(StatusCodes.CREATED).json({ hotel })
}

module.exports = {
    createHotel,
    getAllHotels
}