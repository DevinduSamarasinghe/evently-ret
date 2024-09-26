import axios, { AxiosInstance } from 'axios';

// Fetching the CSRF token from the backend 
const getCSRFToken = async (url: string): Promise<string> => {
    const response = await axios.get(`${url}/csrf/token`, {
        withCredentials: true, // Include cookies in the request
    });

    // Get the CSRF token from the response
    const csrfToken = response.data.csrfToken;
    console.log("CSRF TOKEN from Backend:", csrfToken);

    return csrfToken; // Return the CSRF token
};


export const axiosInstance = async (token: string): Promise<AxiosInstance> => {
    const url = process.env.ENV === "development"
        ? process.env.NEXT_PUBLIC_BACKEND_URL_DEV
        : process.env.NEXT_PUBLIC_BACKEND_URL_PROD;

    // Fetch the CSRF token from the backend
    const csrfToken = await getCSRFToken(url);

    const instance: AxiosInstance = axios.create({
        baseURL: url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Attach JWT token
        },
        withCredentials: true, // Ensure cookies are sent with requests
    });
    
    // Add CSRF token dynamically only for state-changing requests
    instance.interceptors.request.use((config) => {
        if (['post', 'put', 'delete'].includes(config.method?.toLowerCase() || '')) {
            config.headers['X-CSRF-Token'] = csrfToken; // Attach CSRF token for state-changing requests
        }
        return config;
    });
    

    return instance;
};
