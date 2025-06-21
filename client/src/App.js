import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/MainLayout'
import HotelPreviewList from './components/HotelPreviewList'
import HotelPage from './components/HotelPage'
import RoomPage from './components/RoomPage'
import BookingPage from './components/BookingPage'
import PaymentPage from './components/PaymentPage'
import ConfirmationPage from './components/ConfirmationPage'
import Register from './components/Register'
import Login from './components/Login'
import EmailVerificationPage from './components/EmailVerificationPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HotelPreviewList />} />
          <Route path="hotels/:id" element={<HotelPage />} />
          <Route path="hotels/:hotelId/room/:roomId" element={<RoomPage />} />
          <Route path="hotels/:hotelId/room/:roomId/book" element={<BookingPage />} />
          <Route path="hotels/:hotelId/room/:roomId/book/:bookingId/payment" element={<PaymentPage />} />
          <Route path="hotels/:hotelId/room/:roomId/book/:bookingId/confirmation" element={<ConfirmationPage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="register/verify-email/:token" element={<EmailVerificationPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App