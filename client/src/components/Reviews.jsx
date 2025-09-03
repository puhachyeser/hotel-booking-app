import React, { useEffect, useState } from 'react'
import axiosInstance from "../axiosInstance"
import "../styles/Reviews.css"
import ModalReview from "./ModalReview"
import ModalReviews from "./ModalReviews"

export default function Reviews({ hotelId }) {
    const [reviews, setReviews] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [openModalReview, setOpenReview] = useState(false)
    const [openModalReviews, setOpenReviews] = useState(false)
    const [selectedReview, setSelectedReview] = useState(null) 

    const toggleModalReview = () => setOpenReview(prev => !prev)
    const toggleModalReviews = () => setOpenReviews(prev => !prev)

    const handleReviewClick = (review) => {
        setSelectedReview(review)
        toggleModalReview()
    }

    useEffect(() => {
        if (openModalReview || openModalReviews) {
            document.body.classList.add('no-scroll')
        } else {
            document.body.classList.remove('no-scroll')
        }
    }, [openModalReview, openModalReviews]);

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
        if (currentIndex < reviews.length - 4) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const carouselReviews = reviews.slice(0, 6)

    return (
        <>
            <h3>Reviews</h3>
            <div className="reviews-carousel">
                <button onClick={prevSlide} disabled={currentIndex === 0} className="arrow-btn left">◀</button>
                <div className="reviews-window">
                    <div 
                        className="reviews-container"
                        style={{ transform: `translateX(calc(-${currentIndex * 11.1}rem` }}
                    >
                    {carouselReviews.map((review) => (
                        <div key={review._id} className="review-container" onClick={() => handleReviewClick(review)}>
                            <div>
                                <p className="review-username">{review.username}</p>
                                <p className="review-rating">{review.rating}</p>
                            </div>
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    ))}
                    </div>
                </div>
                <button onClick={nextSlide} disabled={currentIndex >= reviews.length - 4} className="arrow-btn right">▶</button>
            </div>
            <p onClick={toggleModalReviews}>Read all reviews</p>
            {openModalReview && (
            <ModalReview review={selectedReview} onClose={toggleModalReview} />
            )}
            {openModalReviews && (
            <ModalReviews reviews={reviews} onClose={toggleModalReviews} />
            )}
        </>
    )
}