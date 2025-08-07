import React, { useEffect, useState } from 'react'
import HotelPreview from '../components/HotelPreview'
import '../styles/HotelsPreview.css'
import axiosInstance from '../axiosInstance'

export default function HotelsPreview() {
  const [hotels, setHotels] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  
  useEffect(() => {
    const fetchHotels = async () => {
    try {
      const res = await axiosInstance.get(`/hotels?page=${page}`)
      setHotels(res.data.hotels)
      setTotalPages(res.data.totalPages)
    } catch (error) {
      console.error('Error while fetching hotels:', error)
    }
  }

    fetchHotels();
  }, [page])

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1)
  }

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1)
  }

  return (
  <div>
    <h2>Hotel List</h2>
    <ul className="hotel-list">
      {hotels.map(hotel => (
        <HotelPreview key={hotel._id} hotel={hotel} />
      ))}
    </ul>
    <div className="pagination">
      <button onClick={handlePrevious} disabled={page === 1}>
        ⬅️
      </button>
      <button onClick={handleNext} disabled={page === totalPages}>
        ➡️
      </button>
      <p>Page {page} of {totalPages}</p>
    </div>
  </div>
  );
}