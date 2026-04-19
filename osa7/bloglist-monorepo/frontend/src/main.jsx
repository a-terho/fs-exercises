import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import App from './App';

import NotificationProvider from './components/NotificationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </QueryClientProvider>
  </Router>,
);
