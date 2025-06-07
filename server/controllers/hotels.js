const Hotel = require('../models/Hotel')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getAllHotels = async (req, res) => {
    const hotels = await Hotel.find()
    res.status(StatusCodes.OK).json({ hotels, count: hotels.length })
}

const getHotel = async (req, res) => {
    const hotelId = req.params.id;

    const hotel = await Hotel.findOne({_id: hotelId})
    if (!hotel) {
        res.status(StatusCodes.NOT_FOUND).json("Not found error")
        throw new NotFoundError(`No hotel with id ${hotelId}`)
    }
    res.status(StatusCodes.OK).json({ hotel })
}

const createHotel = async (req, res) => {
    req.body.createdBy = req.user.userId
    const hotel = await Hotel.create(req.body)
    res.status(StatusCodes.CREATED).json({ hotel })
}

const updateHotel = async (req, res) => {
    const {
        user: { userId },
        params: { id: hotelId },
    } = req

    const hotel = await Hotel.findOneAndUpdate({_id: hotelId, createdBy: userId}, req.body, { new: true, runValidators: true })
    if (!hotel) {
        res.status(StatusCodes.NOT_FOUND).json("Not found error")
        throw new NotFoundError(`No hotel with id ${hotelId}`)
    }
    res.status(StatusCodes.OK).json({ hotel })
}

const deleteHotel = async (req, res) => {
    const {
        user: { userId },
        params: { id: hotelId },
    } = req

    const hotel = await Hotel.findOneAndDelete({createdBy: userId, _id: hotelId})
    if (!hotel) {
        res.status(StatusCodes.NOT_FOUND).json("Not found error")
        throw new NotFoundError(`No hotel with id ${hotelId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    createHotel,
    getAllHotels,
    getHotel,
    updateHotel,
    deleteHotel
}