const cron = require('node-cron')
const Booking = require('../models/Booking')

const deleteExpiredBookings = async () => {
  const expiryTime = new Date(Date.now() - (15 * 60 * 1000))

  try {
    const result = await Booking.deleteMany({
        status: 'pending',
        createdAt: { $lt: expiryTime }
    })

    if (result.deletedCount > 0) {
        console.log(`[${new Date().toISOString()}] Deleted ${result.deletedCount} expired pending bookings.`)
    }
  } catch (err) {
    console.error('Error deleting expired bookings:', err)
  }
}

cron.schedule('* * * * *', () => {
  deleteExpiredBookings()
})