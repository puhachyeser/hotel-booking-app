import { Link } from "react-router-dom"
import '../styles/HotelPreview.css'

export default function HotelPreview ({ hotel }) {
    return(
    <li className="hotel-preview">
        <Link to={`/hotels/${hotel._id}`}>
            <img
                src={`http://localhost:5000${hotel.images?.[0]}`}
                alt={hotel.name}
                className="preview-img"
            />
            <p className="name">{hotel.name}</p>
            <p className="location">{hotel.location}</p>
            <div className="rating-container">
                <div className="rating">
                    {hotel.rating}
                </div>
                <span>{hotel.reviewsCount} reviews</span>
            </div>
            <p className="price"><span>Starting from</span> <strong>UAH {hotel.bottomPrice}</strong></p>
        </Link>
    </li>
    );
}