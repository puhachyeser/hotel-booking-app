import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:5000/hotels-api',
    withCredentials: false
})

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

export default instance