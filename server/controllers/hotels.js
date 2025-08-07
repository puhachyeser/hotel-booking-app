const Hotel = require('../models/Hotel')
const Booking = require('../models/Booking')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, UnauthorizedError, BadRequestError } = require('../errors')
const checkHotelAccess = require('../utils/checkPermissions')

const getAllHotels = async (req, res) => {
    const limit = 5
    const page = parseInt(req.query.page)

    const hotels = await Hotel.find({ approved: true })
    .skip((page - 1) * limit)
    .limit(limit);

    const total = await Hotel.countDocuments({ approved: true })
    const totalPages = Math.ceil(total / limit)

    res.status(StatusCodes.OK).json({ hotels, totalPages, currentPage: page })
}

const getHotel = async (req, res) => {
    const hotelId = req.params.id

    const hotel = await Hotel.findOne({approved: true, _id: hotelId})
    if (!hotel) {
        throw new NotFoundError(`No approved hotel with id ${hotelId}`)
    }
    res.status(StatusCodes.OK).json({ hotel })
}

const getAllRooms = async (req, res) => {
    const hotelId = req.params.id
    const hotel = await Hotel.findOne({approved: true, _id: hotelId})
    if (!hotel) {
        throw new NotFoundError(`No approved hotel with id ${hotelId}`)
    }

    res.status(StatusCodes.OK).json({ rooms: hotel.rooms })
}

const getRoom = async (req, res) => {
    const {
        hotelId,
        roomId
    } = req.params

    const hotel = await Hotel.findOne({approved: true, _id: hotelId})
    if (!hotel) {
        throw new NotFoundError(`No approved hotel with id ${hotelId}`)
    }

    const room = hotel.rooms.find((room) => room._id == roomId)
    res.status(StatusCodes.OK).json({ room })
}

const createHotel = async (req, res) => {
    /*
    For admin created hotels to be aprroved on creation

    const user = await User.findOne({_id: req.user.userId})
    if (user.isAdmin) req.body.approved = true;
    */

    const { user: { userId } } = req
    req.body.createdBy = userId
    const user = await User.findOne({_id: userId})

    if (!user.isAdmin && req.body.approved !== undefined) {
        throw new UnauthorizedError('Only admins can approve hotels')
    }

    // change to another handling later?
    if (!user.isAdmin && req.body.rating !== undefined) {
        throw new UnauthorizedError('Only admins can change rating')
    }

    const hotel = await Hotel.create(req.body)
    res.status(StatusCodes.CREATED).json({ hotel })
}

const updateHotel = async (req, res) => {
    const {
        user: { userId },
        params: { id: hotelId },
    } = req

    const hotel = await Hotel.findOne({approved: true, _id: hotelId})
    if (!hotel) {
        throw new NotFoundError(`No approved hotel with id ${hotelId}`)
    }

    const user = await User.findOne({_id: userId})
    checkHotelAccess(user, hotel)

    if (!user.isAdmin && req.body.approved !== undefined) {
        throw new UnauthorizedError('Only admins can approve hotels')
    }

    // change to another handling later?
    if (!user.isAdmin && req.body.rating !== undefined) {
        throw new UnauthorizedError('Only admins can change rating')
    }

    Object.assign(hotel, req.body)
    if (req.body.rooms) {
        hotel.markModified('rooms')
    }
    await hotel.save()

    res.status(StatusCodes.OK).json({ updatedHotel: hotel })

    //const updatedHotel = await Hotel.findOneAndUpdate({_id: hotelId}, req.body, { new: true, runValidators: true })
    //res.status(StatusCodes.OK).json({ updatedHotel })
}

const deleteHotel = async (req, res) => {
    const {
        user: { userId },
        params: { id: hotelId },
    } = req

    const hotel = await Hotel.findOne({approved: true, _id: hotelId})
    if (!hotel) {
        throw new NotFoundError(`No approved hotel with id ${hotelId}`)
    }

    const user = await User.findOne({_id: userId})
    checkHotelAccess(user, hotel)

    await Hotel.findOneAndDelete({_id: hotelId}) // createdBy removed
    res.status(StatusCodes.OK).send()
}

const bookHotel = async (req, res) => {
    const {
        body: { checkInDate, checkOutDate, roomId },
        params: { id: hotelId },
    } = req

    const hotel = await Hotel.findOne({approved: true, _id: hotelId})
    if (!hotel) {
        throw new NotFoundError(`No approved hotel with id ${hotelId}`)
    }

    const room = hotel.rooms.find((r) => r._id.toString() === roomId.toString())
    if (!room) {
        throw new NotFoundError(`No room with id ${roomId} in this hotel`)
    }

    const overlapping = await Booking.findOne({
        hotelId, roomId,
        checkInDate: { $lt: new Date(checkOutDate) },
        checkOutDate: { $gt: new Date(checkInDate) }
    })

    if (overlapping) {
        throw new BadRequestError('This room is already booked for the selected dates')
    }

    req.body.createdBy = req.user.userId
    req.body.hotelId = hotelId
    const booking = await Booking.create(req.body)
    res.status(StatusCodes.CREATED).json({ booking })
}

const unbookHotel = async (req, res) => {
    const {
        user: { userId },
        params: { bookingId },
    } = req

    const booking = await Booking.findOneAndDelete({createdBy: userId, _id: bookingId})
    if (!booking) {
        throw new NotFoundError(`No bookings from this user at this hotel`)
    }
    res.status(StatusCodes.OK).send()
}

const confirmBooking = async (req, res) => {
    const {
        user: { userId },
        params: { bookingId },
    } = req
    const booking = await Booking.findOne({createdBy: userId, _id: bookingId})

    if (!booking) {
        throw new NotFoundError(`No bookings from this user at this hotel`)
    }

    if (booking.status !== 'pending') {
        throw new BadRequestError('Booking already confirmed')
    }

    booking.status = 'confirmed'
    await booking.save()

    res.status(StatusCodes.OK).json({ booking })
}

module.exports = {
    createHotel,
    getAllHotels,
    getHotel,
    getAllRooms,
    getRoom,
    updateHotel,
    deleteHotel,
    bookHotel,
    unbookHotel,
    confirmBooking
}