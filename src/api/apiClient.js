import axios from 'axios';

// Development mode flag
const isDevMode = __DEV__; // React Native sets __DEV__ to true in development mode

// Dummy responses for development mode
const dummyResponses = {
  "/login": { token: "dummy_token" },
  "/adduser": { message: "User added successfully" },
  "/listuser": { users: ["User1", "User2", "User3"] },
  "/addpayement": { message: "Payment added successfully" },
};

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://10.0.2.2:8080", // Change this when backend is ready
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, 
});

// Add an interceptor
apiClient.interceptors.request.use((config) => {
  // Add Authorization header
  (config) => {
  config.headers.Authorization = `Bearer YOUR_ACCESS_TOKEN`;
    console.log('Request sent:', config);
    return config;
  },
  (error) => Promise.reject(error)
});

// Add a response interceptor to return dummy data in development mode
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isDevMode) {
      const path = new URL(error.config.url, "http://10.0.2.2:8080").pathname;
      if (dummyResponses[path]) {
        return Promise.resolve({ data: dummyResponses[path], status: 200 });
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
