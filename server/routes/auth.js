const express = require('express')
const router = express.Router()
const { register, login, verifyEmail } = require('../controllers/auth')
router.post('/register', register)
router.post('/login', login)
router.patch('/verify-email/:token', verifyEmail)

module.exports = router