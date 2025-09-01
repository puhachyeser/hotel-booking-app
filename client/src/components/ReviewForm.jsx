import React, { useState } from "react"
import axiosInstance from "../axiosInstance"
import "../styles/ReviewForm.css"

export default function ReviewForm({ hotelId }) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const [comment, setComment] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rating === 0 || comment.trim() === "") {
            alert("Please, fill in rating and comment fields.");
            return
        }

        try {
            setLoading(true)
            await axiosInstance.post(`/reviews`, { hotelId, rating, comment })
            setRating(0)
            setComment("")
        } catch (err) {
            console.error("Error while submitting review:", err)
            alert("Review submit failed.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <h3 className="review-title">Leave a review</h3>
            <div className="star-container">
                {[1, 2, 3, 4, 5].map((star) => {
                    const leftValue = (star - 1) * 2 + 1
                    const rightValue = star * 2
                    return (
                        <div key={star} className="star-wrapper">
                            <span
                            className="star left-star"
                            style={{
                                color: leftValue <= (hover || rating) ? "gold" : "gray"
                            }}
                            onClick={() => setRating(leftValue)}
                            onMouseEnter={() => setHover(leftValue)}
                            onMouseLeave={() => setHover(0)}
                            >
                                ★
                            </span>
                            <span
                            className="star right-star"
                            style={{
                                color: rightValue <= (hover || rating) ? "gold" : "gray"
                            }}
                            onClick={() => setRating(rightValue)}
                            onMouseEnter={() => setHover(rightValue)}
                            onMouseLeave={() => setHover(0)}
                            >
                                ★
                            </span>
                        </div>
                    )
                })}
            </div>
            <textarea
            className="review-textarea"
            placeholder="Your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" className="submit-review-btn" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>
        </form>
    )
}