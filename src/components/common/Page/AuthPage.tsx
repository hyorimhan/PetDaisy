import { PropsWithChildren } from "react";

function AuthPage({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="bg-gradient-1 w-[360px] md:w-[600px] mx-auto p-3 pb-[120px] min-h-screen">
      {children}
    </div>
  );
}

export default AuthPage;
