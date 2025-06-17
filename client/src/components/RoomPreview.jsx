import { Link } from "react-router-dom"

export default function RoomPreview ({ hotelId, room }) {
    return(
        <li>
            <Link to={`/hotels/${hotelId}/room/${room._id}`}>
                <strong>{room.number}</strong> ~ {room.type} ~ Price: {room.price}
            </Link>
        </li>
    );
}