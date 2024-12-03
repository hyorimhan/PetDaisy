import AuthProvider from './(providers)/_providers/AuthProvider';
import QueryProvider from './(providers)/_providers/QueryProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
