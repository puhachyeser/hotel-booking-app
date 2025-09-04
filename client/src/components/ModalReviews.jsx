import React, { useState } from 'react'
import '../styles/ModalReviews.css'

export default function ModalReviews({ reviews, onClose }) {
    const [page, setPage] = useState(1)
    const totalPages = Math.ceil(reviews.length / 5)

    const handlePrevious = () => {
        if (page > 1) setPage(page - 1)
    }

    const handleNext = () => {
        if (page < totalPages) setPage(page + 1)
    }

    return (
    <div className="modal-reviews-overlay" onClick={onClose}>
        <div className="modal-reviews" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={onClose}>×</button>
            <div className="reviews-list">
                {reviews.slice(5 * (page - 1), (5 * (page - 1)) + 5).map((review, idx) => (
                    <div key={idx} className="modal-review">
                        <div>
                            <p className='review-username'>{review.username}</p>
                            <p className='review-rating'>{review.rating}</p>
                        </div>
                        <p className='review-comment'>{review.comment}</p>
                    </div>
                ))}
            </div>
            <div className="reviews-pagination">
                <button onClick={handlePrevious} disabled={page === 1}>
                    ←
                </button>
                <button onClick={handleNext} disabled={page === totalPages}>
                    →
                </button>
                <p>Page {page} of {totalPages}</p>
            </div>
        </div>
    </div>
    );
}