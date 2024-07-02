import axios from 'axios';

export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/',
    headers: {
        'origin': 'http://localhost:5173'
    }
})
