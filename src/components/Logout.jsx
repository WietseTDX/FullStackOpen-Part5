import React from 'react';

const Logout = ({ user, logoutCallback }) => {
  const handleLogoutSubmit = (event) => {
    event.preventDefault()
    logoutCallback();
  }

  return (
    <div>
      {user !== null && user.name} logged in <button onClick={handleLogoutSubmit}>Logout</button>
    </div>
  )
}

export default Logout
