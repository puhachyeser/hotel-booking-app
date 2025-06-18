import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RoomPreview from './RoomPreview'
import axiosInstance from '../axiosInstance'

export default function HotelPage() {
    const { id } = useParams()
    const [rooms, setRooms] = useState([])
    const [hotel, setHotel] = useState(null)

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const res = await axiosInstance.get(`/hotels/${id}`)
                setHotel(res.data.hotel)
                setRooms(res.data.hotel.rooms)
            } catch (err) {
                console.error('Error loading hotel:', err)
            }
        }

        fetchHotel()
    }, [id])

    if (!hotel) return <p>Loading...</p>

    return (
    <div>
        <h2>{hotel.name}</h2>
        <p>Location: {hotel.location}</p>
        <p>Rating: {hotel.rating}</p>
        <p>Price from: {hotel.bottomPrice}</p>
        <p style={{ whiteSpace: 'pre-line' }}>{hotel.description}</p>
        <h3>Rooms</h3>
        <ul>
            {rooms.map(room => (
                <RoomPreview key={room._id} hotelId={hotel._id} room={room} />
            ))}
        </ul>
    </div>
    );
}