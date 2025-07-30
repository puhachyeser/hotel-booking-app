import React, { useState } from "react"
import axiosInstance from "../axiosInstance"

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
            await axiosInstance.post(`/reviews`, {
                hotelId,
                rating,
                comment,
            })
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
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <h4>Leave a review</h4>
        <div style={{ display: "flex", gap: "5px", fontSize: "28px" }}>
        {[1, 2, 3, 4, 5].map((star) => {
            const leftValue = (star - 1) * 2 + 1
            const rightValue = star * 2
            return (
            <div key={star} style={{ position: "relative", display: "inline-block" }}>
                <span
                    style={{
                        cursor: "pointer",
                        color: leftValue <= (hover || rating) ? "gold" : "gray",
                        position: "absolute",
                        width: "50%",
                        overflow: "hidden",
                    }}
                    onClick={() => setRating(leftValue)}
                    onMouseEnter={() => setHover(leftValue)}
                    onMouseLeave={() => setHover(0)}
                >
                ★
                </span>
                <span
                    style={{
                        cursor: "pointer",
                        color: rightValue <= (hover || rating) ? "gold" : "gray",
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
        placeholder="Your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ display: "block", width: "100%", marginTop: "10px", padding: "8px" }}
        />
        <button type="submit" disabled={loading} style={{ marginTop: "10px" }}>
        {loading ? "Submitting..." : "Submit"}
        </button>
    </form>
  )
}