import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <nav>
          <Link href="/">home</Link> <Link href="/blogs">blogs</Link>{' '}
          <Link href="/users">users</Link>{' '}
          <Link href="/blogs/new">add blog</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
