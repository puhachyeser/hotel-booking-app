import { useParams, useNavigate, useLocation  } from 'react-router-dom'
import axios from '../axiosInstance'

export default function PaymentPage() {
    const { bookingId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const handlePayment = async () => {
        try {
            await axios.patch(`/hotels/book/${bookingId}`)
            const newPath = location.pathname.replace(/payment$/, 'confirmation')
            navigate(newPath)
        } catch (err) {
            console.error(err)
        }
    }

    return(
    <div>
        <h2>Payment Page</h2>
        <p>Simulate payment for booking ID: {bookingId}</p>
        <button onClick={handlePayment}>Simulate Payment</button>
    </div>
    )
}