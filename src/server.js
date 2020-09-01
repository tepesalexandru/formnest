import axios from 'axios';

export default axios.create({
    baseURL: 'https://previewformnestserver.herokuapp.com/'
})