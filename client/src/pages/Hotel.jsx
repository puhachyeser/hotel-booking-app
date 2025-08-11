import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HotelGalleryPreview from '../components/HotelGalleryPreview'
import RoomPreview from '../components/RoomPreview'
import ReviewForm from "../components/ReviewForm"
import axiosInstance from '../axiosInstance'
import { FaMapMarkerAlt } from "react-icons/fa"
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
        <h2 className="hotel-name">{hotel.name}</h2>
        <div className="hotel-location-container">
            <FaMapMarkerAlt className="hotel-location-icon"/>
            <span>{hotel.location}</span>
        </div>
        <div className="hotel-rating-container">
            <div className="hotel-rating">
                {hotel.rating}
            </div>
            <span>{hotel.reviewsCount} reviews</span>
        </div>
        <HotelGalleryPreview key={hotel._id} hotel={hotel} />
        <h3>About this hotel</h3>
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