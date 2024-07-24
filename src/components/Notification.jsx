import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ notificationData, duration = 10000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose();
      }, 1000);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`notification ${visible ? 'fade-in' : 'fade-out'} ${notificationData.type}`}>
      {notificationData.message}
    </div>
  );
};

export default Notification;
