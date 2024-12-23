import { PropsWithChildren } from "react";

function AuthPage({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="bg-gradient-1 w-[390px] md:w-[600px] mx-auto px-3 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}

export default AuthPage;
