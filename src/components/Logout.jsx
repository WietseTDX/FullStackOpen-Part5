import React from 'react'
import PropTypes from 'prop-types'

const Logout = ({ user, logoutCallback, setNotification }) => {
  const handleLogoutSubmit = (event) => {
    event.preventDefault()
    setNotification({
      message: `${user.name} succesfully logged out`,
      type: 'default'
    })
    logoutCallback()
  }

  return (
    <div>
      {user !== null && user.name} logged in <button onClick={handleLogoutSubmit}>Logout</button>
    </div>
  )
}

const userPropType = PropTypes.shape({
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
})

Logout.propTypes = {
  user: PropTypes.oneOfType([
    userPropType,
    PropTypes.oneOf([null])
  ]),
  logoutCallback: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default Logout
