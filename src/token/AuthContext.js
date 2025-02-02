import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  email: '',
  userName: '',
  role: '',
  accessToken: '',
  user: {},
  login: (token, email, userName, role, user) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [user, setUser] = useState(localStorage.getItem('user') || {});

  useEffect(() => {
    // Redirect to /user only if the user is not on a public route
    const token = localStorage.getItem('accessToken');
    const publicRoutes = ['/', '/signin', '/signup', '/forgot-password', '/verify-email'];
    const currentPath = window.location.pathname;

    if (token && currentPath.startsWith('/user') && !publicRoutes.includes(currentPath)) {
      setAccessToken(token);
      setEmail(localStorage.getItem('email'));
      setUserName(localStorage.getItem('userName'));
      setRole(localStorage.getItem('role'));
      setUser(localStorage.getItem('user'));
      navigate(currentPath, { replace: true }); 
    }
  }, [navigate]);

  const login = (token, email, userName, role, user) => {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('email', email);
    localStorage.setItem('userName', userName);
    localStorage.setItem('role', role);
    localStorage.setItem('user', user);
    setAccessToken(token);
    setEmail(email);
    setUserName(userName);
    setRole(role);
    setUser(user);
    navigate('/user', { replace: true }); 
  };

  const logout = () => {
    localStorage.clear();
    setAccessToken('');
    setEmail('');
    setUserName('');
    setRole('');
    setUser({});
    navigate('/signin', { replace: true }); 
  };

  return (
    <AuthContext.Provider value={{ accessToken, email, userName, role, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
