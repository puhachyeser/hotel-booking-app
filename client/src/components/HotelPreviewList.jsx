import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function HotelPreviewList() {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
        const res = await axios.get('http://localhost:5000/hotels-api/hotels')
        setHotels(res.data.hotels)
    } catch (error) {
        console.error('Error while fetching hotels:', error)
    }
  };
  
  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div>
      <h2>Hotel List</h2>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel._id}>
            <strong>{hotel.name}</strong> ~ {hotel.location} ~ Rating: {hotel.rating} ~ Bottom Price: {hotel.bottomPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}