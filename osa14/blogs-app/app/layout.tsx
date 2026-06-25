import './globals.css';

import NavBar from './components/NavBar';
import AuthSessionProvider from './components/SessionProvider';
import { NotificationProvider } from './components/NotificationContext';
import Notification from './components/Notification';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <div className="px-5">{children}</div>
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
