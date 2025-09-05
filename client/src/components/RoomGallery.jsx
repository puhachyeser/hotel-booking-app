import { useState } from "react"
import '../styles/RoomGallery.css'

export default function RoomGallery({ images, roomNumber }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    if (!images || images.length === 0) return null

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        )
    }

    const nextImage = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        )
    }

    return (
        <div className="room-gallery-slider">
            <div className="slider-image-container">
                <img
                    src={`${process.env.REACT_APP_API_URL}${images[currentIndex]}`}
                    alt={`Room ${roomNumber} pic`}
                    className="room-image-slider"
                />
                <button className="arrow left" onClick={prevImage}>←</button>
                <button className="arrow right" onClick={nextImage}>→</button>
            </div>
            <div className="slider-dots">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`dot ${idx === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(idx)}
                    ></span>
                ))}
            </div>
        </div>
    )
}