import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/MainLayout'
import HotelPreviewList from './components/HotelPreviewList'
import HotelPage from './components/HotelPage'
import Register from './components/Register'
import EmailVerificationPage from './components/EmailVerificationPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HotelPreviewList />} />
          <Route path="hotels/:id" element={<HotelPage />} />
          <Route path="register" element={<Register />} />
          <Route path="register/verify-email/:token" element={<EmailVerificationPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App