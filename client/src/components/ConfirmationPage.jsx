import { Link, useParams } from 'react-router-dom'

export default function ConfirmationPage() {
    const { bookingId } = useParams()

    return (
    <div>
        <h2>Booking Confirmed!</h2>
        <p>Your booking #{bookingId} has been confirmed.</p>
        <Link to={`/`}>
            <button>To the Main Page</button>
        </Link>
    </div>
    )
}