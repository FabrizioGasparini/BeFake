import axios from 'axios';

export default axios.create({
    baseURL: 'http://cors-anywhere.herokuapp.com/https://berealapi.fly.dev',
    headers: {
        'origin': 'http://localhost:5173/'
    }
})
