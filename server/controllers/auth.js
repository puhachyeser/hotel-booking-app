const User = require('../models/User')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })

  const emailToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '10m' }
  )

  const mailConfigurations = {
    from: 'yehorpuhach@gmail.com',
    to: `${req.body.email}`,
    subject: 'Email Verification',
    
    text: `Hi! You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:3000/register/verify-email/${emailToken} 
           Thanks`
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  transporter.sendMail(mailConfigurations, function(err, info) {
    if (err) throw Error(err)
    console.log('Email sent successfully')
    // console.log(info)
    // console.log(emailToken)
  })

  // const token = user.createJWT()
  // res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }})    
}

const verifyEmail = async (req, res) => {
  const { token: emailToken } = req.params

  const payload = jwt.verify(emailToken, process.env.JWT_SECRET)
  const user = await User.findOne({ email: payload.email })

  if (!user) {
    throw new UnauthenticatedError('Invalid Token')
  }

  user.isVerified = true
  await user.save()
  //const token = user.createJWT()
  //res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

  res.status(StatusCodes.OK).json({ user: { name: user.name }}) 
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  if (!user.isVerified) {
    throw new UnauthenticatedError('User is not verified')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })    
}

module.exports = {
  register,
  login,
  verifyEmail
}