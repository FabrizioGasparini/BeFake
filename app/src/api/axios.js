import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080/https://berealapi.fly.dev',
    headers: {
        'origin': 'http://localhost:5173/'
    }
})
