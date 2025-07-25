import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../axiosInstance'
import RoomModalGallery from '../components/RoomGallery'

export default function Room() {
    const { hotelId, roomId } = useParams()
    const [room, setRoom] = useState(null)
    const { isLoggedIn } = useAuth()

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

    const handleClick = () => {
        alert('Please log in to make a booking.')
    }

    return (
    <div>
        <RoomModalGallery images={room.images} roomNumber={room.number} />
        <p>{room.number}</p>
        <p>{room.type}</p>
        <p>{room.price}</p>
        <p style={{ whiteSpace: 'pre-line' }}>{room.description}</p>
        {isLoggedIn ? (
            <Link to={`/hotels/${hotelId}/room/${room._id}/book`}>
                <button>Book</button>        
            </Link>
        ) : (
            <button onClick={handleClick}>Book</button>   
        )}
    </div>
    );
}