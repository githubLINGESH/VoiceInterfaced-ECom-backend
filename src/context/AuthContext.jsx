import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth-check`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const { userId } = await response.json();
          if (userId) {
            setUserId(userId);
          } else {
            navigate('/login-page');
          }
        } else {
          navigate('/login-page');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        navigate('/login-page');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ userId, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
