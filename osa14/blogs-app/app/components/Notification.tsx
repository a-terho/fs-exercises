'use client';

import { useNotification } from './NotificationContext';

const Notification = () => {
  const { message, type } = useNotification();

  if (!message) return null;

  const color = type == 'error' ? 'bg-red-600' : 'bg-cyan-600';
  return (
    <div data-testid="notification" className={`p-2 mb-3 text-white ${color}`}>
      {message}
    </div>
  );
};

export default Notification;
