import axios from 'axios';

export const http = axios.create({
    baseURL: "http://localhost:5000",
    headers:{ 
        "Content-Type": 'application/json/x-www-form-urlencoded',
    }
})

