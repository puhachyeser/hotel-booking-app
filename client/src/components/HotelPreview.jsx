import { Link } from "react-router-dom"
import '../styles/HotelPreview.css'

export default function HotelPreview ({ hotel }) {
    return(
    <li className="hotel-preview">
        <Link to={`/hotels/${hotel._id}`}>
            <img
                src={`http://localhost:5000${hotel.images?.[0]}`}
                alt={hotel.name}
                className="hotel-preview-img"
            />
            <p><strong>{hotel.name}</strong></p>
            <p>{hotel.location}</p>
            <p>{hotel.rating}</p>
            <p>Starting from {hotel.bottomPrice}</p>
        </Link>
    </li>
    );
}