import { PropsWithChildren } from 'react';

function AuthProvider({ children }: Readonly<PropsWithChildren>) {
  return <div>{children}</div>;
}

export default AuthProvider;
