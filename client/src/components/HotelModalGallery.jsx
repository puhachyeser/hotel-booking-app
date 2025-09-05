import '../styles/HotelModalGallery.css'

export default function ModalGallery({ images, onClose }) {
  return (
    <div className="modal-gallery-overlay" onClick={onClose}>
        <div className="modal-gallery" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>×</button>
            <div className="images-grid">
                {images.map((img, idx) => (
                <img key={idx} src={`${process.env.REACT_APP_API_URL}${img}`} alt={`Gallery ${idx}`} />
                ))}
            </div>
        </div>
    </div>
  );
}