import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../axiosInstance'
import RoomModalGallery from '../components/RoomGallery'
import '../styles/Room.css'

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
    <div className='room-container'>
        <RoomModalGallery images={room.images} roomNumber={room.number} />
        <div className='room-upper-container'>
            <p className='room-type'><strong>Type:</strong> <span>{room.type}</span></p>
            <p className='room-price'><strong>UAH {room.price}</strong> per night</p>
        </div>
        <h3>About this room</h3>
        <p className='room-description'>{room.description}</p>
        {isLoggedIn ? (
            <Link to={`/hotels/${hotelId}/room/${room._id}/book`}>
                <button className='book-button'>Book</button>        
            </Link>
        ) : (
            <button className='book-button' onClick={handleClick}>Book</button>   
        )}
    </div>
    );
}