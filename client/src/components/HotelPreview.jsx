import { Link } from "react-router-dom"

export default function HotelPreview ({ hotel }) {
    return(
    <li className="hotel-preview">
        <Link to={`/hotels/${hotel._id}`}>
            <strong>{hotel.name}</strong> ~ {hotel.location} ~ Rating: {hotel.rating} ~ Bottom Price: {hotel.bottomPrice}
        </Link>
    </li>
    );
}