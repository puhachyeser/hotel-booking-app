import React, { useState } from 'react'
import axios from 'axios'

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [message, setMessage] = useState('')

    const handleChange = e => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            await axios.post('http://localhost:5000/hotels-api/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            })

            setMessage('Verify your email to complete registration.')
            setFormData({ name: '', email: '', password: '', confirmPassword: '' })
        } catch (err) {
            console.error(err)
            setMessage('Registration failed')
        }
    }

    return(
        <div className="register-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <p>Name</p>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

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

                <p>Confirm Password</p>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}