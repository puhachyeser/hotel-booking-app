const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, UnauthorizedError } = require('../errors')

const getAllUsers = async (req, res) => {
    const users = await User.find()
    res.status(StatusCodes.OK).json({ users })
}

const getUser = async (req, res) => {
    const userId = req.params.id
    const user = await User.findOne({_id: userId})
    if (!user) {
        throw new NotFoundError(`No user with id ${userId}`)
    }
    res.status(StatusCodes.OK).json({ user })
}

const getMe = async (req, res) => {
    try {
        res.json({ user: req.user })
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

const updateUser = async (req, res) => {
    const {
        user: { userId},
        params: { id: subUserId }
    } = req

    const subUser = await User.findOne({_id: subUserId})
    if (!subUser) {
        throw new NotFoundError(`No user with id ${subUserId}`)
    }

    const user = await User.findOne({_id: userId})

    if (!user.isAdmin && ("isAdmin" in req.body || subUser._id !== user._id)) {
        throw new UnauthorizedError(`Unauthorized to update specified fields`)
    }

    const allowedFields = ['isAdmin', 'name']
    const updateData = {}
    for (const key of allowedFields) {
        if (key in req.body) updateData[key] = req.body[key]
    }

    Object.assign(subUser, updateData)
    await subUser.save()

    res.status(StatusCodes.OK).json({ updatedUser: subUser})
}

const deleteUser = async (req, res) => {
    const {
        user: { userId },
        params: { id: subUserId }
    } = req

    const subUser = await User.findOne({_id: subUserId})
    if (!subUser) {
        throw new NotFoundError(`No user with id ${subUserId}`)
    }

    const user = await User.findOne({_id: userId})

    if (!user.isAdmin && (subUser._id !== user._id)) {
        throw new UnauthorizedError(`Unauthorized to delete specified user`)
    }

    await User.findOneAndDelete({_id: subUserId})
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllUsers,
    getUser,
    getMe,
    updateUser,
    deleteUser
}