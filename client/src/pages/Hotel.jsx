import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import HotelGalleryPreview from '../components/HotelGalleryPreview'
import RoomPreview from '../components/RoomPreview'
import Reviews from "../components/Reviews"
import ReviewForm from "../components/ReviewForm"
import axiosInstance from '../axiosInstance'
import { FaMapMarkerAlt } from "react-icons/fa"
import '../styles/Hotel.css'

export default function HotelPage() {
    const { id } = useParams()
    const { user, isLoggedIn } = useAuth()
    const [rooms, setRooms] = useState([])
    const [hotel, setHotel] = useState(null)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const res = await axiosInstance.get(`/hotels/${id}`)
                setHotel(res.data.hotel)
                setRooms(res.data.hotel.rooms)
            } catch (err) {
                console.error('Error loading hotel:', err)
            }
        }

        const fetchReviews = async () => {
            try {
                const res = await axiosInstance.get(`/reviews`)
                let hotelReviews = res.data.reviews.filter(r => r.hotelId === id)

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

        fetchHotel()
        fetchReviews()
    }, [id])

    if (!hotel) return <p>Loading...</p>

    const formCondition = isLoggedIn && user 
        ? reviews.some((r) => r.createdBy === user.userId) 
        : true

    return (
    <div>
        <h2 className="hotel-name">{hotel.name}</h2>
        <div className="hotel-location-container">
            <FaMapMarkerAlt className="hotel-location-icon"/>
            <span>{hotel.location}</span>
        </div>
        <div className="hotel-rating-container">
            <div className="hotel-rating">
                {hotel.rating}
            </div>
            <span>{hotel.reviewsCount} reviews</span>
        </div>
        <HotelGalleryPreview key={hotel._id} hotel={hotel} />
        <h3>About this hotel</h3>
        <p style={{ whiteSpace: 'pre-line' }}>{hotel.description}</p>
        <h3>Rooms</h3>
        <ul>
            {rooms.map(room => (
                <RoomPreview key={room._id} hotelId={hotel._id} room={room} />
            ))}
        </ul>
        <Reviews reviews={reviews} />
        {!formCondition && <ReviewForm hotelId={hotel._id} />}
    </div>
    );
}