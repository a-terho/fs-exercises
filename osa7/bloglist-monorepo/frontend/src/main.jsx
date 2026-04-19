import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import NotificationProvider from './components/NotificationProvider';
import UserProvider from './components/UserProvider';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </UserProvider>
    </QueryClientProvider>
  </Router>,
);
