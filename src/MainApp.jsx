import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Box, Button, CircularProgress } from '@mui/material';
import { FiChevronDown, FiCalendar } from 'react-icons/fi';

axios.defaults.withCredentials = true;
import { useAuth, useFfService } from './features/fantasyFootball/hooks';

const Component1 = <Box><FiChevronDown/></Box>
const Component2 = <Box><FiCalendar/></Box>

export const App = () => {
    const authService = useAuth();
    const ffService = useFfService();

    useEffect(() => {

        authService.getYahooAuthStatus();
    }, []);

  if (authService.isLoading) return <CircularProgress />;
  
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={authService.isYahooAuthenticated ? <Dashboard/> : <Navigate to='/login'/>} 
        />
        <Route 
          path="/login" 
          element={<Login/>} 
        />
      </Routes>
    </Router>
  );
}

const Login = () => {
  const handleLogin = () => {
    window.location.href = '/auth/yahoo/login';
  };

  return (
    <Box>
      <h1>Welcome</h1>
      <Button onClick={handleLogin}>Log in</Button>
      {Component1}
    </Box>
  );
};

const Dashboard = () => {
    const handleLogout = async () => {
        try {
          await axios.get('/auth/yahoo/logout');  // Changed from '/auth/logout' to '/logout'
          window.location.href = '/login';
        } catch (error) {
          console.error('Error logging out:', error);
        }
    };
    const getProtected = async () => {
        const response = await axios.get('/api/yahoo/fantasy-content/2024');
        console.log(response,'response!!!')
    }
    useEffect(() => {
        getProtected();
    }, []);

  return (
    <Box>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout}>Log out</Button>
      {Component2}
    </Box>
  );
};
