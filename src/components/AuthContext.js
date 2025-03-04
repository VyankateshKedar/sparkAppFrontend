// components/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create auth context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // Verify token with backend
        const response = await fetch('https://sparkappbackend-2.onrender.com/api/auth/current-user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Token invalid, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth verification error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch('https://sparkappbackend-2.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store auth data
      localStorage.setItem('authToken', data.token);
      
      // Fetch user data
      const userResponse = await fetch('https://sparkappbackend-2.onrender.com/api/auth/current-user', {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await fetch('https://sparkappbackend-2.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store auth data
      localStorage.setItem('authToken', data.token);
      
      // Fetch user data or create from registration data
      const userInfo = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        username: userData.username
      };
      
      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    return !!user;
  };

  const authContextValue = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isLoading
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
