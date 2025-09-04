const express = require('express')
const authenticateUser = require('../middleware/authentication')
const router = express.Router()

const {
    getAllUsers,
    getUser,
    getMe,
    updateUser,
    deleteUser
} = require('../controllers/users')

router.route('/').get(getAllUsers)
router.route('/me').get(authenticateUser, getMe)
router.route('/:id').get(getUser)

router.route('/:id').patch(authenticateUser, updateUser)
router.route('/:id').delete(authenticateUser, deleteUser)

module.exports = router