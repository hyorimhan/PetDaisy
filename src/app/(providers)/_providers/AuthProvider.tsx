import { PropsWithChildren } from 'react';

function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  return <>{children}</>;
}

export default AuthProvider;
