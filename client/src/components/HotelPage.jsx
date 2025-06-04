import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function HotelPage() {
    const { id } = useParams()
    const [hotel, setHotel] = useState(null)

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/hotels-api/hotels/${id}`)
                setHotel(res.data.hotel)
            } catch (error) {
                console.error('Error loading hotel:', error)
            }
        }

        fetchHotel()
    }, [id])

    if (!hotel) return <p>Loading...</p>;

    return (
    <div>
        <h2>{hotel.name}</h2>
        <p>Location: {hotel.location}</p>
        <p>Rating: {hotel.rating}</p>
        <p>Price from: {hotel.bottomPrice}</p>
        <p>Description: {hotel.description}</p>
    </div>
    );
}