import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../axiosInstance'

export default function EmailVerificationPage() {
  const { token } = useParams()
  const [message, setMessage] = useState('Verifying your email...')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axiosInstance.patch(`/auth/verify-email/${token}`)
        setMessage('Registration has been successfully completed.')
      } catch (err) {
        console.error(err)
        setMessage('Email verification failed or token is invalid.')
      }
    }

    verifyEmail()
  }, [token]);

  return (
  <div className="email-verification-container">
    <h1>{message}</h1>
  </div>
  );
}
