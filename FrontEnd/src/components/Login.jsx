import React, { useState } from 'react'
import loginManager from '../services/login'
import logger from '../logger'
import PropTypes from 'prop-types'

const Login = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginManager.login({
        username,
        password
      })
      setUsername('')
      setPassword('')
      console.log(response.token)
      setUser(response)
      setNotification({
        message: 'Succesfully logged in!',
        type: 'default'
      })
    } catch (error) {
      logger.info('Error: ', error)
      setNotification({
        message: 'Invalid username or password',
        type: 'error'
      })
    }
  }

  return (
    <div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Username:</label>
            <input
              data-testid='Login-Username'
              type="text"
              value={username}
              onChange={(value) => setUsername(value.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              data-testid='Login-Password'
              type="password"
              value={password}
              onChange={(value) => setPassword(value.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Login
