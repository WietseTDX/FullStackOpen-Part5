import React from 'react';

const Logout = ({ user, logoutCallback, setNotification }) => {
  const handleLogoutSubmit = (event) => {
    event.preventDefault()
    setNotification({
      message: `${user.name} succesfully logged out`,
      type: 'default'
    })
    logoutCallback();
  }

  return (
    <div>
      {user !== null && user.name} logged in <button onClick={handleLogoutSubmit}>Logout</button>
    </div>
  )
}

export default Logout
