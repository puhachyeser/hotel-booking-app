import { Link } from "react-router-dom"
import '../styles/HotelPreview.css'

export default function HotelPreview ({ hotel }) {
    return(
    <li className="hotel-preview">
        <Link to={`/hotels/${hotel._id}`}>
            <img
                src={`${REACT_APP_API_URL}${hotel.images?.[0]}`}
                alt={hotel.name}
                className="preview-hotel-img"
            />
            <p className="preview-hotel-name">{hotel.name}</p>
            <p className="preview-hotel-location">{hotel.location}</p>
            <div className="preview-hotel-rating-container">
                <div className="preview-hotel-rating">
                    {hotel.rating}
                </div>
                <span>{hotel.reviewsCount} reviews</span>
            </div>
            <p className="preview-hotel-price"><span>Starting from</span> <strong>UAH {hotel.bottomPrice}</strong></p>
        </Link>
    </li>
    );
}