import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
  <nav>
    <Link to="/">Home</Link> |{' '}
    <Link to="/register">Registration</Link> |{' '}
    <Link to="/login">Login</Link>
    {isLoggedIn && (
      <>
        |{' '}
        <button onClick={handleLogout}>
          Exit
        </button>
      </>
    )}
  </nav>
  )
}