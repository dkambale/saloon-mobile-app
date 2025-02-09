import axios from 'axios';
import DummyDetails from './Dummy';

const axiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:8080', // Replace with your API base URL
  timeout: 10000, // Optional: request timeout
});

const dummyResponses = {
  "/login": { token: "dummy_token" },
  "/adduser": { message: "User added successfully" },
  "/listuser": { users: ["User1", "User2", "User3"] },
  "/addpayement": { message: "Payment added successfully" },
};

// Interceptor to log requests (optional)
axiosInstance.interceptors.request.use(
  (config) => {
   // config.headers.Authorization = `Bearer YOUR_ACCESS_TOKEN`;
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
   // return Promise.resolve(DummyDetails.users); // Return dummy data
  }
);

export default axiosInstance;
