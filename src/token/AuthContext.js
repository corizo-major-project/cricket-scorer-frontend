import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  email: '',
  userName: '',
  role: '',
  accessToken: '',
  login: (token, email, userName, role) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  useEffect(() => {
    // Redirect to /user only if the user is not on a public route
    const token = localStorage.getItem('accessToken');
    const publicRoutes = ['/', '/signin', '/signup', '/forgot-password', '/verify-email'];
    const currentPath = window.location.pathname;

    if (token && !publicRoutes.includes(currentPath)) {
      setAccessToken(token);
      setEmail(localStorage.getItem('email'));
      setUserName(localStorage.getItem('userName'));
      setRole(localStorage.getItem('role'));
      navigate('/user', { replace: true }); // Avoid back navigation
    }
  }, [navigate]);

  const login = (token, email, userName, role) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('email', email);
    localStorage.setItem('userName', userName);
    localStorage.setItem('role', role);
    setAccessToken(token);
    setEmail(email);
    setUserName(userName);
    setRole(role);
    navigate('/user', { replace: true }); // Replace history to block back navigation
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken('');
    setEmail('');
    setUserName('');
    setRole('');
    navigate('/signin', { replace: true }); // Replace history on logout
  };

  return (
    <AuthContext.Provider value={{ accessToken, email, userName, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
