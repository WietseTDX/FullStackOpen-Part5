import React, { useState } from 'react';
import loginManager from '../services/login'
import logger from '../logger'

const Login = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginManager.login({
        username,
        password
      });
      setUsername('');
      setPassword('');
      setUser(response);
      setNotification({
        message: "Succesfully logged in!",
        type: 'default'
      })
    } catch (error) {
      logger.info("Error: ", error)
      setError('Invalid username or password')
      setNotification({
        message: 'Invalid username or password',
        type: 'error'
      })
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(value) => setUsername(value.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(value) => setPassword(value.target.value)}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
