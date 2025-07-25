import { useEffect, useState } from "react"
import "../HotelGalleryPreview.css"
import HotelModalGallery from "./HotelModalGallery"

export default function HotelGalleryPreview ({ hotel }) {
    const [open, setOpen] = useState(false)

    const toggleGallery = () => setOpen(prev => !prev)

    useEffect(() => {
        if (open) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
    }, [open]);

    return(
    <>
        <div className="hotel-gallery" onClick={toggleGallery}>
            <div className="gallery-top">
                <div className="gallery-left">
                    <img src={`http://localhost:5000${hotel.images[0]}`} alt="Main" />
                </div>
                <div className="gallery-right">
                    <img src={`http://localhost:5000${hotel.images[1]}`} alt="Right 1" />
                    <img src={`http://localhost:5000${hotel.images[2]}`} alt="Right 2" />
                </div>
            </div>
            <div className="gallery-bottom">
                {hotel.images.slice(3, 7).map((img, idx) => (
                <img key={idx} src={`http://localhost:5000${img}`} alt={`Bottom ${idx}`} />
                ))}
                {hotel.images.length > 7 && (
                <div className="more-photos">
                    <div className="image-wrapper">
                        <img src={`http://localhost:5000${hotel.images[7]}`} alt="More" />
                        <div className="overlay">+{hotel.images.length - 7} more</div>
                    </div>
                </div>
                )}
            </div>
        </div>
        {open && (
        <HotelModalGallery images={hotel.images} onClose={toggleGallery} />
        )}
    </>
    );
}