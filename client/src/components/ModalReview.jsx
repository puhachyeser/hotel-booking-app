import '../styles/ModalReview.css'

export default function ModalReview({ review, onClose }) {
  return (
    <div className="modal-review-overlay" onClick={onClose}>
        <div className="modal-review single" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>×</button>
            <div>
                <p className='review-username'>{review.username}</p>
                <p className='review-rating'>{review.rating}</p>
            </div>
            <p className='review-comment'>{review.comment}</p>
        </div>
    </div>
  );
}