import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Notification.css'

const Notification = ({ notificationData, duration = 10000, onClose }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        onClose()
      }, 1000)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`notification ${visible ? 'fade-in' : 'fade-out'} ${notificationData.type}`}>
      {notificationData.message}
    </div>
  )
}

const NotificationDataPropType = PropTypes.shape({
  type: PropTypes.oneOf(['error', 'default']).isRequired,
  message: PropTypes.string.isRequired
})

Notification.propTypes = {
  notificationData: NotificationDataPropType.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired
}

Notification.defaultProps = {
  duration: 10000
}

export default Notification
