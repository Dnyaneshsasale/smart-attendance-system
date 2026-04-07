// frontend/src/api/axios.js
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api' // This points to your Node.js server
});

export default API;