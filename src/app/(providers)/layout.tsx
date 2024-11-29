import AuthProvider from './_providers/AuthProvider';
import QueryProvider from './_providers/QueryProvider';

function ProvidersLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <AuthProvider>
        <main>{children}</main>
      </AuthProvider>
    </QueryProvider>
  );
}

export default ProvidersLayout;
