import React, { useEffect, useState } from 'react'
import axiosInstance from "../axiosInstance"
import "../styles/Reviews.css"

export default function Reviews({ hotelId }) {
    const [reviews, setReviews] = useState([])
    /*
    useEffect(() => {
        
        const fetchReviews = async () => {
            try {
                const res = await axiosInstance.get(`/reviews`)
                let hotelReviews = res.data.reviews.filter(r => r.hotelId === hotelId)

                const reviewsWithUsers = await Promise.all(
                    hotelReviews.map(async (review) => {
                        try {
                            const userRes = await axiosInstance.get(`/users/${review.createdBy}`)
                            return { ...review, username: userRes.data.username }
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
    */

    return (
        <>
            <h3>Reviews</h3>
            {console.log(reviews)}
            {reviews.map((review) => {
                return(
                    <div key={review._id} className="review-container">
                        <p className="review-username">{review.createdBy}</p>
                        <p className="review-rating">{review.rating}</p>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                )
            })}
        </>
    )
}