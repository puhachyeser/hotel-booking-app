const Hotel = require('../models/Hotel')
const { StatusCodes } = require('http-status-codes')

const getAllHotels = async (req, res) => {
    const hotels = await Hotel.find()
    res.status(StatusCodes.OK).json({ hotels, count: hotels.length })
}

const getHotel = async (req, res) => {
    const hotelId = req.params.id;

    const hotel = await Hotel.findOne({_id: hotelId})
    if (!hotel) {
        res.status(StatusCodes.NOT_FOUND).json("not found error")
        throw new NotFoundError(`No hotel with id ${hotelId}`)
    }
    res.status(StatusCodes.OK).json({ hotel })
}

const createHotel = async (req, res) => {
    const hotel = await Hotel.create(req.body)
    res.status(StatusCodes.CREATED).json({ hotel })
}

module.exports = {
    createHotel,
    getAllHotels,
    getHotel
}