import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [message, setMessage] = useState('')

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/hotels-api/auth/login', {
                email: formData.email,
                password: formData.password,
            })

            setMessage('Login is successful')
            setFormData({ email: '', password: '' })
        } catch (err) {
            console.error(err)
            setMessage(err.response?.data?.msg || 'Login failed')
        }
    }

    return(
        <div className="register-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <p>Email</p>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <p>Password</p>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}