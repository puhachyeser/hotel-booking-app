import React, { useEffect, useState } from 'react'
import axiosInstance from "../axiosInstance"
import "../styles/Reviews.css"

export default function Reviews({ hotelId }) {
    const [reviews, setReviews] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        
        const fetchReviews = async () => {
            try {
                const res = await axiosInstance.get(`/reviews`)
                let hotelReviews = res.data.reviews.filter(r => r.hotelId === hotelId)

                const reviewsWithUsers = await Promise.all(
                    hotelReviews.map(async (review) => {
                        try {
                            const userRes = await axiosInstance.get(`/users/${review.createdBy}`)
                            return { ...review, username: userRes.data.user.name }
                        } catch {
                            return { ...review, username: "Unknown" }
                        }
                    })
                )

                setReviews(reviewsWithUsers)
            } catch (err) {
                console.error('Error loading reviews:', err)
            }
        }

        fetchReviews()
    },  [hotelId])

    const nextSlide = () => {
        if (currentIndex < reviews.length - 3) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }


    return (
        <>
            <h3>Reviews</h3>
            <div className="reviews-carousel">
                <button onClick={prevSlide} disabled={currentIndex === 0} className="arrow-btn left">◀</button>
                <div className="reviews-container">
                {reviews.slice(currentIndex, currentIndex + 3).map((review) => {
                    return(
                        <div key={review._id} className="review-container">
                            <div>
                                <p className="review-username">{review.username}</p>
                                <p className="review-rating">{review.rating}</p>
                            </div>
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    )
                })}
                </div>
                <button onClick={nextSlide} disabled={currentIndex >= reviews.length - 3} className="arrow-btn right">▶</button>
            </div>
        </>
    )
}