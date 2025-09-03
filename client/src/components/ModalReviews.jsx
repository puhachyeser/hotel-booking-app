import '../styles/ModalReviews.css'

export default function ModalReviews({ reviews, onClose }) {
  return (
    <div className="modal-reviews-overlay" onClick={onClose}>
        <div className="modal-reviews" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>×</button>
            <div className="reviews-list">
                {reviews.map((review, idx) => (
                    <div key={idx} className="modal-review">
                        <div>
                            <p className='review-username'>{review.username}</p>
                            <p className='review-rating'>{review.rating}</p>
                        </div>
                        <p className='review-comment'>{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}