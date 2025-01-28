import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8080', // Replace with your API base URL
  timeout: 10000, // Optional: request timeout
});

// Interceptor to log requests (optional)
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Request sent:', config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle responses (optional)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error response:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
