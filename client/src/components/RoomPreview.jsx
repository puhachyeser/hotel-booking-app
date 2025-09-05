import { Link } from "react-router-dom"
import '../styles/RoomPreview.css'

export default function RoomPreview ({ hotelId, room }) {
    return(
    <li className="room-preview">
        <Link to={`/hotels/${hotelId}/room/${room._id}`}>
            <img
                src={`${REACT_APP_API_URL}${room.images?.[0]}`}
                alt={room.number}
                className="preview-room-img"
            />        
            <p className="preview-room-type"><strong>{room.type}</strong></p>
            <p className="preview-room-price"><strong>UAH {room.price}</strong> <span>per night</span></p>
        </Link>
    </li>
    );
}