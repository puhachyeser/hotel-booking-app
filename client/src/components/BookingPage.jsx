import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import dayjs from 'dayjs'

export default function BookingPage() {
    const { hotelId, roomId } = useParams()
    const [room, setRoom] = useState(null)
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: ''
    })
    const [message, setMessage] = useState('')

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const res = await axiosInstance.get(`/hotels/${hotelId}/rooms/${roomId}`)
                setRoom(res.data.room)
            } catch (err) {
                console.error('Error loading room:', err)
            }
        }

        fetchRoom()
    }, [hotelId, roomId])

    if (!room) return <p>Loading...</p>

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const checkIn = dayjs(formData.checkInDate)
        const checkOut = dayjs(formData.checkOutDate)
        const today = dayjs().startOf('day')

        if (!checkIn.isValid() || !checkOut.isValid() || checkIn.isBefore(today) || !checkOut.isAfter(checkIn)) {
            setMessage('Invalid date')
            setFormData({ checkInDate: '', checkOutDate: '' })
            return
        }

        try {
            await axiosInstance.post(`/hotels/book/${hotelId}`, {
                roomId,
                checkInDate: formData.checkInDate,
                checkOutDate: formData.checkOutDate
            })

            setMessage('Pay for the booking to finish')
            setFormData({ checkInDate: '', checkOutDate: '' })
        } catch (err) {
            console.error(err)
            setMessage('Booking failed')
        }
    }

    const todayStr = dayjs().format('YYYY-MM-DD')
    const tomorrowStr = dayjs().add(1, 'day').format('YYYY-MM-DD')

    return (
        <div>
            <h2>Booking</h2>
            <form onSubmit={handleSubmit}>
                <p>Check In</p>
                <input
                    type="date"
                    name="checkInDate"
                    min={todayStr}
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                />
                <p>Check Out</p>
                <input
                    type="date"
                    name="checkOutDate"
                    min={tomorrowStr}
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Book</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    )
}