import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

// Create Context
export const AuthContext = createContext();

// Provide Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Check if user is logged in
  const checkLoginStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        setUser({ loggedIn: true }); // Simulating a user object
      }
    } catch (error) {
      console.error('Error fetching token', error);
    } finally {
      setLoading(false);
    }
  };

  // Login Function
  const login = async (username, password) => {
    try {
      const response = await axiosInstance.post('/api/users/login', { username, password });
      const userToken = response.data.token;
      console.log(response);
      await AsyncStorage.setItem('token', userToken);
      setToken(userToken);
      setUser({ loggedIn: true });
      setUserDetails(response.data.user);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Logout Function
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading,userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};
