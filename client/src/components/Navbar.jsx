import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Navbar.css'

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
  <nav>
    <Link className="home-link" to="/">Home</Link>
    {!isLoggedIn && (
      <div>
        <Link to="/register">
          <button>
            Register
          </button>
        </Link>
        <Link to="/login">
          <button>
            Login
          </button>
        </Link>
      </div>
    )}
    {isLoggedIn && (
      <button onClick={handleLogout}>
        Exit
      </button>
    )}
  </nav>
  )
}