import React from 'react'; // Update with the actual path
import { useAuth } from '../../../../token/AuthContext';

const Home = () => {
  const { logout } = useAuth();

  return (
    <div style={{ margin: '70px' }}>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
