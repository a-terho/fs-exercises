'use client';

import { createContext, useContext, useState } from 'react';
import type { NotificationType, NotificationContextType } from '@/types';

const defaultContext: NotificationContextType = {
  message: '',
  type: 'info',
  showNotification: () => {},
};

const NotificationContext =
  createContext<NotificationContextType>(defaultContext);

interface Props {
  children: React.ReactNode;
}

export const NotificationProvider = ({ children }: Props) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('info');

  const showNotification = (
    msg: string,
    msgType: NotificationType = 'info',
  ) => {
    setMessage(msg);
    setType(msgType);
    setTimeout(() => setMessage(''), 5000);
  };

  const context = { message, type, showNotification };
  return <NotificationContext value={context}>{children}</NotificationContext>;
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
