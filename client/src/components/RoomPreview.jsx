import { Link } from "react-router-dom"
import { useAuth } from '../context/AuthContext'

export default function RoomPreview ({ hotelId, room }) {
    const { isLoggedIn } = useAuth()

    const handleClick = () => {
        alert('Please log in to make a booking.')
    }

    return(
    <li>
        <Link to={`/hotels/${hotelId}/room/${room._id}`}>
            <img
                src={`http://localhost:5000${room.images?.[0]}`}
                alt={room.number}
                className="room-preview-img"
            />        
            <strong>{room.number}</strong> ~ {room.type} ~ Price: {room.price}
        </Link>
        {isLoggedIn ? (
            <Link to={`/hotels/${hotelId}/room/${room._id}/book`}>
                <button>Book</button>        
            </Link>
        ) : (
            <button onClick={handleClick}>Book</button>   
        )}
    </li>
    );
}