import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

export default function RoomPage() {
    const { hotelId, roomId } = useParams()
    const [room, setRoom] = useState(null)

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

    return (
    <div>
        <p>{room.number}</p>
        <p>{room.type}</p>
        <p>{room.price}</p>
        <p style={{ whiteSpace: 'pre-line' }}>{room.description}</p>
        <Link to={`/hotels/${hotelId}/room/${room._id}/book`}>
            <button>Book</button>        
        </Link>
    </div>
    );
}