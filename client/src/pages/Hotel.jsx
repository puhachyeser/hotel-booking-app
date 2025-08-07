import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HotelGalleryPreview from '../components/HotelGalleryPreview'
import RoomPreview from '../components/RoomPreview'
import ReviewForm from "../components/ReviewForm"
import axiosInstance from '../axiosInstance'
import '../styles/Hotel.css'

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
        <HotelGalleryPreview key={hotel._id} hotel={hotel} />
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
        <ReviewForm hotelId={hotel._id} />
    </div>
    );
}