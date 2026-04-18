import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import App from './App';
import NotificationProvider from './components/NotificationProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </Router>,
);
