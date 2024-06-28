import axios from 'axios';

export default axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/https://berealapi.fly.dev',
    headers: {
        'origin': 'https://fabriziogasparini.github.io/BeFake'
    }
})
