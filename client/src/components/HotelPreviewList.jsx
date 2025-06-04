import React, { useEffect, useState } from 'react'
import HotelPreview from './HotelPreview'
import axios from 'axios'

export default function HotelPreviewList() {
  const [hotels, setHotels] = useState([])
  
  useEffect(() => {
    const fetchHotels = async () => {
    try {
      const res = await axios.get('http://localhost:5000/hotels-api/hotels')
      setHotels(res.data.hotels)
    } catch (error) {
      console.error('Error while fetching hotels:', error)
    }
  }

    fetchHotels();
  }, [])

  return (
    <div>
      <h2>Hotel List</h2>
      <ul>
        {hotels.map(hotel => (
          <HotelPreview key={hotel._id} hotel={hotel} />
        ))}
      </ul>
    </div>
  );
}