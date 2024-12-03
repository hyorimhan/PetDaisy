import AuthProvider from './(providers)/_providers/AuthProvider';
import ModalProvider from './(providers)/_providers/ModalProvider';
import QueryProvider from './(providers)/_providers/QueryProvider';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-main-2">
        <QueryProvider>
          <AuthProvider>
            <ModalProvider>
              <main>{children}</main>
            </ModalProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
