import axios, { AxiosInstance } from 'axios';
import https from 'https';

export const axiosInstance =(userId:string)=>{
    const url = process.env.ENV === "development" ? process.env.NEXT_PUBLIC_BACKEND_URL_DEV : process.env.NEXT_PUBLIC_BACKEND_URL_PROD;
    
    const instance:AxiosInstance = axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userId}`
        },
        httpsAgent : new https.Agent({
            rejectUnauthorized: false
        })
    })

    return instance;
}