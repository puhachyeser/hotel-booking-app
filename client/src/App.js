import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layouts/MainLayout'
import {
  HotelsPreview,
  Hotel,
  Room,
  Booking,
  Payment,
  Confirmation,
  Register,
  Login,
  EmailVerification
} from './pages'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HotelsPreview />} />
          <Route path="hotels/:id" element={<Hotel />} />
          <Route path="hotels/:hotelId/room/:roomId" element={<Room />} />
          <Route path="hotels/:hotelId/room/:roomId/book" element={<Booking />} />
          <Route path="hotels/:hotelId/room/:roomId/book/:bookingId/payment" element={<Payment />} />
          <Route path="hotels/:hotelId/room/:roomId/book/:bookingId/confirmation" element={<Confirmation />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="register/verify-email/:token" element={<EmailVerification />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App